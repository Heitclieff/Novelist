import React,{useRef, useEffect , useContext , useState} from 'react'
import { Box , VStack , Button ,HStack ,Text , Icon , Divider } from 'native-base'
import { Image } from 'expo-image'
import Animated from 'react-native-reanimated'
import { useRoute } from '@react-navigation/native'
import { ScrollView , View} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ImageBackground } from 'react-native'
import { TouchableOpacity } from 'react-native'

//Redux with Collectiondata
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../../systems/redux/reducer'
import { getCollectionData } from '../../../../../systems/redux/action'


//Device Theme.
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
//Components
import ForegroundItem from '../../../../components/[stack]/Novel/[container]/Header/ForegroundItem'
import EpisodeList from '../../../../components/[stack]/Novel/[container]/chapter/EpisodeList'
import OverviewSection from '../../../../components/[stack]/Novel/[container]/content/OverviewSection'
import CreaterSection from '../../../../components/[stack]/Novel/[container]/content/CreaterSection'
import TagsSection from '../../../../components/[stack]/Novel/[container]/content/TagsSection'
import TitleSection from '../../../../components/[stack]/Novel/[container]/content/TitleSection'
import Navigationbar from '../../../../components/[stack]/Novel/[container]/Navigationbar'

interface Pageprops {}

const NovelContent : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeContext);
    const route = useRoute()
    const {id}:any = route.params

    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);
    const selectedcollection = Collectionsdata.filter(filtereditems => filtereditems.id === id)

   

    const [isLiked , setisLiked] = useState<boolean>(false)
    const [isMarks , setisMarks] = useState<boolean>(false);
    const [showNavigate , setShowNavigate] = useState<boolean>(true);

    useEffect(() => {
        if (!isReduxLoaded) dispatch(getCollectionData());
    }, [dispatch, isReduxLoaded])

    const MAX_HEIGHT  = 500;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = 320; 
   
    const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <Box flex = {1} bg = {theme.Bg.base}>
        <Navigationbar
        isMarks = {isMarks}
        setisMarks={setisMarks}
        showNavigate = {showNavigate}
        />
            <Box w = '100%' h=  {MAX_HEIGHT} position={'absolute'} >
                <VStack   alignItems={'center'} position=  'relative' overflow= 'hidden'>
                <Animated.View style = {[{width : '100%' , height : '100%'}, { transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, 300],
                      outputRange: [0, -100],
                      extrapolate: 'clamp',
                    }),
                  },
                ], }]}>
                        <AnimatedBackground
                        id='background-images'
                        source={{uri :selectedcollection[0].images}}
                        alt="images"
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            opacity: 1,
                            position: 'relative',
                            transform: [{
                                scale : scrollY.interpolate({
                                    inputRange : [-500 ,0],
                                    outputRange : [5,1],
                                    extrapolateLeft : 'extend',
                                    extrapolateRight : 'clamp',
                                })
                            }]
                        }}> 
                            <Box flex = {1} bg = 'black' opacity={0.2}></Box>
                        </AnimatedBackground>
                        <Animated.View 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            position: 'absolute',
                            transform: [{
                                scale : scrollY.interpolate({
                                    inputRange : [-500 ,0],
                                    outputRange : [5,1],
                                    extrapolateLeft : 'extend',
                                    extrapolateRight : 'clamp',
                                })
                            }]
                        }}>
                            <Box w='100%' h = '100%' position= 'absolute' zIndex={10} top = {'-18%'}
                            bg={{
                                linearGradient: {
                                    colors: ['transparent',theme.Bg.base],
                                    start: [0, 0, 0, 0.5],
                                    end: [0, 0 , 0 ,0],
                                },
                            }}></Box>
                        </Animated.View>
                        
                    </Animated.View>
                    </VStack> 
            </Box>
        
            <Animated.ScrollView
            showsVerticalScrollIndicator = {false}
            onScroll={Animated.event([
                {
                    nativeEvent : {
                        contentOffset : {
                            y: scrollY
                        }
                    }
                }
            ],
            {
                useNativeDriver : true
            })}
            scrollEventThrottle={16}
            style ={{
                zIndex : 1 ,
                position : 'relative',
                marginTop : HEADER_HEIGHT_NARROWED,
                paddingTop : HEADER_HEIGHT_EXPANDED,
            }}
            >
                    <Animated.View style={{position: 'absolute', height : 200, zIndex : 2, left: '50%', transform: [{ translateX: 0 }] , 
                    opacity : scrollY.interpolate({
                        inputRange: [0, 100],
                        outputRange: [1, 0], 
                        extrapolate: 'clamp',
                    })}}>
                        <Box position={'absolute'} top = {'-85%'} >
                        <ForegroundItem
                                collection={selectedcollection[0]}
                            />
                        </Box>
                    </Animated.View>
                
                  
                    <VStack w = '100%' bg = {theme.Bg.base} position = 'relative' pb = {HEADER_HEIGHT_EXPANDED}>
                       
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
                    </VStack>
            </Animated.ScrollView>
  
    </Box>

  )
}

export default NovelContent;
