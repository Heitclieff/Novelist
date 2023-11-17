import React , {useCallback , Suspense} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"
import { RefreshControl } from "react-native"

interface Provider {
    children : any,
    onScroll : any,
    horizontal : any,
    refreshing : boolean,
    setRefreshing : any
 }

const FlatList :React.FC <Provider> = ({children , onScroll = null , horizontal = false , refreshing, setRefreshing}) => {
    const renderChildren = useCallback(({ item }: any) => {
        return (
        <Suspense fallback = {<Box>Loading...</Box>}>     
            {children}
        </Suspense>
        )
    }
    , [children])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);

      
    return(
        <Animated.FlatList
            contentInset={{ bottom: 10}}
            showsVerticalScrollIndicator={false}
            data={[0]}
            scrollEventThrottle={16}
            onScroll= {onScroll}
            refreshControl={
                <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
            }
            renderItem={renderChildren}
        /> 
    )
}

export {FlatList}