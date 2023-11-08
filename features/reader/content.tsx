import React,{useContext, useEffect, useState} from 'react'
import { 
Box , 
VStack , 
Button,
HStack,
useToast,
Text,
} from 'native-base'

import { useNavigation } from '@react-navigation/native'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { TextInput  , Alert } from 'react-native'
import { FlatList } from '../../components/layout/Flatlist/FlatList'
import Chapternavigation from '../../components/navigation/Chapternavigation'
import AlertItem from './components/Alert'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { setChapterWriteContent ,setChaptercontent , setprojectCommits } from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { useRoute } from '@react-navigation/native'


// @Redux tookits

//@ firebase
import firestore from '@react-native-firebase/firestore'
import Chapter from '../creator/pages/chapter';

interface pageProps {}
const Readcontent : React.FC <pageProps> = () => {
     const DOC_ID = "7xV6Am2tw5bII2xsHunR";
     const EDITABLE = true;
     const theme:any = useContext(ThemeWrapper)
     const toast = useToast();
     const route = useRoute();
     const dispatch = useDispatch();
     const firebase = firestore();
     const navigation = useNavigation();

     const {doc_id, id , title , noveltitle ,  chap_id , editable, commitable, commit_id , status} :any = route.params;
     
     const chapterdocs = useSelector((state) => state.content);
     const useraccount = useSelector((state) => state.userData);
     const projectcommits = useSelector((state) => state.field);
     const contentdocs = useSelector((state) => state.contentdocs);

     const [isDraft , setisDraft] = useState<boolean>(status);
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
     Alert.alert('Approved', 'Are you sure you want to Aprroved this request ?', [
          {
               text: 'No',
               style: 'cancel',
          },
          {text: 'yes', onPress: () => approvedcommitRequest()},
     ]);

     const DeleteRequestDialogs = () => 
     Alert.alert('Delete', 'Are you sure you want to Delete this request ?', [
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
                    title : "Hello",
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
                    ProjectFields.concat(projectcommits.field)
               }   


               dispatch(setChaptercontent({...chapterdocs , content : MergeChapters  , id : chapterdocs.id}))
               dispatch(setprojectCommits({field : ProjectFields }))

               navigation.goBack();

               console.log("send Request success" , docRef.id);
          }catch(error){
               console.log("Failed to Send Commit request" , error)
          }
     }


     const approvedcommitRequest = async () : Promise <void> => {
          try{
               if(!commit_id){
                    console.log("ERROR: Not founds any Commits id")
                    return
               }     
               const currentchapter = chapterdocs.content?.find((doc) => doc.id == id);
               currentchapter['commits'] = false;
               currentchapter['status'] = false;

               const removechapter = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter)
               const removecommits = projectcommits.field.filter(commit => commit.commit_id !== commit_id);

               dispatch(setChaptercontent({...chapterdocs , content : removechapter , id : chapterdocs.id}))
               dispatch(setprojectCommits({...projectcommits, field : removecommits}))
               
               const getnovel =  firebase.collection("Novels").doc(doc_id);
               const getcommits = getnovel.collection("Commits").doc(commit_id);
           
               const getchapters = chapterdocs.snapshotchapter.doc(id);
               await getchapters.update({status : false , commits : false});
               const commitRef = await getcommits.delete();

               navigation.goBack();

               console.log("Approved this request success");
               
          }catch(error){
               console.log("Failed to Aprroved Commits" , error);
          }
     }


     const removecommitRequest = async () : Promise <void> => {
          try{
               if(!commit_id){
                    console.log("ERROR: Not founds any Commits id")
                    return
               }    

               const currentchapter = chapterdocs.content?.find((doc) => doc.id == id);
               currentchapter['commits'] = false;
          
               const removechapter = chapterdocs.content.filter(item => item.id !== id).concat(currentchapter)
               const removecommits = projectcommits.field.filter(commit => commit.commit_id !== commit_id);
                  
               dispatch(setChaptercontent({...chapterdocs , content : removechapter , id : chapterdocs.id}))
               dispatch(setprojectCommits({...projectcommits, field : removecommits}));

               const getnovel =  firebase.collection("Novels").doc(doc_id);
               const getcommits = getnovel.collection("Commits").doc(commit_id);
           
               const getchapters = chapterdocs.snapshotchapter.doc(id);
               await getchapters.update({commits : false});
               const commitRef = await getcommits.delete();

               navigation.goBack();
               
               console.log("Remove this request success");
          }catch(error){
               console.log("Failed to Remove this Request." ,error);
          }
     }

     const changechapterStatement = async() : Promise<void> => {
          try{
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
               
               console.log("change chapter statements success");
          }catch(error){
               console.log("Failed to change chapter statement", error)
          }
     }

     const getnovelContent =  async () : Promise<void> => {
          try{
               const getchapter =  chapterdocs.snapshotchapter.doc(id)
               const getcontent = await getchapter.collection('Content').get()
               const contentDocs = getcontent.docs?.map(doc =>({id : doc.id ,...doc.data()}));

               setinputValue(contentDocs?.[0].content)
               setContentid(contentDocs?.[0].id);
               dispatch(setChapterWriteContent({contentdocs : contentDocs?.[0].content, docid : id , id : contentDocs?.[0].id}));
          }catch(error){
               console.log("Failed to get Novels content" , error);
          }
     }

     const updatedContent = async () : Promise <void> => {
          let toastStatus = "error"
          try {
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
        
               const getchapter = chapterdocs.snapshotchapter.doc(id)
               const getcontent = getchapter.collection('Content');
               const timestamp = firestore.FieldValue.serverTimestamp();

               const contentRef = await getcontent.doc(contentid).update({content : inputValue});
               const docRef = await getchapter.update({
                    updateAt : timestamp,
                    updatedBy : userdocs.id,
               });

               setisEdit(false);
               console.log("Updated Content Successfull.")
               toastStatus = "success"
          }catch(error) {
               console.error("Update Content Problem ", error);
          }

          toast.show({
               render: ({
                 id
               }) => {
                 return <AlertItem status = {toastStatus} /> 
               }
          })
     }

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
          status = {isDraft}
          chapterdocs = {{id : id , docid: doc_id}} 
          request = {sendcommitsRequest}/>
          <FlatList>
          {/* {novelItem.length > 0 &&  */}
               <VStack flex = {1}  p = {5} space = {5}>
                    {!editable && 
                    <HStack id = "story-heading-wrap" justifyContent={'center'} >
                         <VStack w = '80%' id = 'story-heading' alignItems={'center'} space = {2}>
                              <Text color = {theme.Text.base} fontWeight={'semibold'} >{noveltitle}</Text>
                              <Text color = {theme.Text.base} textAlign={'center'}>{`${title}`}</Text>
                              <HStack space = {1} mt = {2}>
                                   <Button 
                                   onPress = {DeleteRequestDialogs}
                                   variant={'outline'}
                                   borderColor={'rose.500'}
                                   colorScheme={'rose'}
                                   rounded={'full'} 
                                   p = {1.5} 
                                   _text={{fontSize : "xs"}} 
                                   w = "100px" 
                                   h={8}>Delete request</Button>

                                   <Button 
                                   onPress={ApprovedDialogs}
                                   borderColor={'teal.500'}
                                   colorScheme={'teal'}
                                   rounded={'full'} 
                                   p = {1.5} 
                                   _text={{fontSize : "xs"}}
                                   variant={'outline'}
                                   w = "100px" h={8}
                                   >Approved</Button>
                              </HStack>
                         </VStack>

                              
                    </HStack>}
                    <VStack p = {2}>
                         <Text id = "Novel-content" color = {theme.Text.base}>
                              {/* {`${novelItem[0].overview}`} */}
                         </Text>
                         <TextInput        
                         style = {{color : 'white'} }
                         multiline={true}
                         editable = {Editable}
                         textAlignVertical="top"
                         placeholder="พิมพ์ข้อความที่นี่..."
                         placeholderTextColor={'white'}
                         onChangeText={HandleChange}
                         // onChangeText={handleInputChange} // เรียกใช้งานเมื่อมีการเปลี่ยนแปลงข้อความ
                         value={inputValue} // กำหนดค่าของ TextInput จาก State
                         
                         />
                    </VStack>
                    {/* <Button colorScheme={'teal'} onPress = {uploadtoFirestore}>Test Save</Button> */}
               </VStack>
               
          {/*}*/}
                
          </FlatList>

    </VStack>
  )
}

export default Readcontent; 