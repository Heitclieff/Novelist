import React,{FC , useEffect , lazy ,Suspense} from 'react'
import { Box } from 'native-base'
//Component && Layout
const LazyGlobalgrid = lazy(() => import('../../../components/global/[layout]/Globalgrid'))

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData } from '../../../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'

interface pageprops {
  theme : any
}

const Singleproject : React.FC <pageprops> = ({theme}) => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
  
  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCollectionData());
  },[dispatch , isReduxLoaded])
  return (
    <Box
    w =  '100%'
    h = '100%'
    >
      {isReduxLoaded && 
      <Suspense fallback = {<Box>Loading..</Box>}>
         <LazyGlobalgrid
          theme = {theme}
          collections ={Collectionsdata}
        />
      </Suspense>
       
      }
     </Box>
  )
}

export default Singleproject;