import React,{useContext , useState , useEffect} from 'react'
import { 
Box , 
VStack, 
Input , 
Icon ,
HStack,
useToast,
Text, 
Badge,
Stack} from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { FlatList } from '../../../components/layout/Flatlist/FlatList';
import { useNavigation } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { SwipeListView } from 'react-native-swipe-list-view';

//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

//@components
import AlertItem from '../../reader/components/Alert';
import TeamItem from '../components/TeamItem';
import Deletebutton from '../../../components/button/Deletebutton';
import Elementnavigation from '../../../components/navigation/Elementnavigation';
import CreatorAlert from '../components/Alert';
//@Redux
import { useSelector , useDispatch } from 'react-redux';
import { setProjectTeams } from '../../../systems/redux/action';
import { RefreshControl } from 'react-native-gesture-handler';
import SendAlert from '../../../services/alertService';

const MemorizedTeamitem = React.memo(TeamItem);
const Memorizednavigation = React.memo(Elementnavigation)


interface pageprops {
     route:any
}
const Team : React.FC <pageprops> = ({route}) => {
     const theme:any = useContext(ThemeWrapper)
     const navigation = useNavigation();
     const dispatch = useDispatch();
     const toast = useToast();
     const userdocs = useSelector((state) => state.teams);
     const useraccount = useSelector((state) => state.userData);
     const projectdocs = useSelector((state) => state.content)
     const projectkeys =  useSelector((state) => state.docs)
     const [creators , setCreators] = useState<any[]>({pending : [] , other : []});
     const [separedCreator ,setSeparedCreator] = useState<{}>({});
     const [serchingKey ,setSearchingKey] = useState<string>('');
     const [isLoading , setisLoading] = useState<boolean>(true)
     const [isDisable , setisDisable] = useState<boolean>(false);
     const [refreshing , setRefreshing] = useState<boolean>(false);

     const separatedAccount = (data:any) => {
          const separateditem = {pending : [] , other : []};
          data.forEach(item => {
               if(item.pending) {
                    separateditem.pending.push(item)
               }else{
                    separateditem.other.push(item)
               }
          });
          setSeparedCreator(separateditem);
          setCreators(separateditem);
     }

     const initalteams =  async () : Promise<void> => {
          if(userdocs.teams){
               separatedAccount(userdocs.teams)
          }
     }


     const fetchmemberAccount = async () => {
          try { 
               const getnovel =  firestore().collection("Novels").doc(projectdocs.id)
               const getCreator = await getnovel.collection("Creator").get()
               const createorDocsData =   getCreator.docs.map((doc) => ({id : doc.id , ...doc.data()}));
               const creatorDocs = getCreator.docs.map((doc) => doc.data().userDoc);
               
  
               const snapshotuser = await firestore().collection('Users')
               .where(firestore.FieldPath.documentId() , 'in' ,  creatorDocs)
               .get();
      
               
               const snapshotuserMap = new Map(snapshotuser?.docs.map(doc => [doc.id, doc]));

               const userdocs = creatorDocs.map((doc_id:string , index:number) => {
                const doc = snapshotuserMap.get(doc_id)?.data();
                const pendingdoc = createorDocsData.find((doc) => doc.userDoc === doc_id)
                  return {
                      id : doc_id ,
                      doc_id : projectkeys.docs.creators[index].doc_id,
                      isleader : projectkeys.docs.owner === doc_id,
                      owner : projectkeys.docs.owner,
                      isyou : doc_id === useraccount[0].id,
                      pending : pendingdoc?.pending,
                      ...doc
                    }
                    });
     
               separatedAccount(userdocs)
               setRefreshing(false);
           }catch(error) {    
               console.error("Error fetching document:", error);
           }
        }

     const DisableAddmember = () => {
          if(userdocs.teams.length >= 3) {
               setisDisable(true);
          }else{
               setisDisable(false);
          }
     }

     const RemoveMember = async (id:string , doc_id:string) : Promise<void> => {
          let status = "error"
          try{
               const userRef = firestore().collection('Users').doc(id);
               const userDoc = await userRef.get();

               const removedSelecteduser = userdocs.teams.filter(user => user.id !== id);
        
               if (userDoc.exists) {
                    const currentProject = userDoc.data().project || [];
                    const newProject = currentProject.filter((item) => item !== projectdocs.id);
                    await userRef.update({
                      project : newProject,
                    });
                  
                    console.log("Update Target Project success")
               }else {
                    console.log("ERROR: not founds users Project");
               }
               
               const docRef = await firestore()
                              .collection('Novels')
                              .doc(projectdocs.id)
                              .collection('Creator')
                              .doc(doc_id)
                              .delete()
                   
               status = "success"
               dispatch(setProjectTeams({teams: removedSelecteduser}));
          }catch(error) {
               console.log("Remove Failed " , error)
          }
          SendAlert(status , "Removed" , "Removed failed" , toast)
     }

     const getFilterObject = (value:string) => {
          setSearchingKey(value);

          
          let fields = "pending"
          let opposite_fields = "other"
      
          if(!value){
            setCreators({pending : separedCreator?.pending , other : separedCreator.other})
          }
          
          if (typeof (value) == "string") {
              const pending_results = separedCreator?.pending.filter((item:any) =>
                  item.username.toLowerCase().includes(value.toLowerCase())
              )
      
              const other_results = separedCreator?.other.filter((item:any) =>
              item.username.toLowerCase().includes(value.toLowerCase())
             )
         
              if(pending_results.length > 0 && other_results.length > 0){
                setCreators({pending : pending_results , other : other_results})
                return
              }
      
              let results_used = pending_results
      
              if(!pending_results.length > 0){
                fields = "other";
                opposite_fields = "pending";
                results_used =  other_results;
              }
      
              const appendList = {[fields] : results_used , [opposite_fields] : []}
              setCreators(appendList)
          }
      }

     useEffect(() => {   
          if(!refreshing){
               initalteams();
               DisableAddmember();
          }
     },[userdocs.teams])

     useEffect(() => {
          if (refreshing){
               console.log("Refreshing")
               fetchmemberAccount();
          }
         
     } , [refreshing])
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title="Teams"
               rightElement={[
                    {
                         status: isDisable,
                         icon: <AntdesignIcon size={18} color={theme.Icon.between} name='plus' />,
                         navigate: () => navigation.navigate('Search', { fixedsearch: true })
                    },
                    { icon: <AntdesignIcon size={18} color={theme.Icon.between} name='appstore-o' />, navigate: navigation.openDrawer }
               ]}
          />
         <Box flex = {1}>
          <FlatList refreshing = {refreshing} setRefreshing={setRefreshing}>
            <Box w= '100%' mt = {2} >
              <Box pl = {6} pr = {6}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  onChangeText={(e) => getFilterObject(e)}
                  h  = {9}
                  InputRightElement={<EvilIcon size = {10} />}
                  placeholder='Search your Teamate username'
                  />
              </Box> 
            </Box> 
            <VStack space = {2} mt = {6}>
               <VStack  mb = {4} space = {3}>
                    {creators.pending?.length  > 0 &&
                         <>
                         <Stack ml = {4} mr = {4}  bg = {'amber.500'} pl = {1.5} rounded={'sm'} overflow= 'hidden'>
                              <HStack p = {1} pr = {2} bg = {theme.Bg.container} justifyContent = {'space-between'} alignItems={'center'}>
                                   <Text pl = {2} color = {theme.Text.heading} fontWeight={'semibold'} fontSize={'xs'}>Pending</Text>
                                   <Badge
                                     rounded = 'full'
                                     colorScheme={'amber'}
                                     variant={'outline'}
                                     _text={{
                                        fontSize: 10
                                      }}
                                   >{creators.pending.length + " User"}
                                   </Badge>
                              </HStack>
                         </Stack>
                              <SwipeListView 
                                   data={creators.pending}
                                   rightOpenValue={-60}
                                   ItemSeparatorComponent={<Box h=  '2'/>}
                                   renderItem={(item:any , index:number) => {
                                        return(
                                             <MemorizedTeamitem 
                                             key = {index} 
                                             id = {item.id} 
                                             data= {item.item}
                                             />
                                        )
                                   }}
                                   renderHiddenItem={ (data, rowMap) => (
                                        <Box w=  '100%' h= '100%' pr = {5}>
                                             <Deletebutton 
                                                  action = {RemoveMember} 
                                                  id = {data.item.id} 
                                                  doc_id = {data.item.doc_id}
                                                  title = {data.item.username}
                                             />
                                        </Box>
                                         )
                                   }
                              />
                         </>
                    }         
               </VStack>
               <Stack ml = {4} mr = {4} mb = {2} bg = {'trueGray.400'} pl = {1.5} rounded={'sm'} overflow= 'hidden'>
                    <HStack p = {1} pr = {2} bg = {theme.Bg.container} justifyContent = {'space-between'} alignItems={'center'}>
                         <Text pl = {2} color = {theme.Text.heading} fontWeight={'semibold'} fontSize={'xs'}>Member</Text>
                         <Badge
                           rounded = 'full'
                           colorScheme={userdocs.teams?.length >= 3 ? 'teal' : null }
                           borderColor={userdocs.teams?.length >= 3 ? null :  theme.Icon.base}
                           variant={'outline'}
                           _text={{
                              fontSize: 10,
                              color : userdocs.teams?.length < 3 ? theme.Text.base : 'teal.500'
                         }}
                         >{userdocs.teams?.length >= 3 ? "MAX" : creators.other.length + "/3"}
                         </Badge>
                    </HStack>
               </Stack>
               <VStack space = {2} >
                    {creators.other.length > 0 ? 
                         creators.other.map((item:string , index:number) => {
                              const isDisable = item?.id === item.owner || item.owner !== useraccount[0].id
                              return(
                                   <SwipeListView 
                                   key = {index}
                                   disableLeftSwipe = {isDisable}
                                   data={[0]}
                                   ItemSeparatorComponent={<Box h=  '2'/>}
               
                                   rightOpenValue={-75}
                              
                                   renderItem={() => {
                                        return(
                                             <MemorizedTeamitem key = {index} id = {item.id} data= {item}/>
                                        )
                                   }}

                                   renderHiddenItem={ () => (
                                        <Box w=  '100%' h= '100%' pr = {5}>
                                             <Deletebutton 
                                             id =  {item.id}
                                             action = {RemoveMember} 
                                             title = {item.username}/>
                                             
                                        </Box>
                                        )
                                   }
                                   
                                   />
                              )
                         })
                    
                    :null }
               </VStack>
            </VStack>

            </FlatList>
        </Box>
     </VStack>
  )
}

export default Team;