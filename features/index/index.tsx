import React,{useContext , useEffect} from 'react'
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
// import { getCollectionsDataShowcase } from '../../systems/redux/action';
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
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const CollectionMostview = useSelector((state:any) => state.collectionMostview)
    const CollectionHotNew = useSelector((state:any) => state.collectionHotNew)
    const CollectionTopNew = useSelector((state:any) => state.collectionTopNew)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollectionTopNewLoaded);

    const getTopNewAndDispatch = async () => {
        try {
          const snapshotnt = await firestore().collection('Novels').orderBy('createAt', 'desc').get()
          const topnewData = [];
          for (const doc of snapshotnt.docs) {
            const createdAt = doc.data().createAt.toDate();
            const lastUpdate = doc.data().lastUpdate.toDate();
            const creater = [];

            const projectSnapshot = await firestore().collection('Projects').where('novelDoc', '==', doc.id).get();
            for (const projectDoc of projectSnapshot.docs) {
              const userDocs = projectDoc.data().creater;
              for (const user of userDocs) {
                await firestore().collection('Users').doc(user).get().then((uData) => {
                  const data = uData.data()
                  creater.push({ id: user, username: data.username, image: data.pf_image });
                })
              }
              const image = projectDoc.data().image;
              topnewData.push({ id: doc.id, ...doc.data(), createAt: createdAt, creater: creater, images: image, lastUpdate: lastUpdate });
            }
          }
          // const query = await firestore().collection('Likes').where('novelDoc', '==', id).where('userDoc', '==', uid).get()
          // console.log('data', updatedData)
          dispatch(fetchTopNew(topnewData));  
        } catch (error) {
          console.error('Error fetching Top New novels:', error);
        }
      };
    
      const getHotNewAndDispatch = async () => {
        try {
          const snapshot = await firestore().collection('Novels').orderBy('createAt', 'desc').limit(10).get();
          const newestNovels = [];
          for (const doc of snapshot.docs) {
            const lastUpdate = doc.data().lastUpdate.toDate();
            const createdAt = doc.data().createAt.toDate();
            const creater = [];
            const projectSnapshot = await firestore().collection('Projects').where('novelDoc', '==', doc.id).get();
            for (const projectDoc of projectSnapshot.docs) {
              const userDoc = projectDoc.data().creater;
              for (const user of userDoc) {
                await firestore().collection('Users').doc(user).get().then((uData) => {
                  const data = uData.data()
                  creater.push({ id: user, username: data.username, image: data.pf_image });
                })
              }
              const image = projectDoc.data().image;
              newestNovels.push({ id: doc.id, ...doc.data(), createAt: createdAt, creater: creater, images: image, lastUpdate: lastUpdate });
            }
          }
          newestNovels.sort((a, b) => b.view - a.view);
          dispatch(fetchHotNew(newestNovels));
        } catch (error) {
          console.error('Error fetching hot new novels:', error);
        }
      };
      
      const getMostviewAndDispatch = async () => {
        try {
          const snapshotmv = await firestore().collection('Novels').orderBy('view', 'desc').get();
          const mostviewData = [];

          for (const doc of snapshotmv.docs) {
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
              mostviewData.push({ id: doc.id, ...doc.data(), createAt: createdAt, creater: creater, images: image });
            }
          }
          dispatch(fetchMostview(mostviewData));  
        } catch (error) {
          console.error('Error fetching most view novels:', error);
        }
      };
      
      const allData = async () => {
        const email = ['testData1@gmail.com','testData2@gmail.com','testData3@gmail.com']
        const pass = 'testData'
        const userName = ['PK1','PK2','PK3']
        const userDoc = []
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
        for (let i=0; i < cate.length; i++){
          await firestore().collection('Categories').doc(cate[i]).set(
            {
              image: cate_link[i]
            }
          )
        }
        
        // add 3 users
        for (let i=0; i < email.length; i++) {
          await auth().createUserWithEmailAndPassword(email[i], pass).then((user) => {
            userDoc.push(user.user.uid)
            const data = {
              email: email[i],
              password: pass,
              username: userName[i],
              bg_image: userImage[i],
              pf_image: userImage[i],
              phone: '033235131',
              birthDate: new Date(),
              createAt: new Date(),
              description: `descrip ${i}`
            };
            firestore().collection('Users').doc(user.user.uid).set(data)
          })
        }

        // add novel and 4 chapters each for each user
        for (let j=0; j < 3; j++) {
          await firestore().collection('Novels').add(
            {
              title: `novelTestData ${j+1}`,
              image: novelImage[j],
              overview: `this novel is created for test data ${j+1}`,
              like: 10*j/2,
              view: 100*2/j,
              status: novel_status[j%2],
              createAt: new Date(),
              lastUpdate: new Date()
            }
          ).then((novelDoc) => {
            let spl = novelDoc.split('/')
            novelDoc_list.push(spl)
            let proData = {
              name: `Project name ${j}`,
              overview: `Project overview ${j}`,
              image: novelImage[j],
              rating: "12+",
              comment_status: 'Public',
              project_status: project_status[j%2],
              commit_status: commit_status[j%2],
              creater: [userDoc[j]],
              owner: userDoc[j],
              novelDoc: spl
            }
            firestore().collection('Projects').add(proData)
            for (let i=0; i < 4; i++) {
              let chapData = {
                novelDoc: novelDoc,
                title: `Chapter title ${i}`,
                image: userImage[j],
                status: chapter_status[j%2],
                updateAt: new Date()
              }
              firestore().collection('Chapters').add(chapData)
            }
          })
        }
        
        for (let i=0; i < userDoc.length; i++) {
          const dates = Array(novelDoc_list.length).fill(new Date());
          let bm = {
            novelDoc: novelDoc_list.filter((index) => index !== i),
            dates: dates.filter((index) => index !== i),
          }
          await firestore().collection('BookMarks').doc(userDoc[i]).set(bm)
        }
      }
      const test = async () => {
        auth().signInWithEmailAndPassword('testData1@gmail.com', 'testData')
        
      }
      useEffect(() => {
        if (!isReduxLoaded) {
          // Fetch data from Firestore and dispatch the action
          getMostviewAndDispatch();
          getHotNewAndDispatch();
          getTopNewAndDispatch();
          // allData()
          // test()
        }
      }, [dispatch, isReduxLoaded]);

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