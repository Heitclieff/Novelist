import React, {useContext, useEffect, useState} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Box,
Button,
FormControl,
HStack,
Input,
Modal,
Text,
VStack,
Pressable,
useToast,
} from 'native-base'
import { Alert, Image } from 'react-native'

import { Userfieds } from './userfieds'
import AlertItem from '../../reader/components/Alert'
// @Redux tookits
import { useSelector , useDispatch } from 'react-redux'
import { setChaptercontent } from '../../../systems/redux/action'
//@ firebase
import firestore from '@react-native-firebase/firestore'

interface containerProps { 
     showModal : boolean
     setShowModal : any
     createdBy : string
     doc_id : string
     data : any
}

export const Invitemodal : React.FC <containerProps> = ({showModal , setShowModal , createdBy , data , doc_id}) => {
     const theme:any = useContext(ThemeWrapper);

     const userData = useSelector((state) => state.userData);
     const userdocs = useSelector((state) => state.teams);
     const chapterdocs = useSelector((state) => state.content)
     const [userDisplay , setuserDisplay] = useState<any[]>([]);

     const dispatch = useDispatch();
     const toast = useToast();
     const firebase = firestore();
     const getnovel = firebase.collection("Novels").doc(doc_id);
     const getchapter = getnovel.collection("Chapters").doc(data.id)
     
     const [selectedInvite , setSelectedInvited] = useState<any[]>([])
     const [access , setAccess] = useState<any[]>([]);

     const filteruserwithoutPending = () => {
          if(userdocs?.teams.length == 1) {
               setuserDisplay(userdocs.teams);
               return
          }

          const filteruser = userdocs.teams.filter((doc) => doc.pending == false)
          setuserDisplay(filteruser);
     }
     
     const sendInvitetoselected = () => {
          let toastStatus = "error";
          if(!selectedInvite.length > 0){
               Alert.alert("Error" , "Please select Member first.");
               return
          }

          if(selectedInvite.length == 2){
               Alert.alert("Error" , "this chapter was full");
               return
          }
          
          try{
               setShowModal(false);
               const getnovel = firebase.collection("Novels").doc(doc_id);
               const getchapter = getnovel.collection("Chapters").doc(data.id)

               if(!selectedInvite?.length > 0){
                    console.log("Not founds anyone in list");
                    return
               }
               getchapter.update({access : selectedInvite});

               const removechapter =  chapterdocs.content
               ?.filter((doc) => doc.id !== data.id)
               .concat({ ...data ,  access : selectedInvite});

               dispatch(setChaptercontent({...chapterdocs , content : removechapter}))
               toastStatus = "success"
          }catch(error){
               console.log("ERROR: Failed to send Invite to users",error)
          }

          toast.show({
               placement : 'top',
               render: ({
                 id
               }) => {
                 return <AlertItem 
                 theme=  {theme} 
                 status = {toastStatus}
                 successText = "Send invited"
                 failedText = "invited failed"
                 /> 
               }
          })

     }


     const validationAccess = async () => {
          try{
               const chapterRef = await getchapter.get();
               const chapterDOC = chapterRef.data()
            
               if(chapterDOC){
                    setSelectedInvited(chapterDOC?.access)
                    setAccess(chapterDOC?.access)
               }
          }catch(error){
               console.log("ERROR: Failed to get Access users" ,error)
          }
     }
     
     useEffect(() => {
          filteruserwithoutPending();
     } , [])


     useEffect(() => {
          validationAccess();
     },[showModal])
     
  return (
       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px" bg = {theme.Bg.container} >
                 <Modal.CloseButton />
                 <Modal.Header 
                 bg = {theme.Bg.container} 
                 borderBottomWidth={0}
                 _text = {{color : theme.Text.heading}}
                 >Invite</Modal.Header>
                 <Modal.Body bg = {theme.Bg.container} space = {2}>
                    <VStack space = {1}>
                    {userDisplay?.length > 0 &&
                    userDisplay.map((item) => {
                         const isrenderer = item.id !== createdBy;
             
                         if(isrenderer)
                         return(
                         
                              <Userfieds 
                              theme = {theme}
                              key = {item.id}
                              doc_id = {doc_id} 
                              isreload = {showModal}
                              selectedInvite = {selectedInvite}
                              setSelectedInvited = {setSelectedInvited}
                              item = {item} 
                              data = {data}/>
                         )
                    })
               }
               </VStack>
                 </Modal.Body>
                 {access?.length !== 2 &&
                    <Modal.Footer bg = {theme.Bg.container} borderTopWidth={0}>
                         {selectedInvite?.length > 0 &&
                              <Button 
                              w= '100%' 
                              p = {1} 
                              colorScheme={'teal'} 
                              rounded={'sm'} 
                              onPress={sendInvitetoselected}>
                                   Invite
                              </Button>
                         } 
                    </Modal.Footer>
                 }
            </Modal.Content>
       </Modal>
  )
}
