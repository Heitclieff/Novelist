import React,{useContext} from 'react'
import { 
Box , 
HStack, 
VStack , 
Text, 
Pressable } from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';
interface containerProps {
     data : any
     isleader : boolean
}
const TeamItem : React.FC <containerProps> = ({data , isleader = false}) => {
     const theme:any = useContext(ThemeWrapper)
  return (
     <Pressable>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
          <HStack m = {1} p = {3} space = {3} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.container} rounded={'full'} alignItems={'center'} position={'relative'}>
               <Box w = {10} h = {10} rounded={'full'} bg = 'gray.200' overflow={'hidden'}>
                    <FastImage
                    id = 'profile-image'
                    resizeMode={FastImage.resizeMode.cover}
                    style={{width : '100%' ,height :'100%'}}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                         uri : data.pf_image,
                         priority : FastImage.priority.normal
                    }}
                    />
                    
               </Box>
               <VStack>
                    <Text color = {theme.Text.base} fontWeight={'semibold'}>{data.username}</Text>
                    <Text color = {theme.Text.base} fontSize={'xs'}>{data.email}</Text>
               </VStack>
               {data?.isyou &&
               <Box position={'absolute'} right={6}>
                    <Text color={theme.Text.description} fontSize={'xs'} >you</Text>
               </Box>
               }
         
          </HStack>  
          )
     }}
    
    </Pressable>
  )
}

export default TeamItem;