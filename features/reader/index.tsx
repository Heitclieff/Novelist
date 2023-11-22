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
RefreshControl,
Platform } from 'react-native'

import { useRoute } from '@react-navigation/native'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { setMylibrary ,setMybookmarks ,setUser } from '../../systems/redux/action';

//@Components
import Bottomnavigation from './components/Bottomnavigation'
import Contentnavigation from '../../components/navigation/Contentnavigation'
import ForegroundItem from './components/ForegroundItem'
import Chapterfield from './components/Chapterfield'
import CommentModal from '../../components/layout/Modal/Comment'
import { ReaderSkeleton } from '../../components/skelton/reader';
import { CreatorSkeleton } from '../../components/skelton/reader/creator';
//@Sections
import Mainsection from './section/Main'
import Overviewsection from './section/Overview'
import Creatorsection from './section/Creator'
import Tagsection from './section/Tag'

//firebase
import firestore from '@react-native-firebase/firestore'
import { SpinnerItem } from '../../components/Spinner';

interface Pageprops {}

const MemorizedBottomnavigation = React.memo(Bottomnavigation);
const MemorizedContentnavigation = React.memo(Contentnavigation);
 
const NovelContent : React.FC <Pageprops> = () => {
    const db = firestore()
    const theme:any = useContext(ThemeWrapper);
    const route = useRoute()
    const {id}:any = route.params
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const myBooks = useSelector((state) => state.book)
    const myAccount = useSelector((state) => state.userData);
    const Mybookmarks = useSelector((state) => state.slot)
    // console.log('reader content',myAccount[0].id)
    const ScreenHeight = Dimensions.get('window').height;
    const AnimatedBackground = Animated.createAnimatedComponent(FastImage)
    const [novelItem, setnovelItem] = useState({}); //<any[]>
    const [novelId, setnovelId] = useState([]);
    const [chapterItem, setchapterItem] = useState([])
    const [refreshing ,setRefreshing] = useState<boolean>(false);

    const [limiters , setlimiters] = useState<boolean>(true);
    const [isMyOwn , setisMyOwn] = useState<boolean>(false);
    const [isLiked , setisLiked] = useState<boolean>(false)
    const [isMarks , setisMarks] = useState<boolean>(false);
    const [isLoading , setLoading]=  useState<boolean>({
        start : true,
        novel : true,
        chapter : true,
        creator : true,
    })

    const [showNavigate , setShowNavigate] = useState<boolean>(true);
    

    const fetchingNovels = async () : Promise<void> => {
        try {
            // fetch SnapshortContent from Novel
            const SnapshotContent = db.collection('Novels').doc(id);
            const documentSnapshot = await SnapshotContent.get();
            const novelDocs = documentSnapshot.data();
            if (!documentSnapshot.exists) {
                console.log("Not found this document.");
                return
            }
    
            if(limiters){
                const Newviews  = increaseBookView(novelDocs)
                setnovelItem({...novelDocs , view : Newviews});
                setlimiters(false);
            }
           
            setLoading((prev) => ({...prev , novel : false}))

        } catch (error) {
            console.error("Error fetching document:", error);
        }
    }

    const fetchingCreator = async () => {
            // findingBookinMylibrary();
            const SnapshotContent = db.collection('Novels').doc(id);
            // const snapMainData = db.collection('Novels').doc(documentSnapshot.id)
            const snapSubData = await SnapshotContent.collection('Creator').get();
            const creatorkey = snapSubData?.docs.map(doc => doc.data().userDoc);
            const creatorDocs = await matchingUserwithId(creatorkey);
            
            setnovelId(creatorDocs);
            setLoading((prev) => ({...prev , creator : false}))
    }

    const fetchingChapter = async () => {
        try{
            const SnapshotContent = db.collection('Novels').doc(id);
            const SnapshotChapter = await SnapshotContent.collection('Chapters').orderBy('updateAt','desc').get();
            const Chapterdocument = SnapshotChapter.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            setchapterItem(Chapterdocument);
            setLoading((prev) => ({...prev , chapter : false}))
        }catch(error){
            console.error("Error fetching chapters:", error);
        }

    }

    const matchingUserwithId = async (creatorkeys : any) :Promise<T> => {
        const getuserkeys = await db.collection('Users').where(firestore.FieldPath.documentId(), 'in' , creatorkeys).get();
        const userdocs = getuserkeys.docs.map(doc => ({id: doc.id , ...doc.data()}));
        return userdocs

    }

    const increaseBookView = (current:any) => {
        try{
            firestore().collection('Novels').doc(id).update({view : firestore.FieldValue.increment(1)})
            return current.view + 1
        }catch(error){
            console.log("Failed to increase view" , error)
        }
    }

    const findingBookinMylibrary = () => {
        const findingBooks = myBooks.book?.find((doc) => doc.id === id)?.id
        if(!findingBooks) return
        setisMyOwn(true);
    }   

    const findingBookinMyBookmarks = () => {
        
        const findingBookmarks = Mybookmarks.slot?.find((doc) => doc.id === id)?.id
        if(!findingBookmarks) return
        setisMarks(true);
    }

    const findinglikeinMyfavorite = () => {
        const findinglike = myAccount[0].favorite?.includes(id);
        if(!findinglike) return
        setisLiked(true);   
    }
    const AddtoMyBookmarks = async () : Promise<void> => {
        try{
            setisMarks(!isMarks)
            const uid = myAccount[0].id
            const getuserpath =  db.collection('Users').doc(uid);
            const bookmarkpath = getuserpath.collection("Bookmark");
            const timestamp = firestore.FieldValue.serverTimestamp();
           
            const currentDate = new Date();
            const formattedDate = {
                seconds: Math.floor(currentDate.getTime() / 1000),
                nanoseconds: (currentDate.getTime() % 1000) * 1000000,
            };
            let BookSlot  = [];

            if(!isMarks){
                const docRef = await bookmarkpath.add({
                    date : timestamp,
                    novelDoc : id, 
                })

                BookSlot = [{docid : docRef.id , id : id , date : formattedDate , ...novelItem} ,...Mybookmarks.slot]
                console.log("Sucess" ,docRef.id)
            }else {
                const BookmarksStore = {removeBooks : [] , keepBooks : []};
                Mybookmarks.slot.forEach(book => {
                    if(book.id !== id){
                        BookmarksStore.keepBooks.push(book);
                    }else{
                        BookmarksStore.removeBooks.push(book);
                        return
                    }
                });

                BookSlot = BookmarksStore.keepBooks;
                await bookmarkpath.doc(BookmarksStore.removeBooks[0]?.docid).delete();
            }
           
            dispatch(setMybookmarks({slot : BookSlot}))

        }catch(error){
            console.log("Add Book to Bookmarks Failed" , error)
        }
    }

    const setBookisLiked = async (liked:boolean) : Promise<void> => {
        try{
            let increment = novelItem.like
            let MyfavoriteBooks = [...myAccount[0].favorite];
            let userDoc = myAccount[0].id
            if(liked) {
                increment += 1
                MyfavoriteBooks.push(id);
                await db.collection('Novels').doc(id).update({like : firestore.FieldValue.increment(1)})
                if (!novelItem.multiproject) {
                    await db.collection('Scores').doc(userDoc).update({sum: firestore.FieldValue.increment(1)})
                }
                // 
            }else{
                increment -= 1
                const deleteBooks = MyfavoriteBooks.filter(item => item !== id);
                MyfavoriteBooks = deleteBooks;
                await db.collection('Novels').doc(id).update({like : firestore.FieldValue.increment(-1)})
                if (!novelItem.multiproject) {
                    await db.collection('Scores').doc(userDoc).update({sum: firestore.FieldValue.increment(-1)})
                }
            }
            setisLiked(liked);    
            setnovelItem({...novelItem , like : increment})
            
            
            // const novelRef = await db.collection('Novels').doc(id)
            //                 .update({like : increment})
            //                 ;


            const userRef  = await db.collection('Users').doc(userDoc)
                            .update({favorite : MyfavoriteBooks})
            
            // const scoreRef = await db.collection('Scores').doc(userDoc).update({score: increment})

            dispatch(setUser([{...myAccount[0] , favorite : MyfavoriteBooks}]))
        }catch(error){
            console.log("Failed To Like a Book",error)
        }
    }

    const setMylibraryBooks = async () : Promise<void> => {
        try{
            const uid = myAccount[0].id
            const getuserpath =  db.collection('Users').doc(uid);
            const librarypath =  getuserpath.collection("Library")
            const timestamp = firestore.FieldValue.serverTimestamp();

            if(!isMyOwn){
                dispatch(setMylibrary({book : [{id : id , ...novelItem}, ...myBooks.book]}))
                const docRef = await librarypath.add({           
                    date : timestamp,
                    novelDoc : id,
                    type : 'Bought'
                    });
                console.log('Add success', docRef.id)
            }else{
                const removeBooks = Mybookmarks.slot.filter((book) => book.id !== id)
                dispatch(setMylibrary({book: removeBooks}));

                const getlibrarykeys = await librarypath.where('novelDoc' , '==' , id).get()
                const docID =  getlibrarykeys.docs.map(doc => doc.id)
                const docRef = await librarypath.doc(docID[0]).delete();
                console.log("Remove" , id , 'success');
                
            }
        }catch(error){
            console.log("Add Book to library Failed" , error)
        }
        setisMyOwn(!isMyOwn);
    }

    useEffect(() => {
        const shouldrefresh = id || refreshing
            if(shouldrefresh) fetchingNovels()
    }, [refreshing])

    useEffect(() => {
        const shouldrefresh = id || refreshing
        if(shouldrefresh) fetchingChapter()
    },[refreshing])

    useEffect(() => {
        const shouldrefresh = id || refreshing
        if(shouldrefresh) fetchingCreator()
    },[refreshing])

    useEffect(() => {
        findingBookinMyBookmarks();
    },[refreshing])

    useEffect(() => {
        findingBookinMylibrary();
    },[refreshing])

    useEffect(() => {
        findinglikeinMyfavorite();
    },[refreshing])

    const MAX_HEIGHT  = ScreenHeight / 1.7;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 1.5; 
    const BOTTOM_SPACE = Platform.OS == 'android' ? 70 : 0

    const scrollY = useRef(new Animated.Value(0)).current;
    const bottomSheetModalRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '70%'], []);

    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
      }, []);

      const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
      }, []);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);


    useEffect(() => {
        setTimeout(() => {
           setLoading((prev) => ({...prev , start : false}))
          },0)
    },[])

  if(isLoading.start) return(
    <ReaderSkeleton/>
  )

  return (
        <BottomSheetModalProvider>
          <Box flex={1} bg={theme.Bg.base} position={'relative'}>
              <MemorizedContentnavigation
                  isMarks={isMarks}
                  setisMarks={AddtoMyBookmarks}
                  showNavigate={showNavigate}
              />
              {Platform.OS == 'android' &&
                <MemorizedBottomnavigation
                isLiked={isLiked}
                setisLiked={setBookisLiked}
                bottomspace = {BOTTOM_SPACE}
                myBook = {isMyOwn}
                setlibrary = {setMylibraryBooks}
              />
              }
              { novelItem &&
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
                                          source={{ 
                                            uri: novelItem.image,
                                            priority : FastImage.priority.high,
                                            cache: FastImage.cacheControl.cacheOnly,
                                            }}
                                          resizeMode={FastImage.resizeMode.cover}
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
                                    isLoading = {isLoading.start}
                                    collection={novelItem}
                                />
                            </Animated.View>}
                        </Box>
                      <Animated.ScrollView
                          showsVerticalScrollIndicator={false}
                          refreshControl={
                            <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
                          }
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
                                    isLoading = {isLoading.start}
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
                                {isLoading.creator ? 
                                    <CreatorSkeleton/>
                                    :
                                    <Creatorsection collection={novelId} />
                                }
                              </VStack>
                              <Divider bg={theme.Divider.base} mt={3} />
                              <Overviewsection overview = {novelItem.overview}/>
                              <Tagsection tag = {novelItem.tagDoc}/>
                              <VStack flex={1} pt={7}>
                                {isLoading.chapter ?

                                    <SpinnerItem/> 
                                    :

                                    <Chapterfield  
                                    doc_id = {id}
                                    comment_status = {novelItem.comment_status}
                                    noveltitle = {novelItem.title} 
                                    chapterdata = {chapterItem} 
                                    handleCommentButton={handlePresentModalPress} 
                                    />
                                }
                                
                              </VStack>
                             
                          </VStack>
                      </Animated.ScrollView>
                      </Box>
              }           
          </Box>
        
        <CommentModal 
        BottomRef={bottomSheetModalRef} 
        snapPoints = {snapPoints} 
        id = {id}
        handleSheetChange = {handleSheetChange}
        />
    </BottomSheetModalProvider>
  )
}

export default NovelContent;