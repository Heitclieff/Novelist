import React,{FC, useEffect , useCallback , Suspense} from 'react'
import { Box, VStack } from 'native-base'
import { useContext } from 'react';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../../systems/redux/action';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer';
import { ItemList } from '../../components/layout/Flatlist/ItemList';
import CategoryItems from './components/Categoryitem';
interface Pageprops {
}

const MemorizedCategoryItems = React.memo(CategoryItems)

const Category: React.FC <Pageprops> = () => {
  const theme: any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Categorydata = useSelector((state:any)=> state.categoryData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscategoryLoaded);
  
  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCategoryData());
  },[dispatch , isReduxLoaded])

  return (
    <Box
    flex = {1}
    pl = {2}
    pr = {2}
    bg = {theme.Bg.base}
    >
    <Suspense fallback = {<Box>Loading...</Box>}>
      {isReduxLoaded &&  
        <ItemList collection={Categorydata}>
            {(item:any, index:number) => (
                <MemorizedCategoryItems 
                    key = {index} 
                    images={item.images} 
                    title ={item.title}/> 
            )}
          </ItemList>       
        }
    </Suspense>
    </Box>
  )
}

export default Category;