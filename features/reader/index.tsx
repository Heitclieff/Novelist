import React,{
useRef, 
useEffect , 
useContext , 
useState , 
useMemo , 
useCallback} from 'react'
import { 
Box , 
Button,
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
import { useNavigation } from '@react-navigation/native';
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
    const navigation = useNavigation();
    const ScreenHeight = Dimensions.get('window').height;
    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)

    const [isReduxLoaded, setisReduxLoaded] = useState<boolean>(false)
    const [novelItem, setnovelItem] = useState([]); //<any[]>
    const [chapterItem, setchapterItem] = useState([])

    const [isLiked , setisLiked] = useState<boolean>(false)
    const [isMarks , setisMarks] = useState<boolean>(false);
    const [showNavigate , setShowNavigate] = useState<boolean>(true);

    const fetchNovelandChapter = async () : Promise<void> => {
        try {
            // fetch SnapshortContent from Novel
            const SnapshotContent = await firestore().collection('Novels').doc(id);
            const documentSnapshot = await SnapshotContent.get();
 
            if (!documentSnapshot.exists) {
                console.log("Not found this document.");
            }
            const Noveldocument = documentSnapshot.data();
            setnovelItem(Noveldocument);

            // fetch SnapshortContent from Chapter
            const SnapshotChapter = await SnapshotContent.collection('Chapters').orderBy('updateAt','desc').get();
            const Chapterdocument = SnapshotChapter.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setchapterItem(Chapterdocument);

        } catch (error) {
            console.error("Error fetching document:", error);
        }
    }

    useEffect(() => {
            if(id) fetchNovelandChapter()
    }, [id])

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
              {novelItem &&
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
                                          source={{ uri: novelItem.image }}
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
                                        collection={novelItem}
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
                                        collection={novelItem}
                                    />
                           
                        </Animated.View>
                        }
                      
                          <VStack w='100%' bg={theme.Bg.base} position='relative' pb={HEADER_HEIGHT_EXPANDED + BOTTOM_SPACE} zIndex={0}>
                               
                           
                             {/* <Button onPress = {() => navigation.navigate('Readcontent',{id , title : novelItem.title})}>Content Test</Button> */}
                                
                              <VStack w='100%'>
                                  <Mainsection
                                      isLiked={isLiked}
                                      setisLiked={setisLiked}
                                      collection={novelItem}
                                  />
                              </VStack>
                              <VStack w='100%' pl={6} space={2}>
                                  <Creatorsection collection={novelItem} />
                              </VStack>
                              <Divider bg={theme.Divider.base} mt={3} />
                              <Overviewsection overview = {novelItem.overview}/>
                              <Tagsection tag = {novelItem.tagDoc}/>
                              <VStack flex={1} pt={7}>
                                  <Chapterfield  
                                    doc_id = {id}
                                    noveltitle = {novelItem.title} 
                                    chapterdata = {chapterItem} 
                                    handleCommentButton={handlePresentModalPress} />
                              </VStack>
                              {/* <CommentModal BottomRef={bottomSheetModalRef}></CommentModal> */}
                          </VStack>
                      </Animated.ScrollView>
                      </Box>
              }
          </Box>
      </BottomSheetModalProvider>
  )
}

export default NovelContent;