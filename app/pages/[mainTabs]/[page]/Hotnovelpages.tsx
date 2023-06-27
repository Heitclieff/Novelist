import React,{FC , useEffect , useMemo} from 'react'
import { 
Box,
VStack,
} from 'native-base'
import Gridlayout from '../../../components/main/[layout]/Gridpoint/Gridlayout'

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData } from '../../../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'


interface Pageprops { 
  theme : any
}

const Hotnovelpages : React.FC <Pageprops> = ({theme}) => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
  const MemorizedGridlayout = React.memo(Gridlayout)

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCollectionData());
    
  },[dispatch , isReduxLoaded])

  return (
    <Box 
    w = '100%' 
    h= '100%' 
    >
      {isReduxLoaded && 
        <Gridlayout
        theme = {theme}
        collections = {Collectionsdata}
        title =  'Hot Novels'/> 
      }
     
    </Box>
    
  )
}

export default Hotnovelpages;
