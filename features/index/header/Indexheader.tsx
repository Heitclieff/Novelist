import React, {useMemo , Suspense , useCallback , useContext, useRef } from 'react'
import { Box , HStack, Text , Heading, VStack} from 'native-base';
import { FlatList } from 'native-base';
import { View , Animated , Dimensions } from 'react-native';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import Collectionheader from '../components/Collection.header';
import LinearGradient from 'react-native-linear-gradient';
import { HeaderSkelton } from '../../../components/skelton/index/header';

interface layoutProps {
    collections : any,
    isLoading : boolean,
}
const Indexheader : React.FC <layoutProps> = ({collections , isLoading}) => {
    const theme:any = useContext(ThemeWrapper)
    const scrollY = useRef(new Animated.Value(0)).current
    const ScreenWidth = Dimensions.get('window').width
 
    const renderCollectionItem = useCallback(
        (item : Collections, round : number) => {
            const document = item.data();
            const translateX = Animated.add(scrollY , Animated.multiply(round , ScreenWidth * 0.8).interpolate({
                inputRange: [0, ScreenWidth * 0.8],
                outputRange: [0, (ScreenWidth - ScreenWidth * 0.8) / 2],
                extrapolate: 'clamp',
            }))
            return(
                <Suspense callback = {<Box>Loading..</Box>}>
                    <Collectionheader 
                    key = {round}
                    data={document} 
                    id = {item.id}
                    translateX = {translateX}/>  
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