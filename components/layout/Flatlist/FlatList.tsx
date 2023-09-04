import React , {useCallback , Suspense} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"

interface Provider {
    children : any,
    onScroll : any,
    horizontal : any,
 }

const FlatList :React.FC <Provider> = ({children , onScroll = null , horizontal = false}) => {
    const renderChildren = useCallback(({ item }: any) => {
        return (
        <Suspense fallback = {<Box>Loading...</Box>}>     
            {children}
        </Suspense>
        )
    }
    , [children])
    return(
        <Animated.FlatList
            contentInset={{ bottom: 10}}
            showsVerticalScrollIndicator={false}
            data={[0]}
            scrollEventThrottle={16}
            onScroll= {onScroll}
            renderItem={renderChildren}
        /> 
    )
}

export {FlatList}