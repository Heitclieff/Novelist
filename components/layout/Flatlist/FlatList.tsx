import React , {useCallback , Suspense , useContext , useRef} from "react"
import {Box ,VStack } from "native-base"
import Animated from "react-native-reanimated"
import { RefreshControl } from "react-native"
import { ThemeWrapper } from "../../../systems/theme/Themeprovider"
import { SpinnerItem } from "../../Spinner"
interface Provider {
    children : any,
    Verticalscroll : boolean
    onScroll : any,
    horizontal : any,
    refreshing : boolean,
    disableRefresh : boolean,
    setRefreshing : any
 }

const FlatList : React.FC <Provider> = React.memo(({children , onScroll = null , horizontal = false , refreshing, setRefreshing , disableRefresh = false , Verticalscroll = false}) => {
    const theme : any = useContext(ThemeWrapper);
    const flatListRef = useRef(null);

    const renderChildren = useCallback(({ item }: any) => {
        return (
          <Suspense fallback={<SpinnerItem />}>
            {children}
          </Suspense>
        );
      }, [children]);

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
            keyExtractor={(i , key) => key.toString()}
        /> 
    )
})

export {FlatList}