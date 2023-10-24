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
import { setTempleteCache } from '../../systems/redux/action'

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
  const {title ,path}:any = route.params
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const temepletedocs = useSelector((state) => state.templete)
  const Collectionsdata = []
  const isReduxLoaded = false;

  const getDatafromCollection = async() :Promise<void> => {
    try{
      const getpath = firestore().collection(path);
      const getsnapshot = await getpath.get();
      const getdocs = getsnapshot.docs.map((doc) => ({id : doc.id , ...doc.data()}));

      dispatch(setTempleteCache({content : getdocs , path : path}))
    }catch(error){
      console.log("Failed To fetch from firebase" ,error)
    }
  }

  const initailfetching = () => {
    if(path || !temepletedocs.path){
      getDatafromCollection();
    }
  }

  useEffect(() => {
    initailfetching();
  } , [])

  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title = {title} fixed/>
          <VStack flex={1} pl = {4} pr = {4}>
            {temepletedocs.content?.length > 0 &&
              <ItemList collection={temepletedocs.content}>
               {(item:any , index:number) => <MemorizedItemfields key = {index} id = {item.id} data= {item}/> }
             </ItemList>
            } 
          </VStack>
         
     </VStack>
  )
}

export default Template; 