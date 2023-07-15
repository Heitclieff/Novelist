import React,{useEffect , useState , useRef} from 'react'
import { 
Box, 
HStack,
Text,
Divider,
Button,
IconButton,
Icon,
VStack, } from 'native-base'
import { Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { getCollectionData } from '../../../../../systems/redux/action'
import { Image } from 'expo-image'
import { Entypo, Ionicons ,AntDesign } from '@expo/vector-icons'
const LazyProfilebackground = React.lazy(() => import('../../../../components/[stack]/Profile/[container]/Profilebackground'))
import * as Haptics from 'expo-haptics';
import { FlatList } from 'native-base'
import EpisodeList from '../../../../components/[stack]/Novel/[container]/chapter/EpisodeList'
import Navigationbar from '../../../../components/[stack]/Novel/[container]/Navigationbar'
import { useSharedValue , useAnimatedScrollHandler, useAnimatedStyle, withTiming , Easing , useAnimatedReaction , runOnJS} from 'react-native-reanimated'
import Animated from 'react-native-reanimated'

import BackgroundImage from '../../../../components/[stack]/Novel/[container]/Header/BackgroundImage'
import TitleSection from '../../../../components/[stack]/Novel/[container]/content/TitleSection'
import CreaterSection from '../../../../components/[stack]/Novel/[container]/content/CreaterSection'
import OverviewSection from '../../../../components/[stack]/Novel/[container]/content/OverviewSection'
import TagsSection from '../../../../components/[stack]/Novel/[container]/content/TagsSection'

interface Pageprops { }

const MemorizeProfilebackground = React.memo(LazyProfilebackground)

const Novelmain : React.FC <Pageprops> = () => {
    const route = useRoute()
    const {id}:any = route.params
    const theme:any = useContext(ThemeContext)

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);

    const selectedcollection = Collectionsdata.filter(filtereditems => filtereditems.id === id)
    const [isMarks , setisMarks] = useState<boolean>(false);
    const [isLiked , setisLiked] = useState<boolean>(false)
    const [showNavigate , setShowNavigate] = useState<boolean>(true);

    useEffect(() => {
         if (!isReduxLoaded) dispatch(getCollectionData());
    }, [dispatch, isReduxLoaded])

    const translateY = useSharedValue(0)
    const SafeAreaTop = useSharedValue(0);

    const { width, height } = Dimensions.get('window')
    const ITEM_WIDTH = width * 0.8;
    const ITEM_HEIGHT = height * 0.6;
    const scrollY = React.useRef(new Animated.Value(0)).current
    
  return (
    <Box flex = {1} bg = {theme.Bg.base} position={'relative'}>
        <Navigationbar
        isMarks = {isMarks}
        setisMarks={setisMarks}
        showNavigate = {showNavigate}
        translateY={translateY}
        />
        <Animated.View style = {useAnimatedStyle(() => {
            return {
                height : withTiming(SafeAreaTop.value, {
                    duration: 100,
                    easing: Easing.inOut(Easing.ease),
                }),
            }
        })}>
        </Animated.View> 
        <Animated.FlatList
        contentInset={{ bottom: 5 }}
        showsVerticalScrollIndicator={false}
        data={[0]}
        onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { listener: (event:any) => handleScroll(event)})}
        scrollEventThrottle={16}
        renderItem={({item , index}:any) => {
        const inputRange = [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT];
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange: [-ITEM_HEIGHT / 2, 0, ITEM_HEIGHT / 2],
            extrapolate: 'clamp',
          });
          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1],
            extrapolate: 'clamp',
          });
            return(
                <Box>
                    <VStack  h = '400' alignItems={'center'} position=  'relative' overflow= 'hidden'>
                        <BackgroundImage 
                            translateY = {translateY}
                            scale = {scale}
                            src = {selectedcollection[0].images}
                        />
                        <VStack 
                        w ='100%' 
                        h = '100%' 
                        pb = {8} 
                        justifyContent={'flex-end'} 
                        alignItems={'center'} 
                        position={'absolute'} 
                        zIndex={10}
                        space = {2}
                        >
                            <Box w = '150' h = '220' bg = 'gray.300' overflow= 'hidden'>
                                <Image
                                style={{width : '100%', height : '100%'}}
                                contentFit= 'cover'
                                source={selectedcollection[0].images}
                                alt = "images"
                                />
                            </Box>
                            <Box w = '140'>
                                <Button 
                                h = '9' 
                                size = 'sm' 
                                variant={theme.themeMode === 'dark' ? 'outline' : 'solid'} 
                                bg = {theme.themeMode === 'dark' ? null : 'amber.400'} 
                                borderColor={'amber.400'}
                                leftIcon={<Icon
                                    size='md'
                                    as={Ionicons}
                                    color = {theme.themeMode === 'dark' ? 'amber.400' : theme.Text.base}
                                    name={'library-outline'} />}
                                >
                                    <Text fontWeight={'medium'} fontSize={'xs'} color = {theme.themeMode === 'dark' ? 'amber.400' : null}>Add to library</Text>
                                </Button>
                            </Box>
                        </VStack>
                    </VStack> 
                    <VStack w=  '100%'>
                        <TitleSection
                            isLiked = {isLiked}
                            setisLiked={setisLiked}
                            collection={selectedcollection[0]}
                        />
                    </VStack>
                    <VStack w=  '100%' pl = {6}  space = {2}> 
                        <CreaterSection collection={selectedcollection[0]}/>
                    </VStack>
                    <Divider bg = {theme.Divider.base} mt = {3} />
                    <OverviewSection/>
                    <TagsSection/>
                    <VStack flex = {1} pt = {7}>
                        <EpisodeList/>
                    </VStack>
            </Box>
            )
        }}/>
    </Box>
 
  )
}

export default Novelmain;
