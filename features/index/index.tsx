import React,{useContext , useEffect, useState} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { Box , Text, VStack } from 'native-base';
import { useSharedValue , useAnimatedScrollHandler } from 'react-native-reanimated';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
//@Redux tools
import { useDispatch , useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../systems/redux/reducer';
import { fetchHotNew, fetchMostview, fetchTopNew } from '../../systems/redux/action';
//@Components
import Indexheader from './header/Indexheader';
//@Layouts
import { Indexnavigation } from '../../components/navigation/Indexnavigation';
import CollectionsField from './components/Collectionsfield';

//firebase 
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const MemorizedIndexnavigation = React.memo(Indexnavigation);
const MemorizedIndexheaderitem = React.memo(Indexheader);
const MemorizedCollectionField = React.memo(CollectionsField);

const Index : React.FC = () => {
    const theme:any = useContext(ThemeWrapper);
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })
    
    const [CollectionMostview , setCollectionMostview] = useState<any[]>([]);
    const [CollectionHotNew , setCollectionHotNew] = useState<any[]>([])
    const [CollectionTopNew  , setCollectionTopNew] = useState<any[]>([]);
    
    // const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    // const isReduxLoaded = useSelector((state: RootState) => state.iscollectionTopNewLoaded);
    const [isReduxLoaded, setisReduxLoaded] = useState<Boolean>(false)

    const getTopNewAndDispatch = async () => {
        try {
          const snapshortTop = await firestore().collection('Novels').orderBy('createAt', 'desc').limit(10).get()
          setCollectionTopNew(snapshortTop.docs)
          setisReduxLoaded(true)
        } catch (error) {
          console.error('Error fetching Top New novels:', error);
        }
      };
    
      const getHotNewAndDispatch = async () => {
        try {
          const snapshortHot = await firestore().collection('Novels').orderBy('createAt', 'desc').limit(10).get();
          setCollectionHotNew(snapshortHot.docs)
          // newestNovels.sort((a, b) => b.view - a.view);
        } catch (error) {
          console.error('Error fetching hot new novels:', error);
        }
      };
      
      const getMostviewAndDispatch = async () => {
        try {
          const snapshortMost = await firestore().collection('Novels').orderBy('view', 'desc').limit(10).get();
          setCollectionMostview(snapshortMost.docs)
      
        } catch (error) {
          console.error('Error fetching most view novels:', error);
        }
      };
      
      const allData = async () => {
        // test()
        const email = ['testData1@gmail.com','testData2@gmail.com','testData3@gmail.com']
        const pass = 'testData'
        const userName = ['PK1','PK2','PK3']
        const userDoc = ['yFr0Nvd2uuVesrUvRTBGxPROQ463','cM6dlETlfKPGTPRPdgjDWHzzH0o1','1SyhXW6TeiWFGFzOWuhEqOsTOX23']
        const userImage = ["https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/images%2FKyxN5YqQ43bM0XH3LTuZ2GtRaYH3%2Ffile%3A%2Fdata%2Fuser%2F0%2Fcom.novelistapp%2Fcache%2Frn_image_picker_lib_temp_0c8fc886-c63c-4dae-8281-e3f8ca05a732.jpg?alt=media&token=3b80c84b-4139-41a8-ab5e-b23f596609b5",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/4.png?alt=media&token=8c828f11-f677-4d97-ae5b-8a4c56da6030",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/3.jpeg?alt=media&token=356ae7fd-5926-4248-aa06-7879c630deff"
                          ]
        const novelImage = ["https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/ca4.png?alt=media&token=a6692081-d5ad-4ab1-9efd-b3c1d43d70fd",
                            "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/ca1.png?alt=media&token=c58a2a91-b4fc-4913-8fc3-4cbd19a16b35",
                            "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/ca2.png?alt=media&token=ce3a39bc-b10d-40b7-ab0b-68e2999df2d6"
                           ]
        //add catagory
        const cate = ['Action', 'Drama', 'Fantasy', 'Comedy', 'Romantic', 'Horror']
        const cate_link = ["https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/category%2Faction.jpeg?alt=media&token=0e9362be-5973-4a48-a91c-d4075a7dcfb9",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/category%2Fdrama.jpeg?alt=media&token=2c9ee69c-9c5f-46de-864a-58972cee809a",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/category%2Ffantasy.jpg?alt=media&token=d2cacd51-57eb-48b6-b2c2-930ff54a5dc0",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/category%2Fcomedy.jpg?alt=media&token=078bcdde-9233-4fe7-a052-1b6f2ea9274b",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/category%2FRomantic.jpg?alt=media&token=7e6f6296-a4a1-4889-a118-daa66252b02f",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/category%2Fhorror.jpg?alt=media&token=99e63e8c-342d-4486-ab7d-76e68f1fbe2d"
                          ]
        
        const novel_status = ['Public', "Pivate"]
        const project_status = ['Complete', 'Not Complete']
        const commit_status = ['Yes', 'No']
        const novelDoc_list = []
        const chapter_status = ['Draft', 'All']
        const tag_list = ['ระบบ','เกิดใหม่','คลั่งรัก','ซอมบี้','ย้อนเวลา']
        const tag_list2 = ['ย้อนเวลา','ซอมบี้','คลั่งรัก','เกิดใหม่','ระบบ']
        const rating_list = ['12+', 'เด็ก', 'ผู้ใหญ่']
        const project_list = []
        const comment_status = ['Public','Private']
        const libra_type = ['Bought','History','like']
        const like_list = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100))
        const view_list = Array.from({ length: 3 }, () => Math.floor(Math.random() * 100))
        
        for (let i=0; i < cate.length; i++){
          await firestore().collection('Category').doc(cate[i]).set(
            {
              image: cate_link[i]
            }
          )
        }
        for (let i=0; i < tag_list.length; i++) {
          await firestore().collection('Tags').doc(tag_list[i]).set({})
        }
        for (let i=0; i < rating_list.length; i++) {
          await firestore().collection('Tags').doc(rating_list[i]).set({})
        }
        // const createUser = await auth().createUserWithEmailAndPassword(email[1], pass)
        for (let i=0; i < email.length; i++) {
          // const createUser = await auth().createUserWithEmailAndPassword(email[i], pass)
          const userData = {
            email: email[i],
            username: userName[i],
            bg_image: userImage[i],
            pf_image: userImage[i],
            phone: '033235131',
            birthDate: new Date(),
            createAt: new Date(),
            description: `descrip ${i+1}`
          };
          const mainUserRef = firestore().collection('Users')
          const mainUserdocRef = mainUserRef.doc(userDoc[i])
          await mainUserdocRef.set(userData)
          console.log('mainUserdocRef', mainUserdocRef.id)
          
          let novelData = {
            title: `novelTestData ${i+1}`,
            image: novelImage[i],
            overview: `this novel is created for test data ${i+1}`,
            like: like_list[i],
            view: view_list[i],
            status: novel_status[i%2],
            createAt: new Date(),
            lastUpdate: new Date(),
            creators: [mainUserdocRef.id],
            owner: mainUserdocRef.id,
            cateDoc: cate[i],
            comment_status: comment_status[i%2],
            commit_status: commit_status[i%2],
            rating: rating_list[i%3],
            tagDoc: [tag_list[i%5],tag_list2[i%5]]
          }

          const mainNovelRef = firestore().collection('Novels')
          const mainNovelDocRef = mainNovelRef.add(novelData).then(async(novelDoc) => {
            console.log('novelDoc',novelDoc.id)
            mainUserdocRef.update({
              project: [novelDoc.id]
            })
            const mainDocRef = firestore().collection('Novels').doc(novelDoc.id)
            const chapterdocRef = mainDocRef.collection('Chapters')
            for (let a=0; a<4;a++) {
              let chapData = {
                chap_id: `${a+1}`,
                title: `Chapter title ${a+1}`,
                content: `lorem asdpoajpo  oajspojfp mem paofn paon ${a+1}`,
                image: userImage[i],
                status: chapter_status[a%2],
                updateAt: new Date(),
                updatedBy: mainUserdocRef.id
              }
              await chapterdocRef.add(chapData)
            }
            const bmUserRef = mainUserdocRef.collection('Bookmark')
            const bmUserdocRef = await bmUserRef.add({
              novelDoc: [novelDoc.id],
              date: new Date()
            })
            const liUserRef = mainUserdocRef.collection('Library')
            const liUserdocRef = await liUserRef.add({
              novelDoc: [novelDoc.id],
              type: libra_type[i],
              date: new Date()
            })
          })
        }
      }
      const test = async () => {
        // auth().signInWithEmailAndPassword('testData1@gmail.com', 'testData')
        const collection_list = ['Tags','Category']
        const usersCollectionRef = await firestore().collection('Users').get();

        usersCollectionRef.forEach(async (userDoc) => {
          const userBookmarkCollectionRef = await userDoc.ref.collection('Bookmark').get();
          userBookmarkCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });
          const userLibraryCollectionRef = await userDoc.ref.collection('Library').get();
          userLibraryCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });
          try {
            await userDoc.ref.delete()
          } catch(e) {
            console.log(e)
          }
        })


        const novelsCollectionRef = await firestore().collection('Novels').get();

        novelsCollectionRef.forEach(async (novelDoc) => {
          const novelNovelsCollectionRef = await novelDoc.ref.collection('Chapters').get();
          novelNovelsCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });
          try {
            await novelDoc.ref.delete()
          } catch(e) {
            console.log(e)
          }
        })

        for (let colList of collection_list) {
          console.log(colList)
          const colSnap = firestore().collection(colList)
          const querySnapshot = await colSnap.get();
          querySnapshot.forEach((doc) => {
            try {
              doc.ref.delete();
              console.log('deleted',doc.ref)
            } catch(e) {
              console.log(e)
            }
            
          });
        }
      }
      useEffect(() => {
        if (!isReduxLoaded) {
          getMostviewAndDispatch();
          getHotNewAndDispatch();
          getTopNewAndDispatch();
        }
      }, [isReduxLoaded]);

  return (
    <Box bg = {theme.Bg.base} flex = {1} position = 'relative'>
        <MemorizedIndexnavigation 
        scrollY={scrollY}
        leftElement = {
          <Text
          fontSize={'2xl'}
          fontWeight={'bold'}
          color={theme.Icon.static}
          >Nobelist
          </Text>     
         }

         rightElement = {[
          {icon: <AntdesignIcon name = 'search1' color = {theme.Icon.static} size = {15} /> , navigate : 'Search'} ,
          {icon: <IonIcon name = 'notifications' color = {theme.Icon.static} size = {15} /> , navigate : 'Notification'}
        ]}
        />
        {isReduxLoaded && CollectionTopNew.length > 0 || CollectionTopNew ?
            <FlatList onScroll={scrollHandler}>
                <VStack flex = {1}>
                    <MemorizedIndexheaderitem collections={CollectionMostview}/>
                    <VStack  pl = {3} mt = {4}>
                        <MemorizedCollectionField
                        title="Hot New Novels"
                        collections={CollectionHotNew}
                        />
                        <MemorizedCollectionField
                        title="Top new Novels"
                        collections={CollectionTopNew}
                        />
                </VStack>
                </VStack>
            </FlatList>      
        :null }
    </Box>
  )
}

export default Index;