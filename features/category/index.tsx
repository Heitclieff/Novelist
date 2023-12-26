import React,{ Suspense , useState } from 'react'
import { Box , Skeleton } from 'native-base'
import { useContext } from 'react';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';

import { SpinnerItem } from '../../components/Spinner';
import { ItemList } from '../../components/layout/Flatlist/ItemList';
import CategoryItems from './components/Categoryitem';

//redux toolkit
import { useSelector} from 'react-redux';
//@ -- Hooks
import { FetchingCategoryHooks } from './hooks/fetching.hooks';

interface Pageprops {
}

const MemorizedCategoryItems = React.memo(CategoryItems)

const Category: React.FC <Pageprops> = () => {
  const theme: any = useContext(ThemeWrapper);
  const [isLoading , setLoading] = useState<boolean>(true);
  const Categorydata = useSelector((state:any)=> state.category)
  
  FetchingCategoryHooks(Categorydata , setLoading);

  return (
    <Box
    flex = {1}
    pl = {2}
    pr = {2}
    bg = {theme.Bg.base}
    >
    {isLoading ?
      <Box mt = {10}>
        <SpinnerItem/>
      </Box>
      :
      <Suspense fallback = {
        <Skeleton 
        w = '100%' 
        h = {180} 
        startColor={theme.Bg.containeraction}
        />
        }
      >
      {
        <ItemList collection={Categorydata.category} disableRefresh = {true}>
            {(item:any, index:number) => (
              <MemorizedCategoryItems 
                key = {index} 
                id = {item.id}
                images={item.image} 
                title ={item.id}
              /> 
            )}
          </ItemList>       
        }
    </Suspense>
    }
   
    </Box>
  )
}

export default Category;