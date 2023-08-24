import React,{useContext, useState , useEffect} from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { Box, VStack,HStack,Text , Divider , Icon } from 'native-base'
import MemberAvatar from './MemberAvatar'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native'

interface containerProps {
     id : number,
     data : any
}
const  CreateContainer : React.FC <containerProps> =({id,data})=> {
     const theme:any = useContext(ThemeContext)
     const navigation = useNavigation();


  return (
     <Pressable onPress = {() => navigation.navigate('Creatorcontent',{id})}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return (
          <HStack w = '100%' h= {130} pl ={2} pr = {4} pt = {2} pb = {2} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null}>
               <Box w= '25%' h= '100%' bg=  'gray.200' mr = {2} overflow={'hidden'}>
                    <Image
                         id = 'item-image'
                         style={{width : '100%' , height : '100%'}}
                         source={data.images}
                    />
               </Box>
               <VStack w = '75%' h=  '100%'  bg = {theme.Bg.container} rounded={'md'} space = {2} pl = {3}>
                    <VStack justifyContent={'center'} pt = {1}>
                         <Text color={theme.Text.heading} fontWeight={'semibold'}>{data.title}</Text>
                         <HStack alignItems={'center'} space = {2}>
                              <Box w={1} h= {1} bg = 'green.400' rounded={'full'}></Box>
                              <Text color = {theme.Text.base} fontSize={'xs'}>Public</Text>
                         </HStack>
                    </VStack>
                    <Box w ='100%' pr = {2}>
                         <Divider bg=  {theme.Divider.comment}/>
                    </Box>
          
                         {data.creater &&
                              <HStack w = '100%' justifyContent={'flex-end'}>
                                   {data.creater.length >= 2 ? 
                                        <HStack flex=  {1} alignItems={'center'} justifyContent={'space-between'} mr = {5} space=  {2} >  
                                             <Box id = "Member-user" w = '60%' >
                                                  <Text color={theme.Text.base} fontSize={'xs'} numberOfLines={2}>
                                                       {`${data.creater[0].username} and ${data.creater[1].username}`} {data.creater.length > 2 ? `and ${data.creater.length -2} more`: null}                                            
                                                  </Text>
                                             </Box>
                                   
                                        <HStack>
                                             <MemberAvatar image = {data.creater[0].image}/>
                                             <MemberAvatar image = {data.creater[1].image}/>
                                             {data.creater.length > 2 &&
                                                       <Box w = '25' h = '25' rounded={'full'} bg = {theme.Bg.action} justifyContent={'center'} alignItems={'center'}>
                                                       <Icon 
                                                            size={'xs'}
                                                            as = {AntDesign} 
                                                            color = {theme.Icon.heading}
                                                            name = 'plus'/>
                                                       </Box>
                                                  }
                                             </HStack>
                                        </HStack>                                
                                   : 
                                        <HStack flex=  {1} alignItems={'center'} justifyContent={'space-between'} mr = {5} space=  {2} >  
                                             <Box id = "Member-user" w = '60%' >
                                                  <Text color={theme.Text.base} fontSize={'xs'} numberOfLines={2}>
                                                       {data.creater[0].username}
                                                  </Text>
                                             </Box>
                                             { data.creater.map((item:any , index:number) =>
                                             <MemberAvatar key = {index} image = {item.image}/>
                                             )}
                                        </HStack>
                              }
                              
     
                         
                         </HStack>
                         }    
               </VStack> 
          </HStack>
     )
     }}
     </Pressable>
  )
}

export default CreateContainer;
