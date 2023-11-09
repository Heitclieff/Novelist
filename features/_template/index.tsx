import React,{useContext , useEffect, useState} from 'react'
import { 
Box , 
Button, 
VStack} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { ItemList } from '../../components/layout/Flatlist/ItemList'
import { useRoute } from '@react-navigation/native'

//@Components
import Itemfield from '../../components/field/Itemfield'
import Centernavigation from '../../components/navigation/Centernavigation'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { setTempleteCache ,setCategoryCache } from '../../systems/redux/action'

//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
     collections : any,
}

const Memorizednavigation = React.memo(Centernavigation);
const MemorizedItemfields = React.memo(Itemfield);

const Template : React.FC <Pageprops> = ({collections}) => {
  // console.log('_template index', collections)
  const theme:any = useContext(ThemeWrapper);
  const route = useRoute()
  const {title ,path , option}:any = route.params
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const temepletedocs = useSelector((state) => state.templete)
  const categorydocs = useSelector((state) => state.categoryCache)

  const [selectedContent , setSelectedContent] = useState<any[]>(temepletedocs.content)
  const [refreshing ,setRefreshing] = useState<boolean>(false);

  const getDatafromCollection = async() :Promise<void> => {
    try{
      const getpath = firestore().collection(path);
      const getsnapshot = await getpath.get();
      const getdocs = getsnapshot.docs.map((doc) => ({id : doc.id , ...doc.data()}));
      
      dispatch(setTempleteCache({content : getdocs , path : path}))

      if(option) {
        if(option !== categorydocs.option){
            SelectedfromOption(getdocs);
            return
        }
        return
      }

      setSelectedContent(getdocs);

    }catch(error){
      console.log("Failed To fetch from firebase" ,error)
    }
  }

  const SelectedfromOption = (getdocs) => {
      const selectedContent = getdocs?.filter((doc) => doc.cateDoc.includes(option));
      dispatch(setCategoryCache({category : selectedContent, option : option}))
      setSelectedContent(selectedContent)
  }

  const initailfetching = async () => {
    if(!path) return

    if(!temepletedocs.path){
      getDatafromCollection();
      return
    }

    if(option) {
      if(option !== categorydocs.option){
        SelectedfromOption(temepletedocs.content);
        return
      }
      setSelectedContent(categorydocs.category);
    }
  }

  useEffect(() => {
    initailfetching();
  } , [refreshing])


  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title = {title} fixed/>
          <VStack flex={1} pl = {4} pr = {4}>
            {temepletedocs.content?.length > 0 && 

              <ItemList collection={selectedContent} refreshing = {refreshing} setRefreshing={setRefreshing}>
               {(item:any , index:number) => <MemorizedItemfields key = {index} id = {item.id} data= {item}/> }
             </ItemList>
            } 
          </VStack>
         
     </VStack>
  )
}

export default Template; 