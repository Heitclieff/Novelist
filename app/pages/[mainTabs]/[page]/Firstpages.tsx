import React,{FC, useEffect , useCallback} from 'react'
import { 
Box,
Text,
VStack,
HStack,
Icon,
ScrollView,
FlatList
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

interface Collections {
     title : string,
     images : string[ ];
     view : number;
     theme : any,
   }

const MemorizedColletionFileds = React.memo(CollectionFields)

const Firstpages : React.FC <MainProps> = ({theme}) => {
     const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
     const Collectionsdata = useSelector((state:any)=> state.collectionsDatashowcase)
     const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);
     
     useEffect(() => {
          if(!isReduxLoaded) dispatch(getCollectionsDataShowcase());
     },[dispatch , isReduxLoaded])
     
     const renderCollectionField = useCallback(
          ({item}:any) => {
               return(
                    <VStack w = '100%'>
                    <Banner
                         images = {AssetImages}
                    />
                         <MemorizedColletionFileds
                              theme = {theme}
                              title = "Hot New Novels"
                              collections = {Collectionsdata}             
                         />
                         <MemorizedColletionFileds
                         theme = {theme}
                         title = "Top new Novels"
                         collections = {Collectionsdata}    
                         />               
               </VStack>
          )}           
          ,[theme , Collectionsdata]
     )

  return (
    <Box w  = '100%' h= '100%'>
          {isReduxLoaded  && 
               <FlatList  
                    contentInset={{bottom: 180}} 
                    showsVerticalScrollIndicator = {false}
                    data =  {[0]}
                    renderItem={renderCollectionField}
               />
          }
     </Box>
  )
}


export default Firstpages;