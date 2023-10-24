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

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { useRoute } from '@react-navigation/native'
import Chapternavigation from '../../components/navigation/Chapternavigation'
import AlertItem from './components/Alert'
//firebase
import firestore from '@react-native-firebase/firestore'
import Chapter from '../creator/pages/chapter';

interface pageProps {}
const Readcontent : React.FC <pageProps> = () => {
     const DOC_ID = "7xV6Am2tw5bII2xsHunR";
     const EDITABLE = true;
     const theme:any = useContext(ThemeWrapper)
     const toast = useToast();
     const route = useRoute();
     const {
     doc_id,
     id , 
     title , 
     noveltitle , 
     content,
     editable,} :any = route.params;
     
     const [inputValue ,setinputValue] = useState("");
     const HandleChange = (text:string) => {
          setinputValue(text)
     }

     const initialContent = async () : Promise <void> => {
          if(content) setinputValue(content);
     }

     const updatedContent = async () : Promise <void> => {
          const maincollection = await firestore().collection('Novels').doc(doc_id);
          const subcollection =  maincollection.collection('Chapters');
          let toastStatus = "error"
          try {
               await subcollection.doc(id).update({content : inputValue});
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


      console.log("DOC_ID" , doc_id)
      console.log("id" , id)

  return (
    <VStack bg = {theme.Bg.base} flex ={1}>
          <Chapternavigation editable = {editable} event = {updatedContent} title = {title}/>
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