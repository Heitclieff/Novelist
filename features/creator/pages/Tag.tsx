import React,{useContext, useEffect , useState} from 'react'
import { 
Box , 
VStack ,
Text , 
Input, 
Button,
useToast,
HStack} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation , useRoute } from '@react-navigation/native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Categorydata } from '../../../assets/content/VisualCollectionsdata'

//@Redux toolkits
import { useDispatch , useSelector } from 'react-redux'
import { setTags } from '../../../systems/redux/action'
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

     const tagdocs = useSelector((state) => state.tags)
     const tagitem = useSelector((state) => state.tagitem)
     const {current_tags , handleTagupdate} = route.params;

     const [selectedTags , setSelectedTags] = useState<[]>([]);
     const [isEdit , setisEdit] = useState<boolean>(false);

     const fetchingTags =  async () :Promise<void> => {
          const snapshotTags = await firestore().collection('Tags').get();
          const tagdocs = snapshotTags.docs.map(doc => ({id : doc.id , ...doc.data()}));
          
          dispatch(setTags({tags : tagdocs}));
          setCurrentTags();
     }

     const setCurrentTags = () => {
          if(!current_tags || Object.keys(tagdocs).length === 0) return

          const matchingTags = tagdocs.tags
          .filter(tagdoc => current_tags.some(currentTag => currentTag.id === tagdoc.id))
          .map(tagdoc => ({id : tagdoc.id , title : tagdoc.title}));

          setSelectedTags(matchingTags)
     }


     useEffect(() => {
          if(Object.keys(tagdocs).length == 0 ){
               fetchingTags();
          }     
     }, [])

     useEffect(() => { 
          setCurrentTags();   
     } ,[tagdocs])

     const OnTagsAction = (id:string, title:string) => {
          if(!isEdit) setisEdit(true);
          
          if (!selectedTags.some(tag => tag.id === id)) {
               setSelectedTags([...selectedTags , {id , title}]);
          }else { 
               const updatedSelectedTags = selectedTags.filter(tag => tag.id !== id);
               setSelectedTags(updatedSelectedTags); 
          }
     }

     const handleTagSaving = async () : Promise<void> => {
          const isSuccess = await handleTagupdate(selectedTags);
         
          toast.show({
               placement : 'top',
               render: ({
                    id
               }) => {
                    return <AlertItem status = {isSuccess ? "success" : "error"}/> 
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
                         {Object.keys(tagdocs).length > 0 &&
                              tagdocs.tags.map((item:any , index:number) =>{
                                   const isFocused = current_tags.some(currentTag => currentTag.id === item.id);

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