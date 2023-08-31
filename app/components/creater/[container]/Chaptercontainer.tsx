import React,{useContext} from 'react'
import { Box, HStack , Text, VStack } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { Pressable } from 'native-base'
import { Image } from 'expo-image'
import { useNavigation } from '@react-navigation/native'
interface containerProps {
     data : any
}
const Chaptercontainer : React.FC <containerProps> = ({data}) => {
     const theme:any = useContext(ThemeContext)
     const navigation  = useNavigation();
     const p_id = data.id
  return (
     <Pressable onPress={() => navigation.navigate('NovelReadContent',{p_id})}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
    <HStack w=  '100%' p = {3} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.container} rounded={'full'}>
          <Box w = '20%'  justifyContent={'center'} alignItems={'center'}>
               <Text color={theme.Text.base} fontWeight={'semibold'} fontSize={'xl'}>1</Text>
          </Box>
          <VStack w = '80%'  justifyContent={'center'} space = {1}> 
               <Text color={theme.Text.base} fontWeight={'semibold'}>Chapter Name</Text>
               <HStack space = {1} alignItems={'center'}>
                    <Box w= {4} h = {4} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
                         <Image
                         id = 'Profile-Image'
                         style={{width : '100%' ,height :'100%'}}
                         source={data.image}
                         />
                    </Box>
                    <Text  color={theme.Text.base} fontSize={'xs'}>Approved 2 days ago</Text>
               </HStack>
               
          </VStack>
    </HStack>
     )
     }}
     </Pressable>
  )
}

export default Chaptercontainer;