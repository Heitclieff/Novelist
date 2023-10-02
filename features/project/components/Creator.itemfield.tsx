import React,{useContext, useState , useEffect} from 'react'
import {
Box, 
VStack,
HStack,
Text , 
Divider , 
Icon , 
Pressable } from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'

//@Components
import Avatarfield from '../../../components/field/Avatarfield'

//firebase
import firestore from '@react-native-firebase/firestore'

interface containerProps {
     id : number,
     data : any
}
const CreatorItemfield : React.FC <containerProps> = async ({id,data})=> {
     const theme:any = useContext(ThemeWrapper)
     const navigation = useNavigation();
     // console.log(data.project)

     // get novel data
     const list = data.project
     const novel_collections = []
     for (let i=0; i < list.length; i++) {
          const snapNovel = await firestore().collection('Novels').doc(list[i]).get()
          novel_collections.push({ id: snapNovel.id, ...snapNovel.data()})
     }
     // user data use data.username data.pf_image ...

     //novel user novel_collections[i].imag , novel_collections[i]...
     
     // console.log('creator itemfield',novel_collections[0].image)
     



     return ( 
     <Pressable onPress = {() => navigation.navigate('CreatorContent',{id})}>
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
                         source={{uri:data.image}}
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
                                             <Avatarfield image = {data.creater[0].images}/>
                                             <Avatarfield image = {data.creater[1].images}/>
                                             {data.creater.length > 2 &&
                                                       <Box w = '25' h = '25' rounded={'full'} bg = {theme.Bg.action} justifyContent={'center'} alignItems={'center'}>
                                                       <AntdesignIcon 
                                                            size={10}
                                                            color = {'white'}
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
                                             {data.creater.map((item:any , index:number) =>
                                             <Avatarfield key = {index} image = {item.images}/>
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

export default CreatorItemfield;