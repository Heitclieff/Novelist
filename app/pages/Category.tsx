import React,{FC, useEffect , useCallback} from 'react'
import { Box, FlatList } from 'native-base'
import CategoryGrid from '../components/category/[layout]/CategoryGrid'

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../../systems/redux/action';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer';

interface Pageprops {
  theme : any
 }

const MemorizedCategoryGrids = React.memo(CategoryGrid)

const Category: React.FC <Pageprops> = ({theme}) => {
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
      {isReduxLoaded &&
        <MemorizedCategoryGrids
        theme = {theme}
        category={Categorydata}
       />
      }
    </Box>
  )
}

export default Category;