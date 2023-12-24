import React , {useCallback , Suspense , useContext , useRef} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"
import { RefreshControl } from "react-native"
import { ThemeWrapper } from "../../../systems/theme/Themeprovider"
interface Provider {
    children : any,
    collection: any[ ],
    onScroll : any,
    horizontal : any,
    refreshing : boolean ,
    setRefreshing : any,
    disableRefresh : boolean
 }

const ItemList :React.FC <Provider> = ({
    children , 
    collection,
    disableRefresh = false,
    onScroll = null ,
    horizontal = false,
    refreshing,
    setRefreshing
    }) => {

    const theme : any = useContext(ThemeWrapper);
    const flatListRef = useRef(null);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
        }, []);
        
    return(
        <Animated.FlatList
            ref = {flatListRef}
            initialNumToRender={5}
            contentInset={{ top: 5}}
            showsVerticalScrollIndicator={false}
            data={collection}
            scrollEventThrottle={16}
            onScroll= {onScroll}
            refreshControl={
                !disableRefresh &&
                    <RefreshControl 
                    refreshing = {refreshing} 
                    onRefresh={onRefresh}
                    tintColor={theme.Icon.base}
                    />
            }

            renderItem={({ item, index }) => children(item, index)}
            keyExtractor={(i , key) => key.toString()}
        /> 
    )
}

export {ItemList}