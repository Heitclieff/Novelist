import React,{useContext} from 'react'
import { 
Box,
HStack,
VStack,
Text, 
Icon } from 'native-base'
import { Image } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { DrawerContentScrollView , DrawerItemList } from '@react-navigation/drawer'
import { useSelector } from 'react-redux'


interface Pageprops {}

const Customdrawer : React.FC <Pageprops> = (props) => {
     const theme:any = useContext(ThemeWrapper);
     
     const userdata = useSelector((state) => state.userData);

  return (
     userdata?.length > 0 &&
     <Box flex={1} bg = {theme.Bg.base}>
          <VStack w =  '100%' safeAreaTop pl = {4} pb = {1} space=  {2} h = {130} justifyContent={'flex-end'} >
               <Text color = {theme.Text.base} fontSize={'lg'} fontWeight={'semibold'}>Project</Text>
               <HStack alignItems={'center'} space = {2}>
                    <Box w = '8' h=  '8' rounded={'full'} bg=  'gray.500' overflow ='hidden'>
                         <Image source={{uri : userdata[0].pf_image}} style = {{maxHeight : '100%' , maxWidth : '100%' , width : '100%' , height : '100%' , objectFit : 'cover'}}/>
                    </Box>
                    <Text color = {theme.Text.base}>{userdata[0].username}</Text>
               </HStack>
          </VStack>
          <DrawerContentScrollView >
               <DrawerItemList {...props}/>
          </DrawerContentScrollView>
     </Box>
     
  
  )
}

export default Customdrawer;