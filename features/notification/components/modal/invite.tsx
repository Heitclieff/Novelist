import React, { useState, useEffect , useContext } from 'react'
import { ThemeWrapper } from '../../../../systems/theme/Themeprovider'
import { 
Box, 
Text,
Button,
Modal,
FormControl,
Input,
Center,
VStack,
HStack,
} from 'native-base'
import { Image } from 'react-native'

interface containerProps {
     inviteShow : boolean
     setInviteShow : any
     Accept: any
}

export const InviteModal: React.FC<containerProps> = ({inviteShow , setInviteShow , Accept}) => {
     const theme:any = useContext(ThemeWrapper);

     return (
          <Center>
               <Modal isOpen={inviteShow?.status} onClose={() => setInviteShow({status : false})} >
                    <Modal.Content maxWidth="400px" >
                         <Modal.CloseButton rounded = "full" _icon={{size : 'xs'}}/>
                         <Modal.Header bg = {theme.Bg.container} borderBottomWidth={0}></Modal.Header>
                         <Modal.Body bg = {theme.Bg.container}>    
                                   <VStack>
                                        <Center>
                                             <Box w = '70' h = '70' bg = 'gray.200' rounded = 'full' overflow = 'hidden'> 
                                                  <Image
                                                       style = {{maxWidth : "100%" , maxHeight : '100%', width : '100%' , height : '100%' , objectFit : 'cover'}}
                                                       source={{uri : inviteShow.data?.image}}
                                                  />
                                             </Box>
                                             
                                             <VStack mt = {2} alignItems={"center"} space = {1}>
                                                  <Text color = {theme.Text.heading} fontWeight = {'semibold'}>Recived</Text>
                                                  <Text  color = {theme.Text.base}>{inviteShow.data?.title}</Text>
                                      
                                             </VStack>
                                        </Center>
                                   </VStack>  
                         </Modal.Body>
                         <Modal.Footer bg  = {theme.Bg.container} borderTopWidth={0}>
                              <HStack w = '100%' justifyContent = "center" space = {2} >
                                   <Button w = {'40%'} h=  {30} p = {0} rounded = 'full' variant={'outline'} _text={{color : theme.Text.base}} onPress={() => setInviteShow({status : false})}>Cancel</Button>
                                   <Button w = {'40%'} h=  {30} p = {0}  rounded = 'full' colorScheme={'teal'} onPress ={() => Accept(inviteShow.data)}>Accept</Button>
                              </HStack>
                            
                         </Modal.Footer>
                    </Modal.Content>
               </Modal>
          </Center>
  )
}

