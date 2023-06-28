import React,{FC , useEffect, useMemo , Suspense} from 'react'
import { 
Box,
VStack,
} from 'native-base'
const LazyGridlayout = React.lazy(() => import('../../../components/main/[layout]/Gridpoint/Gridlayout'));
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData } from '../../../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'

interface Pageprops { 
}

const Topnovelpages : React.FC <Pageprops> = () => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);

  useEffect(() => {
  if(!isReduxLoaded) dispatch(getCollectionData());
     
  },[dispatch , isReduxLoaded])

  return (
    <Box 
    w = '100%' 
    h= '100%' 
    >
      <Suspense fallback = {<Box>Loading...</Box>}>
          {isReduxLoaded &&
            <LazyGridlayout
            collections = {Collectionsdata}
            title =  'Top Novels'
            />
          }
      </Suspense>
    
     
    </Box>
    
  )
}

export default Topnovelpages;
