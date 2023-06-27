import React ,{FC , useEffect}from 'react'
import { 
Box,
VStack,
HStack,
Text,
 } from 'native-base'

 // Components
import Showcasebar from '../components/library/[container]/Showcasebar'
import { userdata , Collectionsdata } from '../../assets/VisualCollectionsdata'
import Globalgrid from '../components/global/[layout]/Globalgrid'

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData } from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'


interface Pageprops {
  theme : any
}

const Library: React.FC <Pageprops> = ({theme}) => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  
  useEffect(() => {
    dispatch(getCollectionData());
  },[dispatch])

  return (
    <VStack w = '100%' h = '100%' p = {2} bg = {theme.Bg.base}>
        <Showcasebar
        theme = {theme}
        books='10'
        username = {userdata[0].username}
        image= {userdata[0].image}
        />
        
        <Box  w = '100%' pl = {3} >
            <HStack space = {1} alignItems={'center'}>
                <Box 
                w= {1.5} 
                h = '90%' 
                rounded={'md'}
                bg  = 'cyan.700'>

                </Box>
                <Text
                fontSize={'md'}
                fontWeight={'semibold'}
                color = {theme.Text.heading}
                >My Library
                </Text>
            </HStack>
           
        </Box>
        <Globalgrid
          theme =  {theme}  
          collections={Collectionsdata}
          bottomSpace={160}
        />
    </VStack>
  )
}


export default Library;