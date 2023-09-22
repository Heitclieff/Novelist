import React,{useContext, useEffect, useState} from 'react'
import { 
Box , 
VStack , 
Text , 
HStack } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { FlatList } from '../../components/layout/Flatlist/FlatList'
// import ContentNavigation from '../../../../components/[stack]/Novel/[container]/ContentNavigation'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { useRoute } from '@react-navigation/native'
import Chapternavigation from '../../components/navigation/Chapternavigation'

//firebase
import firestore from '@react-native-firebase/firestore'
import Chapter from '../creator/pages/chapter';

interface pageProps {}
const Readcontent : React.FC <pageProps> = () => {
     const theme:any = useContext(ThemeWrapper)
     const route = useRoute();
     const {p_id}:any = route.params
     const {title}:any = route.params


     const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
     const [novelItem, setnovelItem] = useState<any[]>([]);
     const [isReduxLoaded, setisReduxLoaded] = useState<boolean>(false);
     const [chapterItem, setchapterItem] = useState([])

     const getNovelItem = async () => {
          const novelItemSnap = await firestore().collection('Projects').where('novelDoc', '==', p_id).get()
          const novelItem_Data = []
          const chapter_Item = []
          for (const novelDoc of novelItemSnap.docs) {
            let docId = novelDoc.data().novelDoc
            const chapItem = await firestore().collection('Chapters').where('novelDoc', '==', docId).get().then((chap) => {
                // console.log('chap',chap)
                chap.forEach((doc) => {
                    // console.log('chap doc',doc)
                    const updateAt = doc.data().updateAt.toDate();
                    chapter_Item.push({ id: doc.id, ...doc.data(), updateAt: updateAt })
                })
            })
            const data = novelDoc.data().novelDoc
            const novelSnap = await firestore().collection('Novels').doc(p_id).get()
            const createdAt = novelSnap.data().createAt.toDate();
            const lastUpdate = novelSnap.data().lastUpdate.toDate();
            
            // console.log('template',novelSnap)
            novelItem_Data.push({ id: novelDoc.id, ...novelDoc.data(), ...novelSnap.data(), createAt: createdAt, lastUpdate: lastUpdate })
          }
          chapter_Item.sort((a, b) => a.chap_id - b.chap_id);
          setnovelItem(novelItem_Data);
          setchapterItem(chapter_Item)
          setisReduxLoaded(true)
          // console.log(cateItem_Data)
          novelItem.map(item => {
            console.log("Category Document:", item.cateDoc);
            console.log("Comment Status:", item.comment_status);
            console.log("Commit Status:", item.commit_status);
            console.log("Create At:", item.createAt);
            console.log("Creators:", item.creater);
            console.log("ID:", item.id);
            console.log("Image URL:", item.image);
            console.log("Last Update:", item.lastUpdate);
            console.log("Like:", item.like);
            console.log("Name:", item.name);
            console.log("Novel Document:", item.novelDoc);
            console.log("Overview:", item.overview);
            console.log("Owner:", item.owner);
            console.log("Project Status:", item.project_status);
            console.log("Rating:", item.rating);
            console.log("Status:", item.status);
            console.log("Title:", item.title);
            console.log("View:", item.view);
          });
        }
 
     useEffect(() => {
          if (!isReduxLoaded) {
               getNovelItem()
          }
      }, [isReduxLoaded, chapterItem, novelItem])
  
  return (
    <VStack bg = {theme.Bg.base} flex ={1}>
          <Chapternavigation/>
          <FlatList>
          {novelItem.length > 0 && isReduxLoaded &&
               <VStack flex = {1}  p = {5} space = {5}>
                    <HStack id = "story-heading-wrap" justifyContent={'center'} >
                         <VStack w = '80%' id = 'story-heading' alignItems={'center'} space = {1}>
                              <Text color={theme.Text.description} textAlign={'center'}>{`${novelItem[0].title}`}</Text>
                              <Text color = {theme.Text.base} fontWeight={'semibold'} fontSize={'md'}>{`${title}`}</Text>
                         </VStack>
                    </HStack>
                    <VStack p = {2}>
                         <Text id = "Novel-content" color = {theme.Text.base}>
                              {`${novelItem[0].overview}`}
                         </Text>
                    </VStack>

               </VStack>
               
          }
               
          </FlatList>
    </VStack>
  )
}

export default Readcontent;