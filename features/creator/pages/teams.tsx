import React,{useContext , useState , useEffect} from 'react'
import { 
Box , 
VStack, 
Input , 
Icon ,
HStack,
Text } from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { FlatList } from '../../../components/layout/Flatlist/FlatList';
import { useNavigation } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { teamsdata } from '../assets/config';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useToast } from 'native-base';

//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

//@components
import TeamItem from '../components/TeamItem';
import Deletebutton from '../../../components/button/Deletebutton';
import Elementnavigation from '../../../components/navigation/Elementnavigation';
import CreatorAlert from '../components/Alert';
//@Redux
import { useSelector , useDispatch } from 'react-redux';
import { setProjectTeams } from '../../../systems/redux/action';

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
     const [creators , setCreators] = useState<any[]>({pending : [] , other : []});
     const [isLoading , setisLoading] = useState<boolean>(true)
     const [isDisable , setisDisable] = useState<boolean>(false);

     const separatedAccount = (data:any) => {
          const separateditem = {pending : [] , other : []};
          data.forEach(item => {
               if(item.pending) {
                    separateditem.pending.push(item)
               }else{
                    separateditem.other.push(item)
               }
          });
          setisLoading(false);
          setCreators(separateditem);
     }

     const initalteams =  async () : Promise<void> => {
          if(userdocs.teams){
               separatedAccount(userdocs.teams)
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
          try{
               const removedSelecteduser = userdocs.teams.filter(user => user.id !== id);
               dispatch(setProjectTeams({teams: removedSelecteduser}));

               const docRef = await firestore()
                              .collection('Novels')
                              .doc(projectdocs.id)
                              .collection('Creator')
                              .doc(doc_id)
                              .delete()
                              
          }catch(error) {
               console.log("Remove Failed " , error)
          }
     }

     useEffect(() => {
          initalteams();
          DisableAddmember();
     },[userdocs.teams])

  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title="Teams"
               rightElement={[
                    {
                         status: isDisable,
                         icon: <AntdesignIcon size={15} color={theme.Icon.static} name='plus' />,
                         navigate: () => navigation.navigate('Search', { novelsearch: false })
                    },
                    { icon: <AntdesignIcon size={15} color={theme.Icon.static} name='appstore-o' />, navigate: navigation.openDrawer }
               ]}
          />
         <Box flex = {1}>
          <FlatList>
            <Box w= '100%' mt = {2}>
              <Box pl = {6} pr = {6}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<EvilIcon size = {10} />}
                  placeholder='Seacrh your Teamate username'
                  />
              </Box> 
            </Box> 
            <VStack space = {2} m ={5} mt = {6}>
               {userdocs.teams?.length >= 3 &&
                    <CreatorAlert/>
               }
               <VStack mb = {4} space = {1}>
                    {creators.pending.length  > 0 &&
                         <>
                         <HStack justifyContent = {'space-between'}>
                              <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Pending</Text>
                              <Text pr = {3} color = {theme.Text.description} fontSize={'xs'}>{`${creators.pending.length}/2`}</Text>
                         </HStack>
                       
                              <SwipeListView 
                                   disableRightSwipe = {(item) => !item.item.isleader}
                                   data={creators.pending}
                                   leftOpenValue={60}
                                   rightOpenValue={-60}
                                   ItemSeparatorComponent={<Box h=  '2'/>}
                                   renderItem={(item:any , index:number) => {
                                        return(
                                             <MemorizedTeamitem key = {index} id = {item.id} data= {item.item}/>
                                        )
                                   }}
                                   renderHiddenItem={ (data, rowMap) => (
                                        <Deletebutton 
                                             action = {RemoveMember} 
                                             id = {data.item.id} 
                                             doc_id = {data.item.doc_id}
                                             title = {data.item.username}
                                        />
                                         )
                                   }
                              />
                         </>
                    }         
               </VStack>
               <HStack justifyContent = {'space-between'}>
                    <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Member</Text>
                    <Text pr = {3} color = {theme.Text.description} fontSize={'xs'}>{`${creators.other.length}/3`}</Text>
               </HStack>
               {creators.other.length > 0 ? 
                    creators.other.map((item:string , index:number) => {
                         const isDisable = item?.id === item.owner || item.owner !== useraccount[0].id
                         return(
                              <SwipeListView 
                                key = {index}
                                disableRightSwipe
                                disableLeftSwipe = {isDisable}
                                data={[0]}
                                ItemSeparatorComponent={<Box h=  '2'/>}
                                leftOpenValue={60}
                                rightOpenValue={-60}
                            
                                renderItem={() => {
                                   return(
                                        <MemorizedTeamitem key = {index} id = {item.id} data= {item}/>
                                   )
                                }}

                                renderHiddenItem={ () => (
                                   <Deletebutton 
                                     action = {RemoveMember} 
                                     title = {item.username}/>
                                     )
                                }
                                
                              />
                         )
                    })
                   
               :null }
            </VStack>
            </FlatList>
        </Box>
     </VStack>
  )
}

export default Team;