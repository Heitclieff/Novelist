import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Box , 
HStack, 
VStack,
Text , 
Pressable,
IconButton} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'

import { useDispatch , useSelector } from 'react-redux'

interface containerProps {
     id : string,
     data : any,
     status : any,
     UpdatedTeams:any,
     teamsmode : boolean
}

const Userfield : React.FC <containerProps> = ({id ,data, status , UpdatedTeams , teamsmode = true}) => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();

     const OnselectedUsers =  () =>{
          try{
               UpdatedTeams(data);
               navigation.goBack();

          }catch(error){
               console.log("Failed to SetChapter Content" , error);
          }
          
     }
  return (
     <Pressable onPress={teamsmode ? OnselectedUsers : UpdatedTeams}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
               <HStack w="100%" alignItems={'center'} justifyContent={'center'} p={2} space={4} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.base} >
                    <Box w={50} h={50} bg='gray.200' rounded={'full'} overflow={'hidden'}>
                         <Image source={{ uri: data.pf_image }} style={{ maxWidth: '100%', maxHeight: '100%',width : '100%' , height : '100%' , objectFit: 'cover' }} />
                    </Box>
                    <HStack w='80%' h='100%' justifyContent={'space-between'} alignItems={'center'}>
                         <VStack>
                              <Text color={theme.Text.base} fontSize={'sm'}>{data.username}</Text>
                              <Text color={theme.Text.description} fontSize={'xs'}>{data.email}</Text>
                         </VStack>
                         {teamsmode &&
                              <Box>
                              {status && 
                                   status.pending ?   
                                        <Box borderWidth={1} rounded={'full'} borderColor={theme.Text.description}>
                                             <Text color = {theme.Text.description} fontSize={'xs'} m = {1}>Pending</Text>
                                        </Box>
                                        :
                                        
                                        
                                        <AntdesignIcon
                                        name={'plus'}
                                        size={15}
                                        color={theme.Icon.static}/>
                                        
                                   }
                         </Box>
                         }
                    </HStack>
               </HStack>
          )
     }}
  </Pressable>
  )
}

export default Userfield;