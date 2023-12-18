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
Divider,
useToast,
} from 'native-base'
import { 
ImageBackground , 
Image , 
Animated,
Dimensions,
View,
RefreshControl,
Platform, 
Alert} from 'react-native'

import { useRoute } from '@react-navigation/native'
import { BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import IonIcon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import SendAlert from '../../services/alertService';
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { setMylibrary ,setMybookmarks ,setUser } from '../../systems/redux/action';
import sendNotification from '../../services/notificationService';

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
    const toast = useToast();
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
    const [pageID  , setPageID] = useState("");
    const [refreshing ,setRefreshing] = useState<boolean>(false);

    const [targetToken , setTargetToken] = useState<string>("");
    const [limiters , setlimiters] = useState<boolean>(true);
    const [isMyOwn , setisMyOwn] = useState<boolean>(false);
    const [isLiked , setisLiked] = useState<boolean>(false)
    const [isMarks , setisMarks] = useState<boolean>(false);
    const [isLoading , setLoading]=  useState<boolean>({
        start : true,
        novel : true,
        chapter : true,
        creator : true,
        Button : true,
    })

    const [showNavigate , setShowNavigate] = useState<boolean>(true);

    const fetchingNovels = async () : Promise<void> => {
        try {
            // fetch SnapshortContent from Novel
            const SnapshotContent = db.collection('Novels').doc(id);
            const documentSnapshot = await SnapshotContent.get();
            const novelDocs = documentSnapshot.data();
            setPageID(id);
            findingAgeRestricted(novelDocs);

            if (!documentSnapshot.exists) {
                console.log("Not found this document.");
                return
            }
    
            if(limiters){
                const Newviews  = increaseBookView(novelDocs)
                setnovelItem({...novelDocs , view : Newviews});
                // setlimiters(false);
            }
           
            if(id !== pageID){
                setLoading((prev) => ({...prev , start : false}));
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
            const SnapshotChapter = await SnapshotContent
            .collection('Chapters')
            .where('status' , '==' , false)
            .orderBy('updateAt','desc')
            .get();
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
        setLoading((prev :any) => ({...prev, Button : false}));
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

    const findingAgeRestricted = async (docs:any) => {
        try{
            const age  = findinguserAge(myAccount?.[0].birthDate);
            const getrating = await docs.rating.get();
            const rating = getrating.data();
            
            if(age >= rating.range){
                return
            }
            if(rating.range >= 18){             
                Alert.alert("Access Denied", " This content is age restricted.", [{text: 'OK', onPress: () => navigation.goBack()},]);
            }else if (rating.range >= 16){
                Alert.alert("Warning", " This content is violent. Please use discretion when reading.");
            }
        }catch(error){
            console.log("ERROR: failed to get Rating" ,error.message)
        }
    }

    const findinguserAge = (timestamp:any) => {
        if(timestamp){
          const birthConvert = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
          
          const today = new Date();
          const age = today.getFullYear() - birthConvert.getFullYear();
          return age;
        }
    }

    const AddtoMyBookmarks = async () : Promise<void> => {
        const Prevmarks = isMarks;
        let status  = "error"
        setisMarks(!isMarks)
        try{
 
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

            if(!Prevmarks){
                status = "success"
                const docRef = await bookmarkpath.add({
                    date : timestamp,
                    novelDoc : id, 
                })

                BookSlot = [{docid : docRef.id , id : id , date : formattedDate , ...novelItem} ,...Mybookmarks.slot]
                console.log("Sucess" ,docRef.id)
                SendAlert(status , "Added success" , "Add failed" , toast)
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
        setisLiked(liked);   
        try{
            
            let increment = novelItem.like
            let MyfavoriteBooks = myAccount[0].favorite?.length > 0 ? [...myAccount[0].favorite] : [];
            let userDoc = myAccount[0].id
            if(liked) {
                increment += 1
                MyfavoriteBooks.push(id);
                await db.collection('Novels').doc(id).update({like : firestore.FieldValue.increment(1)})
                // if (!novelItem.multiproject) {
                //     await db.collection('Scores').doc(userDoc).update({sum: firestore.FieldValue.increment(1)})
                // }
                // 
            }else{
                increment -= 1
                const deleteBooks = MyfavoriteBooks.filter(item => item !== id);
                MyfavoriteBooks = deleteBooks;
                await db.collection('Novels').doc(id).update({like : firestore.FieldValue.increment(-1)})
                // if (!novelItem.multiproject) {
                //     await db.collection('Scores').doc(userDoc).update({sum: firestore.FieldValue.increment(-1)})
                // }
            }
            setnovelItem({...novelItem , like : increment})

            const userRef  = await db.collection('Users').doc(userDoc)
                            .update({favorite : MyfavoriteBooks})
            
            // const scoreRef = await db.collection('Scores').doc(userDoc).update({score: increment})
            if(novelItem?.owner === myAccount?.[0].id){
                return
            }

            let message_token = targetToken;
            if(!message_token){
               message_token = await findingTargetToken(novelItem?.owner);          
            }

            if(message_token){
                sendNotification({
                    token : message_token,
                    target : novelItem?.owner,
                    body : `${myAccount[0].username} has like your project.`,
                    icon: myAccount?.[0].pf_image,
                    type : 'notify',
                    project : id,
                });
            }else{
                console.log("Not founds message token in your account");
            }

            dispatch(setUser([{...myAccount[0] , favorite : MyfavoriteBooks}]))
        }catch(error){
            console.log("Failed To Like a Book",error)
        }
    }

    
    const findingTargetToken = async (target : string) => {
        try{
        const getTarget = await firestore().collection("Users").doc(target).get();
        const getToken = getTarget.data()?.message_token;

        if(getToken){
            if(!targetToken){
                setTargetToken(getToken);
            }
        }
        return getToken;

        }catch(error){
            console.log("Failed to finding Target Token" ,error);
        }
    }



    const setMylibraryBooks = async () : Promise<void> => {
        let status = "error";
        const prevOwn = isMyOwn;
        setLoading((prev :any) => ({...prev, Button : true}));
        setisMyOwn(!isMyOwn);
        const uid = myAccount[0].id
        const getuserpath =  db.collection('Users').doc(uid);
        const librarypath =  getuserpath.collection("Library")
        const timestamp = firestore.FieldValue.serverTimestamp();
        
        const BooksAdd = [{id  : id , ...novelItem}]
        const ConcatBooks = myBooks.book ? BooksAdd.concat(...myBooks.book) : BooksAdd;
        
        if(!prevOwn){
            try{
                dispatch(setMylibrary({book : ConcatBooks}))
                const docRef = await librarypath.add({           
                    date : timestamp,
                    novelDoc : id,
                    type : 'Bought'
                });

                status = "success"
                console.log('Add success', docRef.id)
                SendAlert(status , "Added success" , "Add failed" , toast)
            }catch(error){
                console.log("Failed to Add library Books" , error);
            }  
        }else{
            try{
                if(myBooks.book){
                    const removeBooks = myBooks.book.filter((book) => book.id !== id)
                    dispatch(setMylibrary({book: removeBooks}));
        
                    const getlibrarykeys = await librarypath.where('novelDoc' , '==' , id).get()
                    const docID =  getlibrarykeys.docs.map(doc => doc.id)
                    const docRef = await librarypath.doc(docID[0]).delete();
                    console.log("Remove" , id , 'success');
                }
            }catch(error){
                console.log("Failed to Remove library Books" , error);
            }   
        }
        setLoading((prev :any) => ({...prev, Button : false}));
    }

    useEffect(() => {
        if(id !== pageID){
            setLoading((prev) => ({...prev , start : true}))
        }
    } , [id])


    useEffect(() => {
        const shouldrefresh = id  || refreshing
        if(shouldrefresh) fetchingNovels()
    }, [refreshing ,id])


    useEffect(() => {
        const shouldrefresh = id  || refreshing
        if(shouldrefresh) fetchingChapter()
    },[refreshing , id])


    useEffect(() => {
        const shouldrefresh = id || refreshing
        if(shouldrefresh) fetchingCreator()
    },[refreshing, id])

    useEffect(() => {
        findingBookinMyBookmarks();
    },[refreshing, id])

    useEffect(() => {
        findingBookinMylibrary();
    },[refreshing, id])

    useEffect(() => {
        findinglikeinMyfavorite();
    },[refreshing, id])

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
                isLoading = {isLoading?.Button}
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
                                    isLoading = {isLoading?.start}
                                    isBtnLoading = {isLoading?.Button}
                                    collection={novelItem}
                                    myBook = {isMyOwn}
                                    setlibrary = {setMylibraryBooks}
                                />
                            </Animated.View>}
                        </Box>
                      <Animated.ScrollView
                          showsVerticalScrollIndicator={false}
                          refreshControl={
                            <RefreshControl 
                            refreshing = {refreshing} 
                            onRefresh={onRefresh}
                            tintColor={'white'}
                            />
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
                                    isLoading = {isLoading?.start}
                                    isBtnLoading = {isLoading?.Button}
                                    collection={novelItem}
                                    myBook = {isMyOwn}
                                    setlibrary = {setMylibraryBooks}
                                    />
                           
                        </Animated.View>
                        }
                      
                          <VStack w='100%' bg={theme.Bg.base} position='relative' pb={HEADER_HEIGHT_EXPANDED + BOTTOM_SPACE} zIndex={0}>
                               
                           
                             {/* <Button onPress = {() => navigation.navigate('Readcontent',{id , title : novelItem.title})}>Content Test</Button> */}
                                
                              <VStack w='100%'>
                                  <Mainsection
                                      isLiked={isLiked}
                                      setisLiked={setBookisLiked}
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
        owner = {novelItem?.owner}
        handleSheetChange = {handleSheetChange}
        />
    </BottomSheetModalProvider>
  )
}

export default NovelContent;