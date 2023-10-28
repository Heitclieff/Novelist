import React,{useContext , useEffect, useState} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { Box , Text, VStack } from 'native-base';
import { useSharedValue , useAnimatedScrollHandler } from 'react-native-reanimated';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
import {LogBox} from 'react-native';
//@Redux tools
import { useDispatch , useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../systems/redux/reducer';
import { fetchHotNew, fetchMostview, fetchTopNew, setUser , setMylibrary ,setMybookmarks } from '../../systems/redux/action';

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
    const db = firestore()
    const theme:any = useContext(ThemeWrapper);
    const scrollY = useSharedValue(0);
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })
    
    const [CollectionMostview , setCollectionMostview] = useState<any[]>([]);
    const [CollectionHotNew , setCollectionHotNew] = useState<any[]>([])
    const [CollectionTopNew  , setCollectionTopNew] = useState<any[]>([]);
    const [isReduxLoaded, setisReduxLoaded] = useState<Boolean>(false)

    
    const getTopNewAndDispatch = async () => {
        try {
          const snapshortTop = await db.collection('Novels').orderBy('createAt', 'desc').limit(10).get()
          setCollectionTopNew(snapshortTop.docs)
          setisReduxLoaded(true)
        } catch (error) {
          console.error('Error fetching Top New novels:', error);
        }
      };
    
      const getHotNewAndDispatch = async () => {
        try {
          const snapshortHot = await db.collection('Novels').orderBy('createAt', 'desc').limit(10).get();
          setCollectionHotNew(snapshortHot.docs)
          // newestNovels.sort((a, b) => b.view - a.view);
        } catch (error) {
          console.error('Error fetching hot new novels:', error);
        }
      };
      
      const getMostviewAndDispatch = async () => {
        try {
          const snapshortMost = await db.collection('Novels').orderBy('view', 'desc').limit(10).get();
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
        const userDoc = ['zjoWzRuP6bWgjjhVCiEe8936GVi1','R68kRovUlSMsLyKo5spUTCh2qav2','hIAHTZB9SFb5nZi0YMhX7bIVyHw2']
        const userImage = ["https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/4.png?alt=media&token=8c828f11-f677-4d97-ae5b-8a4c56da6030&_gl=1*6p2zhp*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5Njk0MjM3OS4yOC4xLjE2OTY5NDY3OTguMTMuMC4w",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/user-image%2Fu2.jpg?alt=media&token=e72f2c9b-6ad1-40a4-a766-43da5795d6e6&_gl=1*1eem61o*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjg2NjUuMzAuMC4w",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/user-image%2Fu3.jpg?alt=media&token=4abdc5c3-e609-4858-9b1e-bea0a97b092f&_gl=1*d3mzr2*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjg2ODIuMTMuMC4w",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/user-image%2Fbg1.jpg?alt=media&token=2e6ea37f-522e-44b7-b095-879eeb717596&_gl=1*84dg12*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjg3MzEuMzYuMC4w",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/user-image%2Fbg2.jpg?alt=media&token=d8c0bc35-06ce-4363-ae6e-5ec60e30f0a1&_gl=1*1qbs0dv*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjg3NDkuMTguMC4w",
                           "https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/user-image%2Fbg3.jpg?alt=media&token=33b66eb1-8064-4556-bf14-90a47048a25e&_gl=1*1dau9vy*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjg3NjEuNi4wLjA."
                          ]
        const novelImage = ["https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn1.jpg?alt=media&token=b3ecdab7-8a34-4fd7-b5a9-4dcfba341fd3&_gl=1*zg81sw*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkwNzAuNTUuMC4w",
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn2.jpg?alt=media&token=3ba49180-1c81-4148-90d3-f42b4c77b3d0&_gl=1*8mazps*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkwODguMzcuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn15.jpg?alt=media&token=b643278c-a071-455a-8c99-f0f583f62817&_gl=1*12ty366*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMzMjE3MC4xNi4xLjE2OTYzMzM3MjMuMTcuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn4.jpg?alt=media&token=771230bd-370a-4ccf-9e0f-3bfe56814e3d&_gl=1*wjs9uf*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxMTAuMTUuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn5.jpg?alt=media&token=e9e1e7d6-6ba4-4286-aba7-bbad4a44e32b&_gl=1*17zb8vs*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxMjAuNS4wLjA.',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn14.jpg?alt=media&token=d4919ed2-719e-4e3e-9153-d49488796475&_gl=1*1cxhutt*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMzMjE3MC4xNi4xLjE2OTYzMzM1MzMuMjEuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn7.jpg?alt=media&token=1bf548f5-1f70-46a5-8668-afbc330782cc&_gl=1*1nqezxu*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxNDAuNDkuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn8.jpg?alt=media&token=500c5bdd-3c4d-4bf8-8a21-91d5f895d8f4&_gl=1*4a45ed*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxNTAuMzkuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn9.jpg?alt=media&token=f89327a0-1d99-4790-9abc-8be2564e76c5&_gl=1*1tt1hjs*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxNjIuMjcuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn10.jpg?alt=media&token=1db89af2-6b9a-4ce8-9a95-432861b586b2&_gl=1*1pq6eae*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxNzkuMTAuMC4w',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn11.jpg?alt=media&token=da70d09a-7be2-4f19-a0a6-5ccb80404b40&_gl=1*42b3h4*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxODguMS4wLjA.',
                            'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fn12.jpg?alt=media&token=bce9c1c4-2878-41df-89da-639929d9892f&_gl=1*12tpawx*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjMyNTY2NC4xNS4xLjE2OTYzMjkxOTYuNjAuMC4w'
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
        
        const novel_status = [true,false]
        const project_status = ['Complete', 'Not Complete']
        const commit_status = [true,false]
        // const novelDoc_list = []
        const chapter_status = [true,false]
        const tag_list = ['ระบบ','เกิดใหม่','คลั่งรัก','ซอมบี้','ย้อนเวลา','หักหลัง','ครอบครัว','ตลก','เวททนตร์','ตำนาน','เรื่องเล่า','เกมส์']
        const tag_list2 = ['อาหาร','เทพ','สู้ชีวิต','ปลูกผัก','นางเอกฉลาด','พระเอกเก่ง','อบอุ่น','มนตรา','กำลังภายใน','หมอ','ย้อนยุค','เอาชีวิตรอด']
        const rating_list = ['12+', 'เด็ก', 'ผู้ใหญ่']
        // const project_list = []
        const comment_status = [true, false]
        const libra_type = ['Bought','History','like','library']
        const like_list = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100))
        const view_list = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100))
        let n = 0
        let tag1 = []
        let tag2 = []
        let cateGroup1 = [], cateGroup2 = [], cateGroup3 = [], cateGroup4 = [], cateGroup5 = [], cateGroup6 = []

        for (let i=0; i < tag_list.length; i++) {
          await db.collection('Tags').add({
            title: tag_list[i],
            addAt: new Date()
          })
        }
        for (let i=0; i < tag_list.length; i++) {
          await db.collection('Tags').add({
            title: tag_list2[i],
            addAt: new Date()
          })
        }
        for (let i=0; i < rating_list.length; i++) {
          await db.collection('Rates').add({
            title: rating_list[i],
            addAt: new Date()
          })
        }
        const mainTagRef = db.collection('Tags')
        let x = 0
        
        const snapMainTag = await mainTagRef.get().then((snap)=>{
          snap.forEach((doc)=>{
            let data = doc.data()
            let title = data.title
            if (x%2===0) {
              tag1.push(doc.id)
            } else {
              tag2.push(doc.id)
            }
            if (title === 'ระบบ' || title === 'พระเอกเก่ง' || title === 'กำลังภายใน' || title === 'สู้ชีวิต' || title === 'อบอุ่น' || title === 'มนตรา') {
              cateGroup1.push(doc.id)
            } else if (title === "ครอบครัว" || title === 'เรื่องเล่า') {
              cateGroup2.push(doc.id)
            } else if (title === 'เวททนตร์' || title === 'เกิดใหม่' || title === 'ซอมบี้' || title === 'ย้อนเวลา' || title === 'เกมส์' || title === 'อาหาร' || title === 'เทพ' || title === 'ปลูกผัก') {
              cateGroup3.push(doc.id)
            } else if (title === 'ตลก') {
              cateGroup4.push(doc.id)
            } else if (title === "คลั่งรัก" || title === "นางเอกฉลาด" || title === 'หมอ' || title === 'ย้อนยุค') {
              cateGroup5.push(doc.id)
            } else {
              cateGroup6.push(doc.id)
            }
            x++
          })
          
        })
        let allGroup = [cateGroup1,cateGroup2,cateGroup3,cateGroup4,cateGroup5,cateGroup6]
        for (let i=0; i < cate.length; i++){
          await db.collection('Category').doc(cate[i]).set(
            {
              image: cate_link[i],
              group: allGroup[i]
            }
          )
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
            description: `descrip ${i+1}`,
            following: 0,
            follower: 0,
            project: []
          };
          const mainUserRef = db.collection('Users')
          const mainUserdocRef = mainUserRef.doc(userDoc[i])
          await mainUserdocRef.set(userData)
          const mainScoreRef = db.collection('Scores')
          const mainScoreDocRef = mainScoreRef.doc(userDoc[i])
          mainScoreDocRef.set({
            sum: 0,
            totalbook: 0,
            score: 0,
            username: userName[i],
            image: userImage[i],
          })
          for (let j = 0; j < 3; j++) {
            let novelData = {
              title: `novelTestData ${n+1}`,
              image: novelImage[n],
              overview: `this novel is created for test data ${i+1}`,
              like: like_list[n],
              view: view_list[n],
              status: novel_status[n%2],
              createAt: new Date(),
              lastUpdate: new Date(),
              owner: mainUserdocRef.id,
              cateDoc: cate[n%6],
              comment_status: comment_status[n%2],
              commit_status: commit_status[n%2],
              rating: rating_list[n%3],
              tagDoc: [tag1[n%12],tag2[n%12]],
              multiproject: false,
            }
            
            let increment = like_list[n] + view_list[n]
            await mainScoreDocRef.update({ sum: firestore.FieldValue.increment(increment) });
            await mainScoreDocRef.update({ totalbook: firestore.FieldValue.increment(1) });
            n++

            const mainNovelRef = db.collection('Novels')
            const mainNovelDocRef = mainNovelRef.add(novelData).then(async(novelDoc) => {
              // console.log('novelDoc',novelDoc.id)
              await mainUserdocRef.update({
                project: firestore.FieldValue.arrayUnion(novelDoc.id)
              });
              const mainDocRef = db.collection('Novels').doc(novelDoc.id)
              const creatorRef = mainDocRef.collection('Creator').doc(userDoc[i])
              await creatorRef.set({
                userDoc: userDoc[i],
                pf_image: userImage[i],
                username: userName[i],
                pending: false,
                addAt: new Date()
              })
              const chapterdocRef = mainDocRef.collection('Chapters')
              for (let a=0; a<4;a++) {
                let chapData = {
                  chap_id: `${a+1}`,
                  title: `Chapter title ${a+1}`,
                  // content: `lorem asdpoajpo  oajspojfp mem paofn paon ${a+1}`,
                  image: userImage[i],
                  status: chapter_status[a%2],
                  updateAt: new Date(),
                  createdBy: mainUserdocRef.id,
                  updatedBy: mainUserdocRef.id,
                  access: [mainUserdocRef.id]
                }
                await chapterdocRef.add(chapData).then(async(ref) => {
                  const contentDocRef = chapterdocRef.doc(ref.id)
                  const contentRef = contentDocRef.collection('Content')
                  await contentRef.add({
                    content: `lorem asdpoajpo  oajspojfp mem paofn paon ${a+1}`,
                  })
                })
                // const contentRef = chapterdocRef.collection('Content')
              }
              if (j < 1) {
                const bmUserRef = mainUserdocRef.collection('Bookmark')
                const bmUserdocRef = await bmUserRef.add({
                  novelDoc: novelDoc.id,
                  image: novelImage[0],
                  title: `novelTestData ${n+1}`,
                  date: new Date()
                })
                const liUserRef = mainUserdocRef.collection('Library')
                const liUserdocRef = await liUserRef.add({
                  novelDoc: novelDoc.id,
                  type: libra_type[i%4],
                  date: new Date()
                })
              }
              
            })
          }
        }
        let img_link = 'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/novel-image%2Fnx.jpg?alt=media&token=03959a8c-9dec-4011-863e-ed784227f24d&_gl=1*9en78j*_ga*MTQzNjExMjI3OS4xNjk2MDUyOTM3*_ga_CW55HF8NVT*MTY5NjkzODY0NC4yNy4xLjE2OTY5MzkwMTMuNDcuMC4w'
        // console.log('userDoc',userDoc[2],'img_link',img_link)
        let novelData = {
          title: 'novelTestData Extra',
          image: img_link,
          overview: 'this novel is created for test data Extra',
          like: 1000,
          view: 1000,
          status: novel_status[0],
          createAt: new Date(),
          lastUpdate: new Date(),
          owner: userDoc[0],
          cateDoc: cate[2],
          comment_status: comment_status[0],
          commit_status: commit_status[0],
          rating: rating_list[0],
          tagDoc: [tag1[2],tag2[2]],
          multiproject: true,
        }
        const extraNovelRef = db.collection('Novels')
        // console.log('extra',extraNovelRef)
        const extraNovelDocRef = extraNovelRef.add(novelData).then(async(novelDoc) => {
          console.log('novelDoc',novelDoc.id)
          await db.collection('Users').doc(userDoc[0]).update({
            project: firestore.FieldValue.arrayUnion(novelDoc.id)
          });
          await db.collection('Users').doc(userDoc[2]).update({
            project: firestore.FieldValue.arrayUnion(novelDoc.id)
          });
          
          const mainDocRef = db.collection('Novels').doc(novelDoc.id)
          const creatorRef = mainDocRef.collection('Creator')
          await creatorRef.add({
            userDoc: userDoc[0],
            pf_image: userImage[0],
            username: userName[0],
            pending: false,
            addAt: new Date()
          })
          await creatorRef.add({
            userDoc: userDoc[2],
            pf_image: userImage[2],
            username: userName[2],
            pending: false,
            addAt: new Date()
          })
          const chapterdocRef = mainDocRef.collection('Chapters')
          for (let a=0; a<4;a++) {
            if (a%2 ==0) {
              let chapData = {
                chap_id: `${a+1}`,
                title: `Chapter title ${a+1}`,
                content: `lorem asdpoajpo  oajspojfp mem paofn paon ${a+1}`,
                image: userImage[0],
                status: chapter_status[a%2],
                updateAt: new Date(),
                updatedBy: userDoc[0]
              }
              await chapterdocRef.add(chapData)
            } else {
              let chapData = {
                chap_id: `${a+1}`,
                title: `Chapter title ${a+1}`,
                content: `lorem asdpoajpo  oajspojfp mem paofn paon ${a+1}`,
                image: userImage[2],
                status: chapter_status[a%2],
                updateAt: new Date(),
                updatedBy: userDoc[2]
              }
              await chapterdocRef.add(chapData)
            }
          }
        })
        await db.collection('Users').doc(userDoc[0]).update({ following: firestore.FieldValue.increment(1) });
        await db.collection('Users').doc(userDoc[2]).update({ follower: firestore.FieldValue.increment(1) });

        await db.collection('Users').doc(userDoc[1]).update({ following: firestore.FieldValue.increment(2) });
        await db.collection('Users').doc(userDoc[0]).update({ follower: firestore.FieldValue.increment(1) });
        await db.collection('Users').doc(userDoc[2]).update({ follower: firestore.FieldValue.increment(1) });
        
        await db.collection('Users').doc(userDoc[2]).update({ following: firestore.FieldValue.increment(1) });
        await db.collection('Users').doc(userDoc[1]).update({ follower: firestore.FieldValue.increment(1) });
        const mainUserRef = db.collection('Users')
        const mainUserdocRef0 = mainUserRef.doc(userDoc[0])
        const mainUserdocRef1 = mainUserRef.doc(userDoc[1])
        const mainUserdocRef2 = mainUserRef.doc(userDoc[2])
        
        const mainFollow0 = mainUserdocRef0.collection('Follows');
        const mainFollow1 = mainUserdocRef1.collection('Follows');
        const mainFollow2 = mainUserdocRef2.collection('Follows');
        const followDataUser0 = {
          following: [userDoc[2]],
          follower: [userDoc[1]]
        };
        const followDataUser1 = {
          following: [userDoc[0], userDoc[2]],
          follower: [userDoc[2]]
        };
        const followDataUser2 = {
          following: [userDoc[1]],
          follower: [userDoc[0],userDoc[1]]
        };
        mainFollow0.add(followDataUser0);
        mainFollow1.add(followDataUser1);
        mainFollow2.add(followDataUser2);
        const mainScoreRef = db.collection('Scores')
        const snapScoreDoc = await mainScoreRef.get()
        console.log(snapScoreDoc.docs)
        console.log('Done adding data')
      }
      const test = async () => {
        // auth().signInWithEmailAndPassword('testData1@gmail.com', 'testData')
        const collection_list = ['Tags','Category','Follows','Rates','Scores',"Leaderboards"]
        const usersCollectionRef = await db.collection('Users').get();

        usersCollectionRef.forEach(async (userDoc) => {
          const userBookmarkCollectionRef = await userDoc.ref.collection('Bookmark').get();
          userBookmarkCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });
          const userLibraryCollectionRef = await userDoc.ref.collection('Library').get();
          userLibraryCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });

          const userFollowsCollectionRef = await userDoc.ref.collection('Follows').get();
          userFollowsCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });
          try {
            await userDoc.ref.delete()
          } catch(e) {
            console.log(e)
          }
        })


        const novelsCollectionRef = await db.collection('Novels').get();

        novelsCollectionRef.forEach(async (novelDoc) => {
          const novelChaptersCollectionRef = await novelDoc.ref.collection('Chapters').get();
          novelChaptersCollectionRef.forEach(async (subDoc) => {
            const contentCollectionRef = await subDoc.ref.collection("Content").get();
            contentCollectionRef.forEach(async (subCol)=> {
              await subCol.ref.delete();
            })
            await subDoc.ref.delete();
          });
          const novelCreatorsCollectionRef = await novelDoc.ref.collection('Creator').get();
          novelCreatorsCollectionRef.forEach(async (subDoc) => {
            await subDoc.ref.delete();
          });
          try {
            await novelDoc.ref.delete()
          } catch(e) {
            console.log(e)
          }
        })

        for (let colList of collection_list) {
          // console.log(colList)
          const colSnap = db.collection(colList)
          const querySnapshot = await colSnap.get();
          querySnapshot.forEach((doc) => {
            try {
              doc.ref.delete();
              // console.log('deleted',doc.ref)
            } catch(e) {
              console.log(e)
            }
            
          });
        }
        console.log('Done deleting data')
      }
      const getUserandDispatch = async () => {
        // console.log('test')
        // await auth().signInWithEmailAndPassword('testData1@gmail.com','testData')
        // await auth().signOut()
        let uid = auth().currentUser.uid
        const snapUserData = await db.collection('Users').doc(uid).get()
        // console.log('menu', snapUserData.data())
        let userData = [{ id: snapUserData.id, ...snapUserData.data() }]
        // console.log('redux menu',userData)
        dispatch(setUser(userData))
        getLibraryContent(uid);
        getBookmarks(uid);
        
//         const userDocRef = db.collection('Users').doc(uid)
//         const bookMarkRef = userDocRef.collection('Bookmark')
//         const snapBMdata = await bookMarkRef.get()
//         const snapbmdatanovel = snapBMdata.docs[0].data()
//         // console.log(snapbmdatanovel)
//         const novelDocRef = db.collection('Novels').doc(snapbmdatanovel.novelDoc)
//         const snapcreatorRef = novelDocRef.collection('Creator')
//         const snapcreatorData = await snapcreatorRef.get()
//         const creatorData = snapcreatorData.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         const bookMarkdata = snapBMdata.docs.map(doc => ({ id: doc.id, ...doc.data(), creator: creatorData }));
//         dispatch(setBookmark(bookMarkdata))
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

      const ab = async () => {
        // const mainTagRef = db.collection('Tags')
        // const snapMainTag = await mainTagRef.get().then((snap)=>{
        //   snap.forEach((doc)=>{
        //     let data = doc.data()
        //     console.log(data.title)
        //   })})

        const mainNullRef = db.collection('Null')
        mainNullRef.add({ ab: 'ab' }).then((ref)=>{
          console.log('ab', ref.id)
        })
      }

      const getLibraryContent = async (uid):Promise<T> => {
        try {
          // fixed userdata to Object
          const snapshotusers = firestore().collection("Users").doc(uid)
          const getlibrarykeys = await snapshotusers.collection("Library").get();
          const librarykeys = getlibrarykeys.docs.map(doc => doc.data().novelDoc);

          const findingNovels = await firestore().collection("Novels")
          .where(firestore.FieldPath.documentId() ,'in', librarykeys)
          .get();

          const novelDocs = findingNovels.docs.map(doc => ({id: doc.id ,...doc.data()}))
          dispatch(setMylibrary({book : novelDocs}))
        } catch (error) {
          console.log("fetching Userdata failed" , error)
        }
      };

      const getBookmarks = async(uid) :Promise<void> => {
        try{
          const getuserkeys = firestore().collection('Users').doc(uid);
          const getbookmarks = await getuserkeys.collection('Bookmark').orderBy('date' ,'desc').get();
    
          const bookmarkKeys = getbookmarks.docs.map(doc => ({id : doc.id , novelDoc : doc.data().novelDoc , date : doc.data().date}))
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
          
        }catch(error){
          console.log('Failed to fetching Bookmarks', error)
        }
      }
  
      const Matchingbookmarks = async (bookmarkKeys:any) : Promise<T> => {
          const getNovels = await firestore().collection('Novels').where(firestore.FieldPath.documentId(), 'in' , bookmarkKeys.map(doc => doc.novelDoc)).get();
          const novelDocs = getNovels.docs.map(doc => ({id:doc.id, ...doc.data()}))
  
          const novelDocsMap = new Map(getNovels?.docs.map(doc => [doc.id , doc]))

          return novelDocsMap;
      }

      useEffect(() => {
        if (!isReduxLoaded) {
          LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
          // test()
          // allData()
          getMostviewAndDispatch();
          getHotNewAndDispatch();
          getTopNewAndDispatch();
        }
      }, [isReduxLoaded]);

      useEffect(() => {
        getUserandDispatch();
      },[])

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