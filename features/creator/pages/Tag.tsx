import React,{useContext, useEffect , useState} from 'react'
import { 
Box , 
VStack ,
Text , 
Input, 
HStack} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Categorydata } from '../../../assets/content/VisualCollectionsdata'


//@Redux toolkits
import { useDispatch , useSelector } from 'react-redux'
import { setTags } from '../../../systems/redux/action'

//@Components
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import Centernavigation from '../../../components/navigation/Centernavigation'
import TagItem from '../components/Tagitem'
//@Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


interface Pageprops {}

const Memorizednavigation = React.memo(Centernavigation);

const Tag: React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const dispatch = useDispatch();
     const tagdocs = useSelector((state) => state.tags)

     const [selectedTags , setSelectedTags] = useState<[]>([]);

     const fetchingTags =  async () :Promise<void> => {
          const snapshotTags = await firestore().collection('Tags').get();
          const tagdocs = snapshotTags.docs.map(doc => ({id : doc.id , ...doc.data()}));
          
          dispatch(setTags({tags : tagdocs}));
     }

     const OnTagsAction = (id:string, title:string) => {
          if (!selectedTags.some(tag => tag.id === id)) {
               setSelectedTags([...selectedTags , {id , title}]);
          }else { 
               const updatedSelectedTags = selectedTags.filter(tag => tag.id !== id);
               setSelectedTags(updatedSelectedTags); 
          }
     }
   
     useEffect(() => { 
          if(Object.keys(tagdocs).length == 0 ){
               fetchingTags();
          }     
     } ,[])
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
             <Memorizednavigation title = "Tags" />
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
                                             <TagItem key = {index} id = {item.id} title = {item.title} onAction = {OnTagsAction} selectedTags = {true}/>
                                        )
                                   })
                              }
                         </HStack>
                    </VStack>
                    <HStack w = '100%' overflow={'hidden'} space = {2} flexWrap={'wrap'}>
                         {Object.keys(tagdocs).length > 0 &&
                              tagdocs.tags.map((item:any , index:number) =>{
                                   return(
                                        <TagItem key = {index} id = {index} title = {item.title} onAction = {OnTagsAction}/>
                                   )
                         })}
                        
                    </HStack>
                 
               </VStack>
          </FlatList>
        
     </VStack>
  )
}
export default Tag;