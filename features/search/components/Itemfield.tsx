import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Box , 
HStack, 
VStack,
Text , 
Pressable,
IconButton} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import FastImage from 'react-native-fast-image'

import { useDispatch , useSelector } from 'react-redux'

interface containerProps {
     id : string,
     data : any,
     status : any,
     UpdatedTeams:any,
}

const Itemfield : React.FC <containerProps> = ({id ,data, status , UpdatedTeams}) => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();

  return (
     <Pressable onPress = {() => navigation.navigate('Novelmain' ,{id})}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
               <HStack w="100%" alignItems={'center'} justifyContent={'center'} p={2} space={4} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.base} >
                    <Box w={50} h={50} bg= {theme.Bg.container} rounded = 'md' overflow={'hidden'}>
                         {data.image &&
                              <FastImage
                                   id="cover-image"
                                   style={{ width: '100%', height: '100%' }}
                                   source={{
                                        uri: data.image,
                                        header: { Authorization: "someAuthToken" },
                                        priority: FastImage.priority.normal
                                   }}
                                   alt="images"
                                   resizeMode={FastImage.resizeMode.cover}
                              />
                         }
                    </Box>
                    <HStack w='80%' h='100%' justifyContent={'space-between'} alignItems={'center'}>
                         <VStack>
                              <Text color={theme.Text.base} fontSize={'sm'}>{data.title}</Text>
                         </VStack>
                    </HStack>
               </HStack>
          )
     }}
  </Pressable>
  )
}

export default Itemfield;