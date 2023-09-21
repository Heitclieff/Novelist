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
Text,
Divider } from 'native-base'
import { 
ImageBackground , 
Image , 
Animated,
Dimensions,
View,
Platform } from 'react-native'

import { useRoute } from '@react-navigation/native'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
// import { getCollectionData } from '../../systems/redux/action'

//@Components
import Bottomnavigation from './components/Bottomnavigation'
import Contentnavigation from '../../components/navigation/Contentnavigation'
import ForegroundItem from './components/ForegroundItem'
import Chapterfield from './components/Chapterfield'
import CommentModal from '../../components/layout/Modal/Comment'

//@Sections
import Mainsection from './section/Main'
import Overviewsection from './section/Overview'
import Creatorsection from './section/Creator'
import Tagsection from './section/Tag'

//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {}

const MemorizedBottomnavigation = React.memo(Bottomnavigation);
const MemorizedContentnavigation = React.memo(Contentnavigation);
 
const NovelContent : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeWrapper);
    const route = useRoute()
    const {id}:any = route.params
    console.log('id',id)
    const ScreenHeight = Dimensions.get('window').height;
    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)


    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const [isReduxLoaded, setisReduxLoaded] = useState<boolean>(false)
    const [selectedcollection, setselectedcollection] = useState<any[]>([]);

    const [isLiked , setisLiked] = useState<boolean>(false)
    const [isMarks , setisMarks] = useState<boolean>(false);
    const [showNavigate , setShowNavigate] = useState<boolean>(true);

    const getReaderNovel = async () => {
        const novelSnap = await firestore().collection('Novels').orderBy('view', 'desc').get();
        const novel_Data = [];

        for (const doc of novelSnap.docs) {
          const createdAt = doc.data().createAt.toDate();
          const creater = [];

          const projectSnapshot = await firestore().collection('Projects').where('novelDoc', '==', doc.id).get();
          for (const projectDoc of projectSnapshot.docs) {
            const userDocs = projectDoc.data().creater;
            for (const user of userDocs) {
              await firestore().collection('Users').doc(user).get().then((uData) => {
                const data = uData.data()
                creater.push({ id: user, username: data.username, image: data.image });
              })
            }
            const image = projectDoc.data().image;
            novel_Data.push({ id: doc.id, ...doc.data(), createAt: createdAt, creater: creater, image: image });
          }
        }
        setselectedcollection(novel_Data)
        setisReduxLoaded(true)
    }
    useEffect(() => {
        if (!isReduxLoaded) {
            getReaderNovel()
        }
    }, [isReduxLoaded])

    const MAX_HEIGHT  = ScreenHeight / 1.7;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 1.5; 
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
                                          source={{ uri: selectedcollection[0].image }}
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
                                          <Box width =  '100%' h = {MAX_HEIGHT} bg='black' opacity={0.35} />
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
                                            <LinearGradient colors={['transparent',theme.Bg.header]} style = {{width : '100%' , height : (HEADER_HEIGHT_EXPANDED + HEADER_HEIGHT_NARROWED)}}>
                                   
                                        </LinearGradient>
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
                        <Animated.View style={{position: 'absolute' , zIndex : 99 ,top : -MAX_HEIGHT / 2.8, left: '50%', transform: [{ translateX: 0}], 
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