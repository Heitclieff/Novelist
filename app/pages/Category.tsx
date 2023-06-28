import React,{FC, useEffect , useCallback , Suspense} from 'react'
import { Box, FlatList } from 'native-base'
const LazyCategoryGrid = React.lazy(() => import('../components/category/[layout]/CategoryGrid'));
import { useContext } from 'react';
import { ThemeContext } from '../../systems/Theme/ThemeProvider';

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../../systems/redux/action';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer';

interface Pageprops {
}

const MemorizedCategoryGrids = React.memo(LazyCategoryGrid)

const Category: React.FC <Pageprops> = () => {
  const theme: any = useContext(ThemeContext);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Categorydata = useSelector((state:any)=> state.categoryData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscategoryLoaded);
  
  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCategoryData());
  },[dispatch , isReduxLoaded])

  return (
    <Box
    w = '100%'
    h = '100%'
    py = {3}
    bg = {theme.Bg.base}
    >
    <Suspense fallback = {<Box>Loading...</Box>}>
      {isReduxLoaded &&
          <MemorizedCategoryGrids
          category={Categorydata}
        />
        }
    </Suspense>
    </Box>
  )
}

export default Category;