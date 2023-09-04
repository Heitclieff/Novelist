import React , {useCallback , Suspense} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"

interface Provider {
    children : any,
    collection: any[ ],
    onScroll : any,
    horizontal : any,
 }

const ItemList :React.FC <Provider> = ({
    children , 
    collection,
    onScroll = null ,
    horizontal = false }) => {

    return(
        <Animated.FlatList
            contentInset={{ top: 5}}
            showsVerticalScrollIndicator={false}
            data={collection}
            scrollEventThrottle={16}
            onScroll= {onScroll}
            renderItem={({ item, index }) => children(item, index)}
        /> 
    )
}

export {ItemList}