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

    
     const {projectdocument} = route.params
     const userdocs = useSelector((state) => state.teams);
     const [creators , setCreators] = useState<any[]>({pending : [] , other : []});
     const [isLoading , setisLoading] = useState<boolean>(true)

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
     
     useEffect(() => {
          initalteams();
     },[userdocs])


  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
        <Memorizednavigation title = "Teams" 
        rightElement={[
          { icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'plus'/> , navigate : () => navigation.navigate('Search',{novelsearch : false})},
          {icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}
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
               <VStack mb = {4} space = {1}>
                    {creators.pending.length  > 0 &&
                         <>
                         <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Pending</Text>
                              <SwipeListView 
                                   disableRightSwipe
                                   data={creators.pending}
                                   ItemSeparatorComponent={<Box h=  '2'/>}
                                   renderItem={(item:any , index:number) => {
                                        return(
                                             <MemorizedTeamitem key = {index} id = {item.id} data= {item.item}/>
                                        )
                                   }}
                                   renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                                   leftOpenValue={60}
                                   rightOpenValue={-60}
                              />
                         </>
                    }         
               </VStack>
               <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Member</Text>
               {creators.other.length > 0 ? 
                    <SwipeListView 
                         disableRightSwipe
                         data={creators.other}
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
            </VStack>
            </FlatList>
        </Box>
     </VStack>
  )
}

export default Team;