import React, {useContext , useEffect, useState} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Pressable,
HStack,
VStack,
Box,
Text,
Button,
} from 'native-base'
import { Image } from 'react-native'

//@ firebase
import firestore from '@react-native-firebase/firestore'
import { useDispatch , useSelector} from 'react-redux'
import { setChaptercontent } from '../../../systems/redux/action'
interface containerProps {
     item : any 
     data : any
     doc_id : string
}

export const Userfieds : React.FC <containerProps> = ({item ,data , isreload,  doc_id ,selectedInvite, setSelectedInvited}) => {
     const theme:any = useContext(ThemeWrapper);
     const firebase = firestore()
     const [isSelected , setisSelected] = useState<boolean>(false);
     const [isJoined , setisJoined] = useState<boolean>(false);
     const chapterdocs = useSelector((state) => state.content)
     const dispatch = useDispatch();

     const createInvited = (join:boolean) =>{
          try{
               if(isJoined) return
              
               setisSelected(!isSelected);

               let updatedInvited = [];
               if(selectedInvite.length > 0){
                    if(selectedInvite?.find((doc) => doc == item.id)){
                         updatedInvited = selectedInvite.filter((doc) => doc !== item.id);
                    }else{
                         updatedInvited = [...selectedInvite, item.id];
                    }
               } 
               else{
                    updatedInvited = [item.id]
               }
           
               setSelectedInvited(updatedInvited);
          }catch(error){
               console.log("ERROR: Failed to Create Invitation to this Users." ,error)
          }
     }

     useEffect(() => {
          const isjoin = selectedInvite?.includes(item.id)
          let isSelected = false
          
          if(selectedInvite?.length > 0){
               isSelected =  selectedInvite?.includes(item.id);
               setisSelected(isSelected);
          }

          if(isjoin){
               setisJoined(isjoin);
               setisSelected(true);
          }
     } , [isreload])

  return (
       <Pressable onPress= {() => createInvited(!isJoined)} >
            {({
                 isHovered,
                 isFocused,
                 isPressed
            }) => {
                 return (
                      <HStack key={item.id} w='100%' p={1} alignItems={'center'} rounded = "md" space={2} bg={isPressed ? theme.Bg.action : isHovered ? theme.Bg.action : isSelected ||  isJoined  ? theme.Bg.action : theme.Bg.container}>
                           <Box
                                w="30px"
                                h="30px"
                                rounded="full"
                                overflow='hidden'
                                bg='gray.200' >
                                <Image
                                     source={{ uri: item.pf_image }}
                                     style={{
                                          maxWidth: '100%',
                                          maxHeight: "100%",
                                          width: '100%',
                                          height: "100%",
                                          objectFit: "cover"
                                     }}
                                />
                           </Box>
                           <VStack _text={{ fontSize: 'xs' }}>
                                <Text color={theme.Text.base}>{item.username}</Text>
                                <Text color={theme.Text.base} fontSize="xs">{item.email}</Text>
                           </VStack>
                           <HStack w='40%' justifyContent={'flex-end'} alignItems={'center'} pr = {5}>
                              {isSelected &&
                                   <Box w = {2} h=  {2} rounded = "full" bg = {'teal.500'}></Box>
                              }  
                           </HStack>

                      </HStack>
                 )
            }}
       </Pressable>
  )
}
