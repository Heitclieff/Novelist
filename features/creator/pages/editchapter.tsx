import React,{useContext , useEffect , useState} from 'react'
import { VStack , Text , FormControl , Input , } from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import Centernavigation from '../../../components/navigation/Centernavigation'
import { useRoute } from '@react-navigation/native'

// @Redux Tookits
import { useDispatch , useSelector } from 'react-redux'
import { setChaptercontent } from '../../../systems/redux/action'
// @firestore

import firestore from '@react-native-firebase/firestore'

interface pageProps {}
const EditChapter : React.FC <pageProps> = () => {
     const route = useRoute();
     const dispatch = useDispatch();

     const chaptercontent  = useSelector((state) => state.content)
     const useraccount = useSelector((state) => state.userData);

     const {title , chapterdocs , setChapterheader}:any = route.params;
     const theme:any = useContext(ThemeWrapper);

     const [chapterTitle , setChapterTitle] = useState<string>(title);
     const [isEdit , setisEdit] = useState<boolean>(false);

   
     const SavingEditChapter = async () => {
          try{
               const saperatedchapter = {updated : {} , still : []}
               chaptercontent.content.forEach(doc => {
                    if(doc.id == chapterdocs.id) {
                         saperatedchapter.updated = doc
                    }else{
                         saperatedchapter.still.push(doc);
                    }
               })

               const currentDate = new Date();
               const formattedDate = {
                   seconds: Math.floor(currentDate.getTime() / 1000),
                   nanoseconds: (currentDate.getTime() % 1000) * 1000000,
               };
               saperatedchapter.updated['title'] = chapterTitle
               saperatedchapter.updated['updateAt'] = formattedDate
               saperatedchapter.updated['updatedBy'] = useraccount?.[0].id
               saperatedchapter.updated['updatedimg'] = useraccount?.[0].pf_image
               
               const combindchapter =[{...saperatedchapter.updated},...saperatedchapter.still]
               setChapterheader(chapterTitle);
               dispatch(setChaptercontent({content : combindchapter , id : chapterdocs.docid , snapshotchapter : chapterdocs.snapshotchapter}));
     
               const novelpath =  firestore().collection('Novels').doc(chapterdocs.docid);
               const chapterpath= novelpath.collection('Chapters').doc(chapterdocs.id);
               const timestamp = firestore.FieldValue.serverTimestamp();
               const docRef = await chapterpath.update({
                    title  : chapterTitle,
                    updatedAt : timestamp,
                    updatedBy : useraccount[0].id,
               });
          }catch(error){
               console.log("Failed To update title name",error)
          }
         
     }

  return (
     <VStack flex=  {1} bg = {theme.Bg.base}>
     <Centernavigation title = "Edit Chapter" onEditcontent = {isEdit} isAction = {SavingEditChapter}/>
     <VStack p = {6} space = {2}>
          <Text color={theme.Text.base} fontWeight={'semibold'} pb={2} >Chapter Title</Text>
               <FormControl mb="5">
               <Input  
               w = {'100%'} 
               h = {10} 
               bg=  {theme.Bg.container} 
               value = {chapterTitle}
               rounded={'full'} 
               borderColor={theme.Bg.container}
               color = {theme.Text.base}
               onChangeText={(e) => {setChapterTitle(e); setisEdit(true);}}
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

export default EditChapter;