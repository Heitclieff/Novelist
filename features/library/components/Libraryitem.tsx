import React,{useContext} from 'react'
import { Box , HStack, VStack , Text , Icon} from 'native-base';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';

interface containerProps {
     id : number | string
     data : any
}
const Libraryitem : React.FC <containerProps>= ({id, data}) => {
     const theme:any = useContext(ThemeWrapper)
     const navigation = useNavigation();
  return (
     <Pressable onPress = {() => navigation.navigate('Novelmain',{id})}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
     return (
          <HStack w = '100%' h= {130} pl ={2} pr = {4} pt = {2} pb = {2} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null}>
               <Box w= '25%' h = '100%' overflow={'hidden'}>
                    <FastImage
                         id = "cover-image"
                         style={{width : '100%', height : '100%' }}
                         source={{
                              uri : data.image  , 
                              header :{Authorization : "someAuthToken"},
                              priority : FastImage.priority.normal}}
                         alt = "images"
                         resizeMode={FastImage.resizeMode.cover}
                    />
               </Box>    
               <VStack w= '75%'  pl = {2} pr = {2}  ml = {2}  rounded={'md'} space = {1}>
                    <Text color={theme.Text.base} fontWeight={'semibold'} numberOfLines={2}>{data.title}</Text>
                    <VStack>
                         <HStack alignItems={'center'} space = {1}>
                              <AntdesignIcon 
                                size={10}
                                color = {theme.Text.description}
                                name = 'eyeo'/>
                                <Text color={theme.Text.description} fontSize={'xs'}>{data.view}</Text>
                         </HStack>
                         <HStack alignItems={'center'} space = {1}>
                              <AntdesignIcon 
                                size={10}
                                color = {theme.Text.description}
                                name = 'heart'/>
                                <Text color={theme.Text.description} fontSize={'xs'}>{data.like}</Text>
                         </HStack>
                    </VStack>
               </VStack>
          </HStack>
     )
     }}
     </Pressable>
  )
}

export default Libraryitem;