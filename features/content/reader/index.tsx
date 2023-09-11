import React,{
useRef, 
useEffect , 
useContext , 
useState , 
useMemo , 
useCallback} from 'react'
import { 
Box , 
VStack , 
Divider } from 'native-base'
import { 
ImageBackground , 
Image , 
Animated,
Platform } from 'react-native'

import { useRoute } from '@react-navigation/native'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import IonIcon from 'react-native-vector-icons/Ionicons'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../systems/redux/reducer'
import { getCollectionData } from '../../../systems/redux/action'

//@Components
import Bottomnavigation from './components/Bottomnavigation'
import Contentnavigation from '../../../components/navigation/Contentnavigation'
import ForegroundItem from './components/ForegroundItem'
import Chapterfield from './components/Chapterfield'
import CommentModal from '../../../components/layout/Modal/Comment'

//@Sections
import Mainsection from './section/Main'
import Overviewsection from './section/Overview'
import Creatorsection from './section/Creator'
import Tagsection from './section/Tag'

interface Pageprops {}

const MemorizedBottomnavigation = React.memo(Bottomnavigation);
const MemorizedContentnavigation = React.memo(Contentnavigation);
 
const NovelContent : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeWrapper);
    const route = useRoute()
    const {id}:any = route.params

    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsData)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
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
    const BOTTOM_SPACE = Platform.OS == 'android' ? 70 : 0

    const scrollY = useRef(new Animated.Value(0)).current;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

  return (
      <BottomSheetModalProvider>
          <Box flex={1} bg={theme.Bg.base} position={'relative'}>
              <MemorizedContentnavigation
                  isMarks={isMarks}
                  setisMarks={setisMarks}
                  showNavigate={showNavigate}
              />
              {Platform.OS == 'android' &&
                <MemorizedBottomnavigation
                isLiked={isLiked}
                setisLiked={setisLiked}
                bottomspace = {BOTTOM_SPACE}
              />
              }
              {selectedcollection.length > 0 && isReduxLoaded &&
                  <Box>
                          <Box w='100%' h={MAX_HEIGHT} position={'absolute'}>
                              <VStack alignItems={'center'} position='relative' overflow='hidden'>
                                  <Animated.View style={[{ width: '100%', height: '100%' }, {
                                      transform: [
                                          {
                                              translateY: scrollY.interpolate({
                                                  inputRange: [0, 300],
                                                  outputRange: [0, -100],
                                                  extrapolate: 'clamp',
                                              }),
                                          },
                                      ],
                                  }]}>
                                      <AnimatedBackground
                                          id='background-images'
                                          source={{ uri: selectedcollection[0].images }}
                                          alt="images"
                                          style={{
                                              width: '100%',
                                              height: '100%',
                                              opacity: 1,
                                              position: 'relative',
                                              transform: [{
                                                  scale: scrollY.interpolate({
                                                      inputRange: [-500, 0],
                                                      outputRange: [5, 1],
                                                      extrapolateLeft: 'extend',
                                                      extrapolateRight: 'clamp',
                                                  })
                                              }]
                                          }}>
                                          <Box width =  '100%' h = {MAX_HEIGHT} bg='black' opacity={0.2} />
                                      </AnimatedBackground>
                                      <Animated.View
                                          style={{
                                              width: '100%',
                                              height: '100%',
                                              position: 'absolute',
                                              transform: [{
                                                  scale: scrollY.interpolate({
                                                      inputRange: [-500, 0],
                                                      outputRange: [5, 1],
                                                      extrapolateLeft: 'extend',
                                                      extrapolateRight: 'clamp',
                                                  })
                                              }]
                                          }}>
                                          <Box w='100%' h='100%' position='absolute' zIndex={2} top={'-18%'}
                                              bg={{
                                                  linearGradient: {
                                                      colors: ['transparent', theme.Bg.base],
                                                      start: [0, 0, 0, 0.5],
                                                      end: [0, 0, 0, 0],
                                                  },
                                              }}></Box>
                                      </Animated.View>
                                  </Animated.View>
                              </VStack>
                              {Platform.OS == 'android' && 
                              <Animated.View style={{position: 'absolute' ,height : MAX_HEIGHT, zIndex : 99 , left: '50%', transform: [{ translateX: 0}], 
                                opacity : scrollY.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [1, 0], 
                                    extrapolate: 'clamp',
                                })}}>
                
                                <ForegroundItem
                                        collection={selectedcollection[0]}
                                    />
                            </Animated.View>}
                        </Box>
                      <Animated.ScrollView
                          showsVerticalScrollIndicator={false}
                          onScroll={Animated.event([
                              {
                                  nativeEvent: {
                                      contentOffset: {
                                          y: scrollY
                                      }
                                  }
                              }
                          ],
                              {
                                  useNativeDriver: true
                              })}
                          scrollEventThrottle={16}
                          style={{
                              zIndex :0,
                              position: 'relative',
                              marginTop : HEADER_HEIGHT_NARROWED,
                              paddingTop : HEADER_HEIGHT_EXPANDED,
    
                          }}
                      >
                        {Platform.OS == 'ios' && 
                        <Animated.View style={{position: 'absolute' , zIndex : 99 ,top : -MAX_HEIGHT /3 , left: '50%', transform: [{ translateX: 0}], 
                            opacity : scrollY.interpolate({
                                inputRange: [0, 100],
                                outputRange: [1, 0], 
                                extrapolate: 'clamp',
                            })}}>
                    
                                <ForegroundItem
                                        collection={selectedcollection[0]}
                                    />
                           
                        </Animated.View>
                        }
                          <VStack w='100%' bg={theme.Bg.base} position='relative' pb={HEADER_HEIGHT_EXPANDED + BOTTOM_SPACE} zIndex={0}>

                              <VStack w='100%'>
                                  <Mainsection
                                      isLiked={isLiked}
                                      setisLiked={setisLiked}
                                      collection={selectedcollection[0]}
                                  />
                              </VStack>
                              <VStack w='100%' pl={6} space={2}>
                                  <Creatorsection collection={selectedcollection[0]} />
                              </VStack>
                              <Divider bg={theme.Divider.base} mt={3} />
                              <Overviewsection/>
                              <Tagsection/>
                              <VStack flex={1} pt={7}>
                                  <Chapterfield id = {id} handleCommentButton={handlePresentModalPress} />
                              </VStack>
                              <CommentModal BottomRef={bottomSheetModalRef}></CommentModal>
                          </VStack>
                      </Animated.ScrollView>
                      </Box>
              }
          </Box>
      </BottomSheetModalProvider>
  )
}

export default NovelContent;