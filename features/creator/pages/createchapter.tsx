import React, { useContext, useState  } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack , 
Text,
Input,
FormControl,
Button } from 'native-base'
import { useRoute } from '@react-navigation/native'
import Centernavigation from '../../../components/navigation/Centernavigation'
import Chapter from './chapter'
import { useNavigation } from '@react-navigation/native'


// @Redux toolkits
import { useSelector , useDispatch } from 'react-redux'
import { setChaptercontent } from '../../../systems/redux/action'

// @Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

interface Pageprops {}
const CreateChapter : React.FC <Pageprops> = () =>{
     const theme:any = useContext(ThemeWrapper);     
     const navigation = useNavigation();
     const route = useRoute();
     const dispatch = useDispatch();
     const chapterdocs = useSelector((state) => state.content);
     const userdata = useSelector((state) => state.userData)
     
     const [ChapterTitle , setChapterTitle] = useState<string>('');
     const [isEdit ,setisEdit] = useState<boolean>(false);
     const {doc_id} = route.params

     const CreateChapter = async () : Promise <void> => {
          try{
               if(!ChapterTitle){
                    console.log("INSERT TITLE")
                     return
                }
      

                const timestamp = firestore.FieldValue.serverTimestamp();
                const projectpath = firestore().collection("Novels").doc(doc_id);
                const chapterpath = projectpath.collection('Chapters');

                const getchapter = await chapterpath.orderBy('chap_id', 'desc').limit(1).get()
                const chapterDOC = getchapter.docs.map((doc) => doc.data());
                
                
                const currentDate = new Date();
                const formattedDate = {
                    seconds: Math.floor(currentDate.getTime() / 1000),
                    nanoseconds: (currentDate.getTime() % 1000) * 1000000,
                };

                const docAdd = { 
                    chap_id : chapterDOC.length > 0 ? chapterDOC[0].chap_id + 1  : 1,
                    access : [userdata[0].id],
                    status : true ,
                    title : ChapterTitle,
                    commits : false,
                    createdBy : userdata[0].id,
                    updatedBy : userdata[0].id,
                    updatedimg : userdata[0].pf_image,
                    
               }
                const docRef = await chapterpath.add({...docAdd , updateAt : timestamp}); 
                const contentRef = await chapterpath.doc(docRef.id).collection("Content").add({content : ""})

                
               const newReference = database().ref(`/task/${doc_id}`).child(docRef.id); 

               const realtimeRef = await newReference
                         .set({
                              during :false
                    })

               console.log(docRef.id)
                // Create and Add to firestore and waiting for firestore return key id;
                dispatch(setChaptercontent(  
                    {
                    ...chapterdocs,
                    content : [{
                         id : docRef.id , 
                         updateAt : formattedDate, 
                         ...docAdd
                         } , 
                    ...chapterdocs.content
                    ] ,

               }))
                navigation.navigate('Readcontent', {
                    doc_id : doc_id , 
                    id : docRef.id , 
                    title : ChapterTitle , 
                    content : '' ,
                    editable : true,
                    status : true,
                    commitable : false,
               })
          }catch(error){
               console.log("Failed To Create Chapter ", error);
          }
      
     }

  return (
     <VStack flex=  {1} bg = {theme.Bg.base}>
          <Centernavigation title = "Create Chapter" onEditcontent = {isEdit} isAction = {CreateChapter}/>
          <VStack p = {6} space = {2}>
               <Text color={theme.Text.base} fontWeight={'semibold'} pb={2} >Chapter Title</Text>
                    <FormControl mb="5">
                    <Input 
                    w = {'100%'} 
                    h = {10} 
                    bg=  {theme.Bg.container} 
                    rounded={'full'} 
                    borderColor={theme.Bg.container}
                    color = {theme.Text.base}
                    onChangeText={(e) => {setChapterTitle(e); setisEdit(true)}}
                    />
                    <FormControl.HelperText>
                         Give your a chapter title.
                    </FormControl.HelperText>
                    </FormControl>
               {/* <Button rounded={'full'} colorScheme={'teal'} h=  {10} onPress = {CreateChapter}>Create</Button> */}
          </VStack>
         
     </VStack>
  )
}

export default CreateChapter;
