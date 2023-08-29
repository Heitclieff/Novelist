import React,{useContext} from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider';
import Teambar from '../../../components/creater/[container]/Teambar';
import { Box , VStack, Input , Icon ,Text } from 'native-base';
import { Flatlist } from '../../[stack]/[global]/Flatlist';
import { EvilIcons } from '@expo/vector-icons';
import TeamMember from '../../../components/creater/[container]/TeamMember';
import { teamsdata } from '../../../../assets/VisualCollectionsdata';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeleteButton from '../../../components/global/[container]/DeleteButton';
const Team : React.FC = () => {
     const theme:any = useContext(ThemeContext)
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
         <Teambar/>
         <Box flex = {1}>
          <Flatlist>
            <Box w= '100%' mt = {2}>
              <Box pl = {6} pr = {6}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<Icon as = {<EvilIcons name='search'/>} size = {5} mr = {2}/>}
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
                                   <TeamMember key = {index} id = {item.id} data= {teamsdata[1]}/>
                              )
                         }}
                         renderHiddenItem={ (data, rowMap) => (<DeleteButton/>)}
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
                                   <TeamMember key = {index} id = {item.id} data= {item.item} isleader = {isleader}/>
                              )
                              
                         }}
                         renderHiddenItem={ (data, rowMap) => (<DeleteButton/>)}
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
            </Flatlist>
        </Box>
     </VStack>
  )
}

export default Team;
