import React , {useCallback , Suspense , useContext} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"
import { RefreshControl } from "react-native"
import { ThemeWrapper } from "../../../systems/theme/Themeprovider"

interface Provider {
    children : any,
    Verticalscroll : boolean
    onScroll : any,
    horizontal : any,
    refreshing : boolean,
    disableRefresh : boolean,
    setRefreshing : any
 }

const FlatList :React.FC <Provider> = ({children , onScroll = null , horizontal = false , refreshing, setRefreshing , disableRefresh = false , Verticalscroll = false}) => {
    const theme : any = useContext(ThemeWrapper);
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
            showsVerticalScrollIndicator={Verticalscroll}
            data={[0]}
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
            renderItem={renderChildren}
        /> 
    )
}

export {FlatList}