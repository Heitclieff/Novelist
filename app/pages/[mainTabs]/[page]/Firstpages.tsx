import React, { FC, useEffect, useCallback, Suspense } from 'react'
import {
     Box,
     Text,
     VStack,
     HStack,
     Icon,
     FlatList
} from 'native-base'

import { AssetImages } from '../../../../systems/ImagesAssets'
const LazyCollectionFields = React.lazy(() => import('../../../components/main/[layout]/Collections/CollectionFileds'));
const LazyBanner = React.lazy(() => import('../../../components/main/[container]/Banner'));

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsDataShowcase } from '../../../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'


interface MainProps {
}

interface Collections {
     title: string,
     images: string[];
     view: number;
}

const MemorizedColletionFileds = React.memo(LazyCollectionFields)
const MemorizedBanner = React.memo(LazyBanner)

const Firstpages: React.FC<MainProps> = () => {
     const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
     const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
     const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);

     useEffect(() => {
          if (!isReduxLoaded) dispatch(getCollectionsDataShowcase());
     }, [dispatch, isReduxLoaded])

     const renderCollectionField = useCallback(
          ({ item }: any) => {
               return (
                    <Suspense fallback = {<Box>Loading...</Box>}>
                         <VStack w='100%'>
                              <MemorizedBanner
                                   images={AssetImages}
                              />
                              <MemorizedColletionFileds
                                   title="Hot New Novels"
                                   collections={Collectionsdata}
                              />
                              <MemorizedColletionFileds
                                   title="Top new Novels"
                                   collections={Collectionsdata}
                              />
                         </VStack>
                    </Suspense>

               )
          }
          , [Collectionsdata]
     )

     return (
          <Box w='100%' h='100%'>
               {isReduxLoaded &&
                    <FlatList
                         contentInset={{ bottom: 180 }}
                         showsVerticalScrollIndicator={false}
                         data={[0]}
                         renderItem={renderCollectionField}
                    />
               }
          </Box>
     )
}


export default Firstpages;