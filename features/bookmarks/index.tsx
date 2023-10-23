import React, {useContext , useEffect}from 'react'
import { 
Box , 
Center ,
 VStack} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

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

    const fetchingBookmarks = async() :Promise<void> => {
      try{
        const uid = userData[0].id
        const getuserkeys = firestore().collection('Users').doc(uid);
        const getbookmarks = await getuserkeys.collection('Bookmark').get();
        const bookmarkKeys = getbookmarks.docs.map(doc => ({id : doc.id , novelDoc : doc.data().novelDoc , date : doc.data().date}))
        
        const novelDocsMap = await Matchingbookmarks(bookmarkKeys);
        dispatch(setMybookmarks({slot : novelDocsMap , dockey : bookmarkKeys}));

      }catch(error){
        console.log('Failed to fetching Bookmarks', error)
      }
    }

    const Matchingbookmarks = async (bookmarkKeys:any) : Promise<T> => {
        const getNovels = await firestore().collection('Novels').where(firestore.FieldPath.documentId(), 'in' , bookmarkKeys.map(doc => doc.novelDoc)).get();
        const novelDocs = getNovels.docs.map(doc => ({id:doc.id, ...doc.data()}))

        const novelDocsMap = new Map(getNovels.docs.map(doc => [doc.id , doc]))
  
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
    
    const renderItem = React.useCallback(
        ({ item, index }:any) => {
           return( 
            <SwipeListView 
              key = {index}
              disableRightSwipe
              data={[0]}
              ItemSeparatorComponent={<Box h=  '2'/>}
              renderItem={(itemdisable:any , index:number) => (
                <Center>
                   <MemorizedBookmarkfield key  = {index}  data = {item} id = {item.id}/>
                </Center>
              )}
              renderHiddenItem={ (data, rowMap) => (<Bookmarkbutton action = {Deletefrombookmarks} docid = {item.docid}/>)}
              leftOpenValue={60}
              rightOpenValue={-60}
              />
          )
        },[]
    ); 
  
    // const InitalBooksSet = () => {
    //   // const Mybookskey = Array.from(Mybookmarks.slot?.values());
    
    //   const Mybooks = Mybookmarks.dockey.map((bookdoc:any) => {
    //     const doc = Mybookmarks.slot.get(bookdoc.novelDoc)?.data();
    //     return {
    //         docid : bookdoc.id,
    //         date : bookdoc.date,
    //         ...doc
    //     }
    //   });

    //   dispatch(setMybookmarks({slot : Mybooks , }))
    // }

    useEffect(() => {
      if(Mybookmarks.slot?.length <= 0){
        fetchingBookmarks();
      }
    },[])

  return (
    <VStack flex = {1} bg = {theme.Bg.base} pt = {2}>
        {Mybookmarks.slot?.length > 0 &&
          <FlatList
            showsVerticalScrollIndicator = {false}
            data={Mybookmarks?.slot}
            renderItem={renderItem}
            keyExtractor={(item:any) => item.id}
            style = {{flex:1}}
            ItemSeparatorComponent={() => <Box h = '2'/>}
          />
        }
    </VStack>
  )
}

export default Bookmarks