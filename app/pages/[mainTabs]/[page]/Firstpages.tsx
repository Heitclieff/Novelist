import React,{FC, useEffect} from 'react'
import { 
Box,
Text,
VStack,
HStack,
Icon,
ScrollView
 } from 'native-base'
 
import Banner from '../../../components/main/[container]/Banner'
import { AssetImages } from '../../../../systems/ImagesAssets'
import CollectionFields from '../../../components/main/[layout]/Collections/CollectionFileds'

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsDataShowcase } from '../../../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'

interface MainProps {
     theme : any
}

const Firstpages : React.FC <MainProps> = ({theme}) => {
     const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
     const Collectionsdata = useSelector((state:any)=> state.collectionsDatashowcase)
     
     useEffect(() => {
          dispatch(getCollectionsDataShowcase());
     },[dispatch])
     
  return (
    <Box w  = '100%' h= '100%'>
          <ScrollView 
          contentInset={{bottom: 180}} 
          showsVerticalScrollIndicator = {false}
          >
               <VStack w = '100%'>
                    <Banner
                         images = {AssetImages}
                    />
                         <CollectionFields
                              theme = {theme}
                              title = "Hot New Novels"
                              collections = {Collectionsdata}             
                         />
                         <CollectionFields
                         theme = {theme}
                         title = "Top new Novels"
                         collections = {Collectionsdata}    
                         />               
               </VStack>
          </ScrollView>
     </Box>
  )
}


export default Firstpages;