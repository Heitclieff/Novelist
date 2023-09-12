import React,{useContext} from 'react'
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
//@Components
// import Teambar from '../../../components/creater/[container]/Teambar';
import TeamItem from './components/TeamItem';
import Deletebutton from '../../../components/button/Deletebutton';
import Elementnavigation from '../../../components/navigation/Elementnavigation';

const MemorizedTeamitem = React.memo(TeamItem);
const Memorizednavigation = React.memo(Elementnavigation)
const Team : React.FC = () => {
     const theme:any = useContext(ThemeWrapper)
     const navigation = useNavigation();

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
                         data={teamsdata}
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