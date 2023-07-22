import React , {useCallback , Suspense} from "react"
import { FlatList ,Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"

interface Provider {
    children : any,
    scroll : any,
    horizontal : any,
 }


 
const Flatlist :React.FC <Provider> = ({children , scroll = null , horizontal = false}) => {
    const renderChildren = useCallback(({ item }: any) => {
        return (
        <Suspense fallback = {<Box>Loading...</Box>}>     
            {children}
        </Suspense>
        )
    }
    , [children]
   )
    return(
        <Animated.FlatList
                contentInset={{ bottom: 10}}
                showsVerticalScrollIndicator={false}
                data={[0]}
                scrollEventThrottle={16}
                onScroll= {scroll}
                renderItem={renderChildren}
        /> 
    )
}

export {Flatlist}