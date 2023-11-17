import React , {useCallback , Suspense} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"
import { RefreshControl } from "react-native"

interface Provider {
    children : any,
    collection: any[ ],
    onScroll : any,
    horizontal : any,
    refreshing : boolean ,
    setRefreshing : any,
 }

const ItemList :React.FC <Provider> = ({
    children , 
    collection,
    onScroll = null ,
    horizontal = false,
    refreshing,
    setRefreshing
    }) => {

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        }, []);
        
    return(
        <Animated.FlatList
            contentInset={{ top: 5}}
            showsVerticalScrollIndicator={false}
            data={collection}
            scrollEventThrottle={16}
            onScroll= {onScroll}
            refreshControl={
                <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
            }

            renderItem={({ item, index }) => children(item, index)}
        /> 
    )
}

export {ItemList}