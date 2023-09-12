import React,{useContext} from 'react'
import { 
Box, 
Divider, 
HStack ,
Text, 
VStack } from 'native-base';; 
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import NotifyItem from './components/NotifyItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import Deletebutton from '../../components/button/Deletebutton';

const Notification : React.FC = () => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <Box flex = {1} bg = {theme.Bg.base}>
       <HStack mt = {5}>
            <Text pl = {5} color = {theme.Text.base}>Recently</Text>
       </HStack>
          <FlatList>
            <VStack p = {4} flex = {1}>
                <SwipeListView 
                disableRightSwipe
                data={[0,1]}
                ItemSeparatorComponent={<Box h=  '2'/>}
                renderItem={(item:any , index:number) => (
                  <NotifyItem/>
                )}
                renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                leftOpenValue={60}
                rightOpenValue={-60}
              />
            </VStack>
          </FlatList>
      
       
    </Box>
  )
}

export default Notification;