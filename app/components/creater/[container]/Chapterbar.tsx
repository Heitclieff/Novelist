import React, { useContext } from 'react'
import { Box , HStack , IconButton ,VStack , Icon , Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { Entypo , AntDesign , MaterialCommunityIcons } from '@expo/vector-icons'

interface containerProps  {
     onOpen : any
}
const Chapterbar : React.FC <containerProps> = ({onOpen}) => {
     const navigation = useNavigation();
     const theme:any = useContext(ThemeContext)

  return (
     <Box w=  '100%' safeAreaTop pl = {7} pr = {4} pt = {4} pb = {4}>
          <HStack  w = '100%' alignItems={'center'} justifyContent={'space-between'} >
               <Box>
                    <Text fontSize={'lg'} fontWeight={'semibold'} color = {theme.Text.base}>Chapters</Text>
               </Box>
               <HStack space = {2}>
                    <IconButton 
                         size = 'md'
                         w = {7}
                         h = {7}
                         onPress={onOpen}
                         rounded={'full'}
                         icon = {
                              <Icon
                              as={AntDesign}
                              name='plus'
                              size={5}
                              color = {'coolGray.300'}
                              ></Icon>
                         }
                    />
                    <IconButton 
                         bg = {theme.Bg.container}
                         size = 'md'
                         w = {7}
                         h = {7}
                         onPress={()=> navigation.openDrawer()}
                         rounded={'full'}
                         icon = {
                              <Icon
                              as={AntDesign}
                              name='appstore-o'
                              size={4}
                              color = {theme.Text.base}
                              ></Icon>
                         }
                    />
               </HStack>
     </HStack>
 </Box>
  )
}


export default Chapterbar;