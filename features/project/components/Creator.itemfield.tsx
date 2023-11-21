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
import FastImage from 'react-native-fast-image';
//@Components
import Avatarfield from '../../../components/field/Avatarfield'

//firebase
import firestore from '@react-native-firebase/firestore'

interface containerProps {
     id : number,
     title: string,
     image :string,
     status: string,
     creator : any,


}
const CreatorItemfield : React.FC <containerProps> = ({id, title , image , status , creator})=> {
     const theme:any = useContext(ThemeWrapper)
     const navigation = useNavigation();
     const [creatorlist ,setCreatorlist] = useState<any[]>([]);
     
     const MatchingUserid = async (creatordocs:any): Promise <void>  => {
        try{
          const snapshotuser = await firestore().collection('Users').where(firestore.FieldPath.documentId(), 'in' , creatordocs.map(String)).get();
          const userdocs = snapshotuser.docs.map(doc => ({id : doc.id , ...doc.data()}));
          setCreatorlist(userdocs)

        }catch(error){
          console.error("Error fetching userdocs:", error);
        }
     }


     const fetchingcreator = async (): Promise<void> => {
          try{
               const projectkey = firestore().collection('Novels').doc(id);
               const creatorkey = await projectkey.collection("Creator").get();

               const creatordocs = creatorkey?.docs.map(doc => doc.data().userDoc)
               MatchingUserid(creatordocs);
          }catch(error) {
               console.error("Error fetching creator from collection:", error);
          }
     }

     useEffect(() => {
          fetchingcreator();
          // MatchingUserid()
     }, [id])

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
                    <FastImage
                         id = 'item-image'
                         alt = "images"
                         resizeMode={FastImage.resizeMode.cover}
                         source={{
                              uri : image  , 
                              header :{Authorization : "someAuthToken"},
                              priority : FastImage.priority.normal}}
                         style={{
                              width : '100%' , 
                              height : '100%'
                         }}
                    />
               </Box>
               <VStack w = '75%' h=  '100%'  bg = {theme.Bg.container} rounded={'md'} space = {2} pl = {3}>
                    <VStack justifyContent={'center'} pt = {1}>
                         <Text color={theme.Text.heading} fontWeight={'semibold'}>{title}</Text>
                         <HStack alignItems={'center'} space = {2}>
                              <Box w={1} h= {1} bg = {status ? 'green.400' : 'red.400'} rounded={'full'}></Box>
                              <Text color = {theme.Text.base} fontSize={'xs'}>{status ? "Public" : "Private"}</Text>
                         </HStack>
                    </VStack>
                    <Box w ='100%' pr = {2}>
                         <Divider bg=  {theme.Divider.comment}/>
                    </Box>
                         {creatorlist.length > 0 &&
                              <HStack w = '100%' justifyContent={'flex-end'}>
                                   {creatorlist.length >= 2 ? 
                                        <HStack flex=  {1} alignItems={'center'} justifyContent={'space-between'} mr = {5} space=  {2} >  
                                             <Box id = "Member-user" w = '60%' >
                                                  <Text color={theme.Text.base} fontSize={'xs'} numberOfLines={2}>
                                                       {`${creatorlist[0].username} and ${creatorlist[1].username}`} {creatorlist.length > 2 ? `and ${creatorlist.length -2} more`: null}                                            
                                                  </Text>
                                             </Box>
                                   
                                        <HStack>
                                             <Avatarfield image = {creatorlist[0].pf_image}/>
                                             <Avatarfield image = {creatorlist[1].pf_image}/>
                                             {creatorlist.length > 2 && 
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
                                                       {creatorlist[0].username}
                                                  </Text>
                                             </Box>
                                             {creatorlist.map((item:any , index:number) =>
                                             <Avatarfield key = {index} image = {item.pf_image}/>
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