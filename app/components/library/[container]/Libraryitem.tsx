import React,{useContext} from 'react'
import { Box , HStack, VStack , Text , Icon} from 'native-base';
import { Image } from 'expo-image';
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
interface containerProps {
     id : number | string
     data : any
}
const Libraryitem : React.FC <containerProps>= ({id, data}) => {
     const theme:any = useContext(ThemeContext)
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
                    <Image 
                    id = "Background-image"
                    style={{width : '100%' ,height : '100%'}}
                    source={data.images}
                    />
               </Box>
               <VStack w= '75%'  pl = {2} pr = {2}  ml = {2}  rounded={'md'} space = {1}>
                    <Text color={theme.Text.base} fontWeight={'semibold'} numberOfLines={2}>{data.title}</Text>
                    <VStack>
                         <HStack alignItems={'center'} space = {1}>
                              <Icon 
                              size={'xs'}
                              as = {AntDesign} 
                              color = {theme.Text.description}
                              name = 'eyeo'/>
                              <Text color={theme.Text.description} fontSize={'xs'}>{data.view}</Text>
                         </HStack>
                         <HStack alignItems={'center'} space = {1}>
                              <Icon 
                              size={'xs'}
                              as = {AntDesign} 
                              color = {theme.Text.description}
                              name = 'heart'/>
                              <Text color={theme.Text.description} fontSize={'xs'}>4.7k</Text>
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
