import React,{useContext , useEffect, useState} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { Box , Text, VStack , Button} from 'native-base';
import { useSharedValue , useAnimatedScrollHandler } from 'react-native-reanimated';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {LogBox , AppState, Alert} from 'react-native';
import { HeaderSkelton } from '../../components/skelton/index/header';
import SplashScreen from 'react-native-splash-screen'

//@Redux tools
import { useDispatch , useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../../systems/redux/reducer';
import notifee from '@notifee/react-native';
import {setUser , setMylibrary ,setMybookmarks, setCategory } from '../../systems/redux/action';
//@Components
import Indexheader from './header/Indexheader';


//@Layouts
import { Indexnavigation } from '../../components/navigation/Indexnavigation';
import CollectionsField from './components/Collectionsfield';

//firebase 
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging';

const MemorizedIndexnavigation = React.memo(Indexnavigation);
const MemorizedIndexheaderitem = React.memo(Indexheader);
const MemorizedCollectionField = React.memo(CollectionsField);

const Index : React.FC = () => {
    const db = firestore()
    const Auth = auth()
    const theme:any = useContext(ThemeWrapper);
    const scrollY = useSharedValue(0);
    const navigation = useNavigation();
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })
    
    const [CollectionMostview , setCollectionMostview] = useState<any[]>([]);
    const [CollectionHotNew , setCollectionHotNew] = useState<any[]>([])
    const [CollectionTopNew  , setCollectionTopNew] = useState<any[]>([]);
    const [isLoading, setLoading] = useState<Boolean>({
        heading : true,
        top : true,
        second : true
    });
    const [refreshing ,setRefreshing] = useState<boolean>(false);

    const userdata = useSelector((state) => state.userData);
      

    const getTopNewAndDispatch = async () => {
        try {
          const snapshortTop = await db.collection('Novels')
          .where("status" , '==' ,true)
          .orderBy('createAt', 'desc')
          .limit(10)
          .get()
          setCollectionTopNew(snapshortTop.docs)

          setLoading((prev) => ({...prev , second : false}));
        } catch (error) {
          console.error('Error fetching Top New novels:', error);
        }
      };
    
      const getHotNewAndDispatch = async () => {
        try {
          const snapshortHot = await db.collection('Novels')
          .where("status" , '==' ,true)
          .orderBy('createAt', 'desc')
          .limit(10).get();
          setCollectionHotNew(snapshortHot.docs)
          // newestNovels.sort((a, b) => b.view - a.view);

          setLoading((prev) => ({...prev , top : false}));
        } catch (error) {
          console.error('Error fetching hot new novels:', error);
        }
      };
      
      const getMostviewAndDispatch = async () => {
        try {
          const snapshortMost = await db.collection('Novels')
          .where("status" , '==' ,true)
          .orderBy('view', 'desc')
          .limit(10)
          .get();
          setCollectionMostview(snapshortMost.docs)

          setLoading((prev) => ({...prev , heading : false}));
      
        } catch (error) {
          console.error('Error fetching most view novels:', error);
        }
      };
      
      const getUserandDispatch = async () => {
        try{
          // await auth().signOut()
          let uid = auth().currentUser?.uid;
          if(uid){
            const snapUserData = await db.collection('Users').doc(uid).get()
            
            let userData = [{ id: snapUserData.id, ...snapUserData.data() }]
            if(!userData?.[0].message_token){
              setupMessageToken(uid);
            }

            dispatch(setUser(userData))
            getLibraryContent(uid);
            getBookmarks(uid);
            return
          }
          navigation.navigate("Login");
        }catch(error){
          console.log("Error to get Authentication User" ,error);
        }
        // await auth().signInWithEmailAndPassword('testData1@gmail.com','Newpass')
        
      }
      
      const callScore = async () => {
        const mainScoreRef = db.collection('Scores')
        const snapSocreDoc = await mainScoreRef.get()
        // console.log(snapSocreDoc.docs)
        let snapData = snapSocreDoc.docs
        const score = snapData.map(doc => {
          const data = doc.data();
          const sum = data.sum;
          const totalbook = data.totalbook;
          const scoreValue = totalbook === 0 ? 0 : Math.floor(sum / totalbook);
          return { id: doc.id, score: scoreValue };
        });
        console.log(score)
        score.forEach(async(data) => {
          const docRef = db.collection("Scores").doc(data.id);
        
          await docRef.update({
            score: data.score,
          })
        });
      }

      const getLibraryContent = async (uid):Promise<T> => {
        try {
          // fixed userdata to Object
          const snapshotusers = db.collection("Users").doc(uid)
          const getlibrarykeys = await snapshotusers.collection("Library").orderBy("date" , "desc").get();
          const librarykeys = getlibrarykeys.docs.map(doc => doc.data().novelDoc);

          if(librarykeys?.length > 0){
            const findingNovels = await db.collection("Novels")
            .where(firestore.FieldPath.documentId() ,'in', librarykeys)
            .get();
  
            const novelDocs = findingNovels.docs.map(doc => ({id: doc.id ,...doc.data()}))
            dispatch(setMylibrary({book : novelDocs}))
          }
        } catch (error) {
          console.log("fetching Library content failed" , error)
        }
      };


      const getCategoryAndDispatch = async () => {
        try {
            const getcategory = await db.collection('Category').get()
            const categorydocs = getcategory.docs.map(doc => ({id : doc.id , ...doc.data()}))
           
            dispatch(setCategory({category : categorydocs}));

          } catch (error) {
            console.error('Error fetching Category', error);
        }
    };
  

      const getBookmarks = async(uid) :Promise<void> => {
        try{
          const getuserkeys = db.collection('Users').doc(uid);
          const getbookmarks = await getuserkeys.collection('Bookmark').orderBy('date' ,'desc').get();
    
          const bookmarkKeys = getbookmarks.docs.map(doc => ({id : doc.id , novelDoc : doc.data().novelDoc , date : doc.data().date}))
          
          if(bookmarkKeys?.length > 0){
            const novelDocsMap = await Matchingbookmarks(bookmarkKeys);
            const Mybooks = bookmarkKeys.map((bookdoc:any) => {
              const doc = novelDocsMap.get(bookdoc.novelDoc)?.data();
              return {
                  docid : bookdoc.id,
                  id : bookdoc.novelDoc,
                  date : bookdoc.date,
                  ...doc
              }
            });
  
            dispatch(setMybookmarks({slot : Mybooks , dockey : bookmarkKeys}));
          }
        
          
        }catch(error){
          console.log('Failed to fetching Bookmarks', error)
        }
      }
  
      
      const Matchingbookmarks = async (bookmarkKeys:any) : Promise<T> => {
          const getNovels = await db.collection('Novels').where(firestore.FieldPath.documentId(), 'in' , bookmarkKeys.map(doc => doc.novelDoc)).get();
          const novelDocs = getNovels.docs.map(doc => ({id:doc.id, ...doc.data()}))
  
          const novelDocsMap = new Map(getNovels?.docs.map(doc => [doc.id , doc]))

          return novelDocsMap;
      }

      const setupMessageToken = async (uid:string) => {
        try{
          await messaging().registerDeviceForRemoteMessages();
          const token = await messaging().getToken();
        
          await firestore().collection('Users').doc(uid).update({message_token : token});
        }catch(error){
          console.log('failed to get Token from device' , error)
        }
       
      }


      useEffect(() => {
          LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
          console.log("Fetching")
          getMostviewAndDispatch();
      }, [refreshing]);

      useEffect(() => {
        getHotNewAndDispatch();
      } ,[refreshing])

      useEffect(() => {
        getTopNewAndDispatch();
      } , [refreshing])
      
      useEffect(() => {
        getUserandDispatch();
      },[Auth.currentUser])

      useEffect(() => {
        getCategoryAndDispatch();
      })



      const onDisplayNotification = async (notification:any) => {
         await notifee.requestPermission();

         const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });

        await notifee.displayNotification({
          title: 'Nobelist',
          body: notification.title,
          android: {
            channelId,
            largeIcon : notification.image,
            smallIcon: 'ic_small_icon', // optional, defaults to 'ic_launcher'.
            color: '#000000',
    
            pressAction: {
              id: 'default',
            },
          },

          ios: {
            attachments: [
              {
                url: 'local-image.png',
                thumbnailHidden: true,
              },
              {
                url: 'notification.image',
              },
            ],
          },
        });
      }

      useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('A new FCM message arrived!');
      
          if(AppState.currentState === "active"){
            onDisplayNotification({
              title : remoteMessage.data?.title,
              image : remoteMessage.data?.icon
            });
            if(!userdata?.length > 0) {
              console.log("Not found Any users.")
              return

            }
            const useritem = userdata[0];
            const id_list = [remoteMessage.data?.target];

            // can change later when we need to send multiple device;
            const getuser = db.collection('Users').doc(remoteMessage.data?.target);
            const getNotification = getuser.collection('Notification');
            const timestamp = firestore.FieldValue.serverTimestamp();
            
            const Notify_updated = await getuser.update({notify : firestore.FieldValue.increment(1)})
            const Notify_task = {
              title : remoteMessage.data?.title,
              date:  timestamp,
              type : remoteMessage.data?.type,
              image : remoteMessage.data?.icon,
              project : remoteMessage.data?.project
            }
            
            if(remoteMessage.data?.type === 'follow'){
              Notify_task['user_id'] = remoteMessage.data?.id;
            }

            const Notification_insert = await getNotification.add(Notify_task);

            dispatch(setUser([{notify : useritem.notify += 1  ,...useritem}]))
            console.log("Success To Add notification" ,Notification_insert.id)
            
          }
     
        });
      
        return unsubscribe;
      }, [userdata]);

  return (
    <Box bg = {theme.Bg.base} flex = {1} position = 'relative'>
        
        {userdata?.length > 0 &&
          <MemorizedIndexnavigation 
          scrollY={scrollY}
          notify = {userdata[0].notify}
          leftElement = {
            <Text
            fontSize={'2xl'}
            fontWeight={'bold'}
            color={theme.Icon.static}
            >Nobelist
            </Text>     
          }

          rightElement = {[
            {id: 1 , icon: <AntdesignIcon  name = 'search1' color = {theme.Icon.static} size = {18} /> , navigate : 'Search'} ,
            {id: 2 ,icon: <IonIcon  name = 'notifications' color = {theme.Icon.static} size = {18} /> , navigate : 'Notification'}
          ]}
          />
        }
        
        {CollectionTopNew.length > 0 || CollectionTopNew ?
                <FlatList onScroll={scrollHandler} refreshing = {refreshing} setRefreshing={setRefreshing}>
                   
                    <VStack flex = {1}>
                        <MemorizedIndexheaderitem
                         collections={CollectionMostview}
                         isLoading = {isLoading.heading}
                         />
                        <VStack  pl = {3} mt = {4}>
                            <MemorizedCollectionField
                            title="Hot New Novels"
                            collections={CollectionHotNew}
                            isLoading = {isLoading.top}
                            />
                            <MemorizedCollectionField
                            title="Top new Novels"
                            collections={CollectionTopNew}
                            isLoading = {isLoading.second}
                            />
                        </VStack>
                    </VStack>
                </FlatList>      
            :null 
      }
    </Box>
  )
}

export default Index;