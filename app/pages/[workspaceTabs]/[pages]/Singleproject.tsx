import React,{FC , useEffect} from 'react'
import { Box } from 'native-base'
//Component && Layout
import Globalgrid from '../../../components/global/[layout]/Globalgrid'

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
  
  useEffect(() => {
    dispatch(getCollectionData());
  },[dispatch])
  return (
    <Box
    w =  '100%'
    h = '100%'
    >
      <Globalgrid
        theme = {theme}
        collections ={Collectionsdata}
      />
    </Box>
  )
}

export default Singleproject;