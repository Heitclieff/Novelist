import React,{useContext} from 'react'
import { 
Box , 
HStack, 
VStack , 
Text, 
Pressable, 
Divider,
Stack,
Badge} from 'native-base';
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
          <Stack w = '100%'  pl = {4} pr = {4}>
               <Stack w=  '100%' bg = {data.pending ? "amber.500" : "trueGray.400"} rounded  = "sm" pl = {1.5} >
                    <HStack 
                    p = {3} 
                    space = {3} 
                    bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.base} 
                    
                    alignItems={'center'} 
                    position={'relative'}
                    >
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
                         <Box position={'absolute'} right={3}>
                              <Badge
                              rounded ='full'
                              variant={'outline'}
                              colorScheme={'yellow'}
                              _text ={{fontSize : '10px'}}
                              >You
                              </Badge>
                         </Box>
                         }
                    </HStack>
                    <Divider bg = {theme.Divider.base}/>
               </Stack>      
          </Stack>
          )
     }}
    
    </Pressable>
  )
}

export default TeamItem;