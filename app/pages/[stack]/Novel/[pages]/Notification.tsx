import React from 'react'
import { Box, Divider, HStack ,Text, VStack } from 'native-base';
import { useContext } from 'react'; 
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import DefaultNotify from '../../../../components/[stack]/Notification/[container]/DefaultNotify';
import { SwipeListView } from 'react-native-swipe-list-view';
import DeleteButton from '../../../../components/global/[container]/DeleteButton';
import { Flatlist } from '../../[global]/Flatlist';

const Notification : React.FC = () => {
    const theme:any = useContext(ThemeContext)
  return (
    <Box flex = {1} bg = {theme.Bg.base}>
       <HStack mt = {5}>
            <Text pl = {5} color = {theme.Text.base}>Recently</Text>
       </HStack>
          <Flatlist>
            <VStack p = {4} flex = {1}>
                <SwipeListView 
                disableRightSwipe
                data={[0,1]}
                ItemSeparatorComponent={<Box h=  '2'/>}
                renderItem={(item:any , index:number) => (
                  <DefaultNotify/>
                )}
                renderHiddenItem={ (data, rowMap) => (<DeleteButton/>)}
                leftOpenValue={60}
                rightOpenValue={-60}
              />
            </VStack>
          </Flatlist>
      
       
    </Box>
  )
}

export default Notification;
