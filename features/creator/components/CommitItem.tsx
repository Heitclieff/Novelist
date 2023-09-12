import React,{useContext} from 'react'
import { 
Box , 
HStack, 
Text , 
VStack , 
Pressable} from 'native-base'
import { Image } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'

interface containerProps {
     data : any
}
const CommitItem : React.FC <containerProps>= ({data}) => {
     const theme:any = useContext(ThemeWrapper);
  return (
     <Pressable>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
               <VStack w = '100%' p ={3} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.container} space = {1} rounded={'md'}>
                    <Text color = {theme.Text.base} numberOfLines={1} fontWeight={'semibold'}>{data.title}</Text>
                    <Text color = {theme.Text.description} fontSize={'xs'}>{`Chapter ${data.chapter}`}</Text>
                    <HStack space = {2} mt = {1}>
                         <Box w = {5} h=  {5} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
                              <Image
                              id = 'Profile-image'
                              style ={{width : '100%' , height : '100%'}}
                              source={{uri :data.from.image}}
                              />
                         </Box>
                         <HStack space = {1}>
                              <Text fontSize={'xs'} color = {theme.Text.description} fontWeight={'medium'}>{`${data.from.username}`}</Text> 
                              <Text fontSize={'xs'} color = {theme.Text.description}>{`has commited 2 days ago`}</Text> 
                         </HStack>
                    
                    </HStack>
               </VStack>
          )
     }}
     </Pressable>
  )
}

export default CommitItem