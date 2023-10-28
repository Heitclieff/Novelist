import React,{useContext, useEffect, useState} from 'react'
import { 
Box , 
VStack , 
Button,
HStack,
useToast,

} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { TextInput , Text , Alert } from 'react-native'
import { FlatList } from '../../components/layout/Flatlist/FlatList'
// import ContentNavigation from '../../../../components/[stack]/Novel/[container]/ContentNavigation'
import Chapternavigation from '../../components/navigation/Chapternavigation'
import AlertItem from './components/Alert'
//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { setChapterWriteContent ,setChaptercontent } from '../../systems/redux/action'
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
     const {
     doc_id,
     id , 
     title , 
     noveltitle , 
     content,
     editable,} :any = route.params;
     
     const chapterdocs = useSelector((state) => state.content);
     const useraccount = useSelector((state) => state.userData);
     const contentdocs = useSelector((state) => state.contentdocs);
     const [inputValue ,setinputValue] = useState("");
     const [contentid ,setContentid] = useState<string>('');
     const HandleChange = (text:string) => {
          setinputValue(text)
     }



     const initialContent = async () : Promise <void> => {
          if(contentdocs.docid === id) {
               setinputValue(contentdocs.contentdocs);
               setContentid(contentdocs.id);
               return
          }

          if(id){
               getnovelContent();
          }
          
     }

     const getnovelContent =  async () : Promise<void> => {
          try{
               const content = await chapterdocs.snapshotchapter.doc(id).collection('Content').get();
               const contentDocs = content.docs?.map(doc =>({id : doc.id ,...doc.data()}));

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
          <Chapternavigation editable = {editable} event = {updatedContent} title = {title} chapterdocs = {{id : id , docid: doc_id}}/>
          <FlatList>
          {/* {novelItem.length > 0 &&  */}
               <VStack flex = {1}  p = {5} space = {5}>
                    {!editable && <HStack id = "story-heading-wrap" justifyContent={'center'} >
                         <VStack w = '80%' id = 'story-heading' alignItems={'center'} space = {2}>
                              <Text style = {{color : 'white'}} >{noveltitle}</Text>
                              <Text style = {{color : 'white' ,fontWeight : 600}} textAlign={'center'}>{`${title}`}</Text>
                              </VStack>
                    </HStack>}
                    <VStack p = {2}>
                         <Text id = "Novel-content" color = {theme.Text.base}>
                              {/* {`${novelItem[0].overview}`} */}
                         </Text>
                         <TextInput        
                         style = {{color : 'white'} }
                         multiline={true}
                         editable = {editable}
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