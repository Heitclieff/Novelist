import React,{FC, useEffect , useCallback , Suspense} from 'react'
import { Box, VStack } from 'native-base'
import { useContext } from 'react';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData ,setCategory } from '../../systems/redux/action';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer';
import { ItemList } from '../../components/layout/Flatlist/ItemList';
import CategoryItems from './components/Categoryitem';

//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
}

const MemorizedCategoryItems = React.memo(CategoryItems)

const Category: React.FC <Pageprops> = () => {
  const theme: any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Categorydata = useSelector((state:any)=> state.category)
  const isReduxLoaded = useSelector((state: RootState) => state.iscategoryLoaded);
  
  const getCategoryAndDispatch = async () => {
      try {
          const getcategory = await firestore().collection('Category').get()
          const categorydocs = getcategory.docs.map(doc => ({id : doc.id , ...doc.data()}))
         
          dispatch(setCategory({category : categorydocs}));


        } catch (error) {
          console.error('Error fetching Category', error);
      }
  };

  useEffect(() => {
    if(!Categorydata.category) getCategoryAndDispatch();
    
  },[])

  return (
    <Box
    flex = {1}
    pl = {2}
    pr = {2}
    bg = {theme.Bg.base}
    >
    <Suspense fallback = {<Box>Loading...</Box>}>
      {
        <ItemList collection={Categorydata.category}>
            {(item:any, index:number) => (
                <MemorizedCategoryItems 
                    key = {index} 
                    id = {item.id}
                    images={item.image} 
                    title ={item.id}
                    proDoc={item.proDoc}/> 
            )}
          </ItemList>       
        }
    </Suspense>
    </Box>
  )
}

export default Category;