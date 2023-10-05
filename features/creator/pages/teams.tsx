import React,{useContext , useState , useEffect} from 'react'
import { 
Box , 
VStack, 
Input , 
Icon ,
Text } from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { FlatList } from '../../../components/layout/Flatlist/FlatList';
import { useNavigation } from '@react-navigation/native';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { teamsdata } from '../assets/config';
import { SwipeListView } from 'react-native-swipe-list-view';

//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

//@components
// import Teambar from '../../../components/creater/[container]/Teambar';
import TeamItem from '../components/TeamItem';
import Deletebutton from '../../../components/button/Deletebutton';
import Elementnavigation from '../../../components/navigation/Elementnavigation';


const MemorizedTeamitem = React.memo(TeamItem);
const Memorizednavigation = React.memo(Elementnavigation)


interface pageprops {
     route:any
}
const Team : React.FC <pageprops> = ({route}) => {
     const theme:any = useContext(ThemeWrapper)
     const navigation = useNavigation();
     const [creators , setCreators] = useState<any[]>([]);
     const {projectdocument} = route.params
     console.log("Teams", projectdocument.creators)

     const separatedAccount = () => {
          // wait for firebase collection create.
          if (!userdocs) return { pending: [], other: [] };
  
          const document = userdocs.content.reduce((acc, item) => {
               if (item.status === "Draft") {
               acc.draft.push(item);
               } else {
               acc.other.push(item);
               }
               return acc;
          }, { draft: [], other: [] });
          
          setisLoading(false);
          return document;
     }

     const MatchingAccount = async () :Promise<void> => {
          try {
               const snapshotuser = await firestore().collection('Users').where(firestore.FieldPath.documentId() , 'in' , projectdocument.creators.map(String)).get();
               const userdocs = snapshotuser.docs.map(doc => ({id : doc.id ,isleader : projectdocument.owner === doc.id , ...doc.data() }));
          
               setCreators(userdocs);
           }catch(error) {    
               console.error("Error fetching document:", error);
           }
     }



     useEffect(() => {
          MatchingAccount();
     },[])


  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
        <Memorizednavigation title = "Teams" 
        rightElement={[{icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
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
               <VStack mb = {4} space = {1}>
                    <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Pending</Text>
                    <SwipeListView 
                         disableRightSwipe
                         data={[0]}
                         ItemSeparatorComponent={<Box h=  '2'/>}
                         renderItem={(item:any , index:number) => {
                              return(
                                   <MemorizedTeamitem key = {index} id = {item.id} data= {teamsdata[1]}/>
                              )
                         }}
                         renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                         leftOpenValue={60}
                         rightOpenValue={-60}
                    />
               </VStack>
               <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Member</Text>
               {teamsdata.length > 0 || teamsdata ?
                    <SwipeListView 
                         disableRightSwipe
                         data={creators}
                         ItemSeparatorComponent={<Box h=  '2'/>}
                         renderItem={(item:any , index:number) => {
                              const isleader = item.username == 'Heitclieff' ? true : false
                              return(
                                   <MemorizedTeamitem key = {index} id = {item.id} data= {item.item} isleader = {isleader}/>
                              )
                              
                         }}
                         renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                         leftOpenValue={60}
                         rightOpenValue={-60}
                    />
               :null }
            {/* {teamsdata.length > 0 || teamsdata ?
                    teamsdata.map((item:any , index:number) => { 
                         const isleader = item.username == 'Heitclieff' ? true : false
                         return(
                         <TeamMember key = {index} id = {item.id} data= {item} isleader = {isleader}/>       
                         )
                                  
                    }) 
                    : null
                }    */}
            </VStack>
            </FlatList>
        </Box>
     </VStack>
  )
}

export default Team;