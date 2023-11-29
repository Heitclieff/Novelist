import React,{useContext, useEffect , useState} from 'react'
import { 
Box , 
VStack ,
Text , 
Input, 
Button,
useToast,
Spinner,
HStack,
Center} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation , useRoute } from '@react-navigation/native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Categorydata } from '../../../assets/content/VisualCollectionsdata'
import { Alert } from 'react-native'
//@Redux toolkits
import { useDispatch , useSelector } from 'react-redux'
import { setTags } from '../../../systems/redux/action'
import { SpinnerItem } from '../../../components/Spinner'
import AlertItem from '../../reader/components/Alert'
//@Components
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import Centernavigation from '../../../components/navigation/Centernavigation'
import TagItem from '../components/Tagitem'
import { StatusDialog } from '../assets/toastStatus'
import SendAlert from '../../../services/alertService'

//@Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


interface Pageprops {}

const Memorizednavigation = React.memo(Centernavigation);

const Tag: React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const route:any = useRoute();
     const dispatch = useDispatch();
     const toast = useToast();

     const {current_tags , handleTagupdate , status} = route.params;
     const tagdocs = useSelector((state) => state.tags)
     const catedocs = useSelector((state) => state.category)
     
     const [selectedTags , setSelectedTags] = useState<any[]>([]);
     const [isEdit , setisEdit] = useState<boolean>(false);
     const [isLoading , setisLoading] = useState(true);

     const fetchingTags =  async () :Promise<void> => {
          const snapshotTags = await firestore().collection('Tags').get();
          const tagdocs = snapshotTags.docs.map(doc => ({id : doc.id , ...doc.data()}));
          
          dispatch(setTags({tags : tagdocs}));
          setCurrentTags(tagdocs);
         
     }

     const setCurrentTags = (current:any) => {
          console.log("Current type" , typeof(current));

          if(current?.length <= 0 || !current_tags ||current_tags?.length <= 0){
               console.log("Set Current Failed" , current_tags , Object.keys(tagdocs).length)
              return
          }

          if(typeof(current) === "object"){
               const matchingTags = current
               .filter((tagdoc:any) => current_tags.some((currentTag:any) => currentTag.id === tagdoc.id))
               .map((tagdoc:any) => ({id : tagdoc.id , title : tagdoc.title}));
               setSelectedTags(matchingTags)
          }
     }

     useEffect(() => {
          if(Object.keys(tagdocs).length == 0 ){
               fetchingTags();
          }else{
               setCurrentTags(tagdocs.tags);   
          }   
          setisLoading(false);
     }, [])

     const OnTagsAction = (id:string, title:string) => {
          if(!isEdit) setisEdit(true);
          
          if (!selectedTags.some((tag:any) => tag.id === id)) {
               setSelectedTags(prevTags => [...prevTags , {id , title}]);
          }else { 
               const updatedSelectedTags : any[] = selectedTags.filter((tag:any) => tag.id !== id);
               setSelectedTags(updatedSelectedTags); 
          }
     }

     const MatchingTagsWithcategory = async () : Promise<T> => {
          const selectedCategory : string[] = [];
          selectedTags.map((tags:any , index : number) => {
               const inGroup = catedocs?.category.find((category:any) => category.group.includes(tags.id));
               if(inGroup){
                    if(!selectedCategory.includes(inGroup.id)){
                         selectedCategory.push(inGroup.id);
                    }   
               }
          })
          return selectedCategory;
     }
     const handleTagSaving = async () : Promise<void> => {
          const selectedCategory = await MatchingTagsWithcategory();

          if(status){
               Alert.alert("Error", "Cannot Remove all tags because your project was public.")
               return
          }

          console.log(selectedTags , selectedCategory);
          const isSuccess = await handleTagupdate(selectedTags , selectedCategory);
          
          if(isSuccess){
               navigation.goBack();
          }

          SendAlert(isSuccess ? "success" : "error" ,  "Tags Added" , "Add failed" , toast);
     }
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title = "Tags" onEditcontent = {isEdit} isAction = {handleTagSaving} isDisable = {false}/>
          <FlatList>
               <VStack flex=  {1} p = {5} space = {5}>
                    <VStack space = {2}>
                         <Text color = {theme.Text.base} fontWeight={'semibold'}>
                              Selected Tags
                         </Text>
                         {!isLoading &&
                         <HStack rounded={'full'} minHeight={10}  p = {1} space= {2} flexWrap = {'wrap'} bg={theme.Bg.container} borderWidth={0}>
                              {selectedTags.length > 0  && 
                                   selectedTags.map((item:any , index:number) => {
                                        return(
                                             <TagItem 
                                             key = {index} 
                                             id = {item.id} 
                                             title = {item.title} 
                                             onAction = {OnTagsAction} 
                                             selectedTags = {true}
                                             onFocused = {false}
                                             />
                                        )
                                   })
                              }
                         </HStack>
                         }
                    </VStack>
                    <HStack w = '100%' overflow={'hidden'} space = {2} flexWrap={'wrap'}>
                         {isLoading ?
                              <SpinnerItem/>
                              :
                              Object.keys(tagdocs).length > 0 &&
                                   tagdocs.tags.map((item:any , index:number) =>{
                                        const isFocused = current_tags ? current_tags.some(currentTag => currentTag.id === item.id) : false;

                                        return(
                                             <TagItem 
                                             key = {index} 
                                             id = {item.id} 
                                             title = {item.title} 
                                             onAction = {OnTagsAction}
                                             onFocused = {isFocused}
                                             />
                                        )
                         })}
                        
                    </HStack>
                 
               </VStack>
          </FlatList>
        
     </VStack>
  )
}
export default Tag;