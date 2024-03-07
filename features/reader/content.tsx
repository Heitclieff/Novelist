import React,{useContext, useEffect, useRef, useState} from 'react'
import { 
Box , 
VStack , 
Stack,
IconButton,
Button,
HStack,
useToast,
Text,
Badge,
Spinner,
} from 'native-base'
import { SmallCloseIcon , CheckIcon } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { TextInput  , Alert } from 'react-native'
import { FlatList } from '../../components/layout/Flatlist/FlatList'
import Chapternavigation from '../../components/navigation/Chapternavigation'
import AlertItem from './components/Alert'
import { MessageConfig } from '../search/assets/config'
import { useRoute } from '@react-navigation/native'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { AppState, AppStateStatus , BackHandler  } from 'react-native';
import Chapter from '../creator/pages/chapter';
import { Invitemodal } from '../creator/components/Invitemodal'
import SendAlert from '../../services/alertService'
import ReportModal from '../../components/layout/Modal/Report'
//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { setChapterWriteContent ,setChaptercontent , setprojectCommits } from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'
import sendNotification from '../../services/notificationService'

//@ firebase
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import { SpinnerItem } from '../../components/Spinner'

interface pageProps {}
const Readcontent : React.FC <pageProps> = () => {
     const DOC_ID = "7xV6Am2tw5bII2xsHunR";
     const EDITABLE = true;
     const theme:any = useContext(ThemeWrapper)
     const appState = useRef(AppState.currentState);
     const toast = useToast();
     const route = useRoute();
     const dispatch = useDispatch();
     const firebase = firestore();
     const navigation = useNavigation();
     const isFocused = useIsFocused();

     const {doc_id, id , title , noveltitle ,  chap_id , createdBy ,data, editable, commitable, commit_id , status} :any = route.params;
        
     const reference = database().ref(`/task/${doc_id}/${id}`)
          
     const chapterdocs = useSelector((state) => state.content);
     const projectdocs = useSelector((state) => state.docs)
     const useraccount = useSelector((state) => state.userData);
     const projectcommits = useSelector((state) => state.field);
     const contentdocs = useSelector((state) => state.contentdocs);
     const teamsdocs = useSelector((state) => state.teams);

     const [isLoading ,setLoading] = useState<boolean>(false);
     const [isDraft , setisDraft] = useState<boolean>(status);
     const [showModal, setShowModal] = useState<boolean>(false);
     const [showReport , setShowReport] = useState<boolean>(false);
     const [accessable ,setAccessable]  = useState<boolean>(false);
     const [Editable, setEditable] = useState<boolean>(false);
     const [isEdit ,setisEdit] = useState<boolean>(false);
     const [inputValue ,setinputValue] = useState("");
     const [contentid ,setContentid] = useState<string>('');
     
     const HandleChange = (text:string) => {
          if(!isEdit){
               setisEdit(true);
          }
          setinputValue(text)
     }
     
     const ApprovedDialogs = () => 
     Alert.alert('Publish', 'Are you sure you want to publish this episode ?', [
          {
               text: 'No',
               style: 'cancel',
          },
          {text: 'yes', onPress: () => approvedcommitRequest()},
     ]);

     const DeleteRequestDialogs = () => 
     Alert.alert('Cancel', 'Are you sure you want to unpublish this episode ?', [
          {
               text: 'No',
               style: 'cancel',
          },
          {text: 'yes', onPress: () => removecommitRequest()},
     ]);

     const initialContent = async () : Promise <void> => {
          if(editable){
               if(status){
                    setEditable(true);
               }

               if(useraccount?.[0].id === createdBy || useraccount?.[0].id === projectdocs.docs.owner){
                    setAccessable(true);
               }
          }
          
          if(contentdocs.docid === id) {
               setinputValue(contentdocs.contentdocs);
               setContentid(contentdocs.id);
               return
          }
       
          if(id){
               getnovelContent();
          }      
     }

     const sendcommitsRequest = async () : Promise <void> => {
          setLoading(true);
          let status = "error"
          try{
               const timestamp = firestore.FieldValue.serverTimestamp();
               const getnovel = firebase.collection('Novels').doc(doc_id);
               const getchapter = chapterdocs.snapshotchapter.doc(id);

               const currentDate = new Date();
               const formattedDate = {
                   seconds: Math.floor(currentDate.getTime() / 1000),
                   nanoseconds: (currentDate.getTime() % 1000) * 1000000,
               };
               
               const request = {
                    title : `${title}`,
                    chap_id : chap_id,
                    id :id,
                    doc_id : doc_id,
                    commit_by : useraccount?.[0].id,
               }          

               const docRef = await getnovel.collection('Commits').add({...request ,commit_date : timestamp});
               const chapRef = await getchapter.update({commits : true});
             

               const currentchapter = chapterdocs.content?.find((doc) => doc.id == id);
               currentchapter['commits'] = true;

               const MergeChapters = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter);
               const ProjectFields = [{...request , commit_id : docRef.id, commit_date : formattedDate}];

               if(projectcommits.field?.length > 0){
                    ProjectFields.push(...projectcommits.field)
               }   

               dispatch(setChaptercontent({...chapterdocs , content : MergeChapters  , id : chapterdocs.id}))
               dispatch(setprojectCommits({field : ProjectFields }))

               // send notification to leader of project.
               const teamsleader = teamsdocs?.teams.find((doc) => doc.id == doc.owner);

               sendNotification({
                    token : teamsleader.message_token,
                    target : teamsleader.id,
                    body : `${useraccount?.[0].username} has commited from ${title}.`,
                    icon: useraccount?.[0].pf_image,
                    type : 'notify',
                    project : doc_id,
               });

               navigation.goBack();
               status = "success"
               console.log("send Request success" , docRef.id);
          }catch(error){
               console.log("Failed to Send Commit request" , error);
          }
          reference.update({during : false});
          setLoading(false);
          SendAlert(status , "Pushed Commits" , "Push failed" , toast)
     }


     const approvedcommitRequest = async () : Promise <void> => {
          setLoading(true);
          let status = "error"
          try{
               const getnovel =  firebase.collection("Novels").doc(doc_id);
               const getcommits = getnovel.collection("Commits").doc(commit_id);
               reference.update({during : false});

               if(projectdocs.docs?.multiproject){
                    if(!commit_id){
                         console.log("ERROR: Not founds any Commits id")
                         return
                    }     

                    const currentchapter = chapterdocs.content?.find((doc) => doc.id == id);
                    currentchapter['commits'] = false;
                    currentchapter['status'] = false;
     
                    const removechapter = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter)
               
                    const { matchingCommits, removecommits } = projectcommits.field.reduce((acc, commit) => {
                         if (commit.commit_id === commit_id) {
                           acc.matchingCommits.push(commit);
                         } else {
                           acc.removecommits.push(commit);
                         }
                         return acc;
                       }, { matchingCommits: [], removecommits: [] });
     
     
                    if(!matchingCommits?.length > 0 ){
                         console.log("ERRORL Not founds any Commits in list")
                         return
                    }
     
                    const ownerCommits = teamsdocs?.teams.find((doc) => doc.id == matchingCommits[0].commit_by);
     
                    dispatch(setChaptercontent({...chapterdocs , content : removechapter , id : chapterdocs.id}))
                    dispatch(setprojectCommits({...projectcommits, field : removecommits}))
                    
                  
                    const getchapters = chapterdocs.snapshotchapter.doc(id);
                    await getchapters.update({status : false , commits : false});
                    const commitRef = await getcommits.delete();
      
     
                    let body = `${useraccount?.[0].username} has approved your commited.`;

                    if(ownerCommits.id === useraccount?.[0].id){
                         body = "you has Approve your commited."
                    }

                    sendNotification({
                         token : ownerCommits.message_token,
                         target : ownerCommits.id,
                         body : body,
                         icon: useraccount?.[0].pf_image,
                         type : 'notify',
                         project : doc_id,
                    });

                    status = "success"
               }else{

                    status = "success"
                    const getchapters = chapterdocs.snapshotchapter.doc(id);
                    await getchapters.update({status : false});

                    const currentchapter = chapterdocs.content?.find((doc) => doc.id == id);
                    currentchapter['commits'] = false;
                    currentchapter['status'] = false;
     
                    const removechapter = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter)
                    dispatch(setChaptercontent({...chapterdocs , content : removechapter , id : chapterdocs.id}))
               }

               navigation.navigate('Chapters');
               console.log("Approved this request success");
   
          }catch(error){
               console.log("Failed to Aprroved Commits" , error);
               reference.update({during : false})
          }

          SendAlert(status , "Approved" , "Approve failed" , toast);
          setLoading(false);
     }


     const removecommitRequest = async () : Promise <void> => {
          setLoading(true);
          let status = "error"
          try{
               if(!commit_id){
                    console.log("ERROR: Not founds any Commits id")
                    return
               }    

               const currentchapter = chapterdocs.content?.find((doc) => doc.id == id);
               currentchapter['commits'] = false;
          
               const removechapter = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter)
        
               const { matchingCommits, removecommits } = projectcommits.field.reduce((acc, commit) => {
                    if (commit.commit_id === commit_id) {
                      acc.matchingCommits.push(commit);
                    } else {
                      acc.removecommits.push(commit);
                    }
                    return acc;
                  }, { matchingCommits: [], removecommits: [] });


               if(!matchingCommits?.length > 0 ){
                    console.log("ERRORL Not founds any Commits in list")
                    return
               }

               const ownerCommits = teamsdocs?.teams.find((doc) => doc.id == matchingCommits[0].commit_by);

               dispatch(setChaptercontent({...chapterdocs , content : removechapter , id : chapterdocs.id}))
               dispatch(setprojectCommits({...projectcommits, field : removecommits}));

               const getnovel =  firebase.collection("Novels").doc(doc_id);
               const getcommits = getnovel.collection("Commits").doc(commit_id);
           
               const getchapters = chapterdocs.snapshotchapter.doc(id);
               await getchapters.update({commits : false});
               const commitRef = await getcommits.delete();
               
               let body = `${useraccount?.[0].username} has Removed your commited.`;

               if(ownerCommits.id === useraccount?.[0].id){
                    body = "you has Removed your commited."
               }

               sendNotification({
                    token : ownerCommits.message_token,
                    target : ownerCommits.id,
                    body : body,
                    icon: useraccount?.[0].pf_image,
                    type : 'notify',
                    project : doc_id,
               });


               navigation.goBack();
               console.log("Remove this request success");
               status = "success"
          }catch(error){
               console.log("Failed to Remove this Request." ,error);
               reference.update({during : false})
          }
          SendAlert(status , "Removed" , "Remove failed" , toast)
          setLoading(false);
     }

     const changechapterStatement = async() : Promise<void> => {
          setLoading(true);
          let status = "error"
          const currentContent =  chapterdocs.content.find((doc) => doc.id === id);
          if(!currentContent.access?.includes(useraccount?.[0].id)){
               if(projectdocs.docs.owner !== useraccount?.[0].id){
                    Alert.alert("Permission Denied" , "you don't have permission to access this chapters.")
                    return
               }
          }   
        
          try{
               reference.update({during : true});
               console.log("Chapterdocs",chapterdocs.content)

               const currentchapter = chapterdocs.content.find((doc) => doc.id == id);
               currentchapter['status'] = true;

               const removechapter = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter);

               dispatch(setChaptercontent({...chapterdocs , content : removechapter , id : chapterdocs.id}));

               const getnovel =  firebase.collection("Novels").doc(doc_id);
               const getchapters = chapterdocs.snapshotchapter.doc(id);
               await getchapters.update({status : true});

               setEditable(true);
               setisDraft(true);
               
               status = "success"
               console.log("change chapter statements success");
          }catch(error){
               console.log("Failed to change chapter statement", error)
               reference.update({during : false})
          }
          SendAlert(status , "Edit Mode" , "Changes failed" , toast)
          setLoading(false);
     }

     const getnovelContent =  async () : Promise<void> => {
          try{
               const getnovel =  firebase.collection("Novels").doc(doc_id);
               const getchapter =  getnovel.collection("Chapters").doc(id);
               const getcontent = await getchapter.collection('Content').get()
               const contentDocs = getcontent.docs?.map(doc =>({id : doc.id ,...doc.data()}));

               setinputValue(contentDocs?.[0].content)
               setContentid(contentDocs?.[0].id);
               dispatch(setChapterWriteContent({contentdocs : contentDocs?.[0].content, docid : id , id : contentDocs?.[0].id}));
          }catch(error){
               console.log("Failed to get Novels content" , error);
               reference.update({during : false})
               
          }
     }
     const updatedContent = async () : Promise <void> => {
          setLoading(true);
          let toastStatus = "error"
          
          try {
               const getnovel = firestore().collection("Novels").doc(doc_id);
               const snapChapters = getnovel.collection("Chapters").doc(id);

               const currentDate = new Date();
               const formattedDate = {
                   seconds: Math.floor(currentDate.getTime() / 1000),
                   nanoseconds: (currentDate.getTime() % 1000) * 1000000,
               };
               const userdocs = useraccount?.[0]
               const index = chapterdocs.content.findIndex(chapter => chapter.id === id);

               
               const updateddocs = chapterdocs.content;

               updateddocs[index].updateAt = formattedDate
               updateddocs[index].updatedBy = userdocs.id
               updateddocs[index].updatedimg = userdocs.pf_image

               dispatch(setChaptercontent({content : updateddocs, ...chapterdocs}))
               dispatch(setChapterWriteContent({contentdocs : inputValue, docid : id , id : contentid}));
        
               const getcontent = snapChapters.collection('Content');
               const timestamp = firestore.FieldValue.serverTimestamp();

               const contentRef = await getcontent.doc(contentid).update({content : inputValue});
               const docRef = await snapChapters.update({
                    updateAt : timestamp,
                    updatedBy : userdocs.id,
               });

               setisEdit(false);
               console.log("Updated Content Successfull.")
               toastStatus = "success"
          }catch(error) {
               console.error("Update Content Problem ", error);
               reference.update({during : false})
          }
          setLoading(false);
          SendAlert(toastStatus , "Saved" , "Saving failed" , toast)
          
     }

     

      const GoBackwithReference = () => {
          navigation.navigate('Episodes');
          reference.update({during : false})
      }

      useEffect(() => {

          if(!editable || !status){
               return
          }

          reference.update({during : true})
          const subscription = AppState.addEventListener('change', nextAppState => {
            if (
              appState.current.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              console.log('App has come to the foreground!');
            }

            if (nextAppState === 'inactive') {
               console.log('App has gone soon.');
            }
      

            appState.current = nextAppState;
            
            if(appState.current === 'active'){
               reference.update({during : true})
            }else{
               reference.update({during : false})
            }

            console.log('AppState', appState.current);

        
          });
      
          return () => {
            subscription.remove();
          };
        }, []);

        useEffect(() => {
          
          if(!editable || !status){
               return
          }

          const backAction = () => {
            Alert.alert('Saving!', 'Are you sure you want to go back without save?', [
              {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
              },
              {text: 'YES', onPress: () => GoBackwithReference()},
            ]);
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          );
      
          return () => backHandler.remove();
        }, []);

     useEffect(() => {
          initialContent();
      }, [id]);


  return (
    <VStack bg = {theme.Bg.base} flex ={1}>
          <Chapternavigation 
          editable = {editable} 
          isEdit = {isEdit} 
          commitable = {commitable} 
          event = {updatedContent} 
          chapterstate = {changechapterStatement}
          title = {title}
          openInvite = {setShowModal}
          setShowReport = {setShowReport}
          multiproject = {projectdocs.docs?.multiproject}
          approveproject = {approvedcommitRequest}
          createdBy = {createdBy}
          isLoading = {isLoading}
          accessable = {accessable}
          status = {isDraft}
          chapterdocs = {{id : id , docid: doc_id}} 
          GoBackwithReference = {GoBackwithReference}
          request = {sendcommitsRequest}/>
          <FlatList Verticalscroll = {true} disableRefresh = {true} >
          {/* {novelItem.length > 0 &&  */}
               <VStack flex = {1}  p = {5} space = {5}>
                   
             
                    <HStack id = "story-heading-wrap" justifyContent={'center'}>
                         <Stack w = '95%' bg = {commit_id ?  'amber.500' : 'teal.500'} pl = {2} p = {0.4} rounded= 'sm'>
                         <VStack  id = 'story-heading' alignItems={'center'} space = {2} bg = {theme.themeMode === "dark" ? 'rgba(23, 22, 19 , 1)' : 'trueGray.50'} p = {2} rounded= 'sm'> 
                              {!commit_id ? 
                                   <Text color = {theme.Text.base} fontWeight={'semibold'} textAlign={'center'}>{noveltitle}</Text>
                                   :
                                   <Badge alignSelf="center" variant={'outline'} colorScheme={'amber'} rounded= 'full'>
                                        <HStack space = {1}>
                                             <Spinner size = {12} color = "amber.500" />
                                             <Text color = "amber.500" fontSize={'xs'} >EP.{chap_id}</Text>
                                        </HStack>
                                   </Badge>
                              }
                              <Text color = {theme.Text.base} textAlign={'center'}>{`${title}`}</Text>
                    {commit_id && isLoading ?
                         <SpinnerItem/>
                    :         
                    commit_id &&
                         <HStack space = {1} mt = {2}  alignItems={'center'}>
                         
                         <Button 
                              onPress = {DeleteRequestDialogs}
                              bg={'transparent'}
                              borderColor={'gray.800'}
                              colorScheme={'rose'}
                              rounded={'full'} 
                              p = {1.5} 
                              borderWidth={1}
                              h={8}
                              _text={{fontSize : "xs" , color : theme.Text.base}} 
                              w = "130px" 
                              leftIcon={<SmallCloseIcon style = {{color : 'red'}}/>}
                              >
                              Cancel
                         </Button>
                         {
                         projectdocs.docs?.owner === useraccount?.[0].id &&
                              <Button 
                              onPress={ApprovedDialogs}
                              borderColor={'teal.500'}
                              colorScheme={'teal'}
                              rounded={'full'} 
                              p = {1.5} 
                              _text={{fontSize : "xs"}}
                              variant={'outline'}
                              w=  "130px" 
                              h={8}
                              leftIcon={
                                   <CheckIcon/>
                              }
                              >Publish
                              </Button>
                         }    
                         
                         </HStack>
                    }
                         </VStack>  
                         </Stack>
                    </HStack>            
                    
                    <VStack p = {2}>
                         <Text id = "Novel-content" color = {theme.Text.base}>
                              {/* {`${novelItem[0].overview}`} */}
                         </Text>
                         <TextInput     
                         style = {{color : theme.Text.reading} }
                         multiline={true}
                         editable = {Editable}
                         textAlignVertical="top"
                         
                         placeholder="Type something..."
                         placeholderTextColor={theme.Text.reading}
                         onChangeText={HandleChange}
                         // onChangeText={handleInputChange} // เรียกใช้งานเมื่อมีการเปลี่ยนแปลงข้อความ
                         value={inputValue} // กำหนดค่าของ TextInput จาก State
                         
                         />
                    </VStack>
                    {/* <Button colorScheme={'teal'} onPress = {uploadtoFirestore}>Test Save</Button> */}
               </VStack>
          {/*}*/}
                
          </FlatList>    
     {editable &&
          <Invitemodal 
          theme = {theme}
          data = {data}
          doc_id = {doc_id}
          createdBy = {createdBy} 
          showModal = {showModal} 
          setShowModal = {setShowModal}/>
     }

     {!editable && 
          <ReportModal
          userid = {useraccount?.[0].id}
          doc_id = {doc_id}
          data = {data}
          showReport = {showReport}
          setShowReport={setShowReport}
          
          />
     } 
    </VStack>
  )
}

export default Readcontent; 