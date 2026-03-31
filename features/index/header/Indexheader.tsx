import React, {Suspense , useCallback, useRef } from 'react'
import {VStack} from 'native-base';
import { FlatList } from 'native-base';

import Collectionheader from '../components/Collection.header';
import { HeaderSkelton } from '../../../components/skelton/index/header';
import { SpinnerItem } from '../../../components/Spinner';

interface layoutProps {
    collections : any,
    isLoading : boolean,
}

const MemorizedCollectionHeader = React.memo(Collectionheader)

const Indexheader : React.FC <layoutProps> = ({collections , isLoading}) => {
    const flatListRef = useRef(null);

    const renderCollectionItem = useCallback(
        (item : any, round : number) => {
            const document = item.data();
            return(
                <Suspense fallback = {<SpinnerItem/>}>
                    <MemorizedCollectionHeader 
                      key = {round}
                      data={document} 
                      id = {item.id}
                    />
                </Suspense>
            )
        },[]
      );

    if(isLoading)
    return(
        <HeaderSkelton/>
    )

  return (
    <VStack flex = {1} justifyContent={'center'} >
        <VStack space = {1} position = 'relative'>
            <FlatList
                ref = {flatListRef}
                initialNumToRender = {5}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={collections}
                renderItem={({ item, index }:any) => renderCollectionItem(item, index)}
                scrollEventThrottle={16}
                onEndReachedThreshold={0.5}
                decelerationRate={"normal"}
                pagingEnabled
                snapToAlignment="center"
            />
        </VStack>
    </VStack>
  )
}

export default Indexheader;