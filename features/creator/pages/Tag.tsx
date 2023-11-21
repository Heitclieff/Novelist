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

     const {current_tags , handleTagupdate} = route.params;
     const tagdocs = useSelector((state) => state.tags)
     const catedocs = useSelector((state) => state.category)
     
     const [selectedTags , setSelectedTags] = useState<[]>([]);
     const [isEdit , setisEdit] = useState<boolean>(false);
     const [isLoading , setisLoading] = useState(true);

     const fetchingTags =  async () :Promise<void> => {
          console.log("Fetching Tags")
          const snapshotTags = await firestore().collection('Tags').get();
          const tagdocs = snapshotTags.docs.map(doc => ({id : doc.id , ...doc.data()}));
          
          dispatch(setTags({tags : tagdocs}));
          setCurrentTags();

         
     }

     const setCurrentTags = () => {
          if(!current_tags || current_tags.length <= 0  || Object.keys(tagdocs).length === 0){
               return
          }

          const matchingTags = tagdocs.tags
          .filter(tagdoc => current_tags.some(currentTag => currentTag.id === tagdoc.id))
          .map(tagdoc => ({id : tagdoc.id , title : tagdoc.title}));

          setSelectedTags(matchingTags)
     }


     useEffect(() => {
          if(Object.keys(tagdocs).length == 0 ){
               fetchingTags();
          }     
          setisLoading(false);
     }, [])

     useEffect(() => { 
          setCurrentTags();   
     } ,[])

     const OnTagsAction = (id:string, title:string) => {
          if(!isEdit) setisEdit(true);
          
          if (!selectedTags.some(tag => tag.id === id)) {
               setSelectedTags([...selectedTags , {id , title}]);
          }else { 
               const updatedSelectedTags = selectedTags.filter(tag => tag.id !== id);
               setSelectedTags(updatedSelectedTags); 
          }
     }

     const MatchingTagsWithcategory = async () : Promise<T> => {
          const selectedCategory = [];
          selectedTags.map((tags:any , index : number) => {
               const inGroup = catedocs?.category.find(category => category.group.includes(tags.id));
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
          const isSuccess = await handleTagupdate(selectedTags , selectedCategory);
         
          toast.show({
               placement : 'top',
               render: ({
                    id
               }) => {
                    return <AlertItem 
                    status = {isSuccess ? "success" : "error"} 
                    successText = "Tags Added"
                    failedText='Add failed'
                    /> 
               }
          })
     }
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title = "Tags" onEditcontent = {isEdit} isAction = {handleTagSaving}/>
          <FlatList>
               <VStack flex=  {1} p = {5} space = {5}>
                    <VStack space = {2}>
                         <Text color = {theme.Text.base} fontWeight={'semibold'}>
                              Selected Tags
                         </Text>
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