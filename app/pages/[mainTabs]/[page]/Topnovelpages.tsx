import React,{FC , useEffect} from 'react'
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

const Topnovelpages : React.FC <Pageprops> = ({theme}) => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  
  useEffect(() => {
       dispatch(getCollectionData());
  },[dispatch])

  return (
    <Box 
    w = '100%' 
    h= '100%' 
    >
      <Gridlayout
        theme = {theme}
        collections = {Collectionsdata}
        title =  'Top Novels'
      />
    </Box>
    
  )
}

export default Topnovelpages;
