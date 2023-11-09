import React, {useContext , useEffect, useState}from 'react'
import { 
Box , 
Center ,
 VStack} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
// import { FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FlatList } from '../../components/layout/Flatlist/FlatList'

//@Redux toolkits
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { setMybookmarks } from '../../systems/redux/action'

//@Compoenents
import Bookmarkfield from './components/Bookmarkfield'
import Bookmarkbutton from '../../components/button/Bookmarkbutton'

//@firestore
import firestore from '@react-native-firebase/firestore'

interface Pageprops {}

const MemorizedBookmarkfield = React.memo(Bookmarkfield);

const Bookmarks : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeWrapper)
    const userData = useSelector((state) => state.userData)
    const Mybookmarks = useSelector((state) => state.slot)
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const [refreshing , setRefreshing] = useState<boolean>(false);


    const fetchingBookmarks = async() :Promise<void> => {
      try{
        const uid = userData[0].id
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

    const Deletefrombookmarks = async (docid) : Promise <void> => {
      try{
        const uid = userData[0].id
        const userpath = firestore().collection('Users').doc(uid);
        const bookmarkpath = userpath.collection('Bookmark');
        const removeBooks = Mybookmarks.slot.filter(book => book.docid !== docid);

        dispatch(setMybookmarks({slot : removeBooks}));
        await  bookmarkpath.doc(docid).delete();

        console.log("Remove success",docid)

      }catch(error){
        console.log('Failed to Remove Book from Bookmarks', error)
      }
  
    }

    useEffect(() => {
      if(Mybookmarks.slot?.length <= 0 || refreshing){
        fetchingBookmarks();
      }
    },[refreshing])

  return (
    <VStack flex = {1} bg = {theme.Bg.base} pt = {2}>
        
          <FlatList refreshing = {refreshing} setRefreshing={setRefreshing}>
            {Mybookmarks.slot?.length > 0 &&
              Mybookmarks.slot?.map((item:any , index:number) => {
                return(
                    <SwipeListView 
                    key = {index}
                    disableRightSwipe
                    data={[0]}
                    ItemSeparatorComponent={<Box h=  '2'/>}
                    renderItem={(itemdisable:any , index:number) => (
                      <Center>
                        <MemorizedBookmarkfield key  = {index}  data = {item} id = {item.novelDoc}/>
                      </Center>
                    )}
                    renderHiddenItem={ (data, rowMap) => (<Bookmarkbutton action = {Deletefrombookmarks} docid = {item.docid}/>)}
                    leftOpenValue={60}
                    rightOpenValue={-60}
                  />
                )
              })
            }
          </FlatList>
        
    </VStack>
  )
}

export default Bookmarks