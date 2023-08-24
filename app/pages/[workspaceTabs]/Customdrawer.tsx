import React,{useContext} from 'react'
import { Box,HStack,VStack,Text, Icon } from 'native-base'
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer'
import { ThemeContext } from '../../../systems/Theme/ThemeProvider'
interface Pageprops {}

const Customdrawer : React.FC <Pageprops> = (props) => {
     const theme:any = useContext(ThemeContext);
  return (
     <Box flex={1} bg = {theme.Bg.base}>
          <VStack w =  '100%' safeAreaTop pl = {4} pb = {1} space=  {2} h = {130} justifyContent={'flex-end'} >
               <Text color = {theme.Text.base} fontSize={'lg'} fontWeight={'semibold'}>Project</Text>
               <HStack alignItems={'center'} space = {2}>
                    <Box w = '8' h=  '8' rounded={'full'} bg=  'gray.500'></Box>
                    <Text color = {theme.Text.base}>Heitclieff</Text>
               </HStack>
          </VStack>
          <DrawerContentScrollView >
               <DrawerItemList {...props}/>
          </DrawerContentScrollView>
     </Box>
     
  
  )
}

export default Customdrawer;
