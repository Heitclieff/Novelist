import React, {useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { setupMessageToken } from './notification.hooks';
import { useDispatch } from 'react-redux';
import { setUser , setMylibrary, setMybookmarks , setCategory } from '../../../systems/redux/action';

const FetchingCollectionHooks = (setCollection : any , setLoading : any , refreshing : boolean) => {
     const db = firestore();

     const fetchingHNNCollection = async () => {
        try {
          const getDocs = await db.collection('Novels')
          .where("status" , '==' ,true)
          .orderBy('like' , "desc")
          .orderBy('createAt', 'desc')
          .limit(10)
          .get();

          setCollection.hots(getDocs.docs);
          setLoading((prev : any) => ({...prev , top : false}));
        } catch (error) {
          console.error('Fetching Hooks: Failed to fetch Hot new novels', error);
        }
     };

     const fetchingTNCollection = async () => {
          try {
            const snapshortTop = await db.collection('Novels')
            .where("status" , '==' ,true)
            .orderBy('createAt', 'desc')
            .limit(10)
            .get()

            setCollection.top(snapshortTop.docs)
            setLoading((prev : any ) => ({...prev , second : false}));
          } catch (error) {
            console.error('Fetching Hooks: Failed to fetch Top New novels', error);
          }
     };

     const fetchingMVCollection = async () => {
          try {
               const snapshortMost = await db.collection('Novels')
               .where("status", '==', true)
               .orderBy('view', 'desc')
               .limit(10)
               .get();

               setCollection.most(snapshortMost.docs)
               setLoading((prev : any) => ({ ...prev, heading: false }));
          } catch (error) {
               console.error('Fetching Hooks: Failed to fetch most view novels', error);
          }
     };
     
     useEffect(() => {
          fetchingMVCollection();
     },[refreshing]);
     
     useEffect(() => {
          fetchingHNNCollection();
     } ,[refreshing])

     useEffect(() => {
          fetchingTNCollection();
     } , [refreshing])
  return null;
}


const FetchingLibraryHooks =  async (uid : string , db: any , dispatch : any) => {   
     try {
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
          console.log("Fetching Hooks: Failed to fetch Library content." , error)
     }
}

const FetchingBookmarkHooks =  async (uid : string , db: any , dispatch : any) => {
     const Matchingbookmarks = async (bookmarkKeys : any) => {
          const getNovels = await db.collection('Novels').where(firestore.FieldPath.documentId(), 'in' , bookmarkKeys.map((doc:any) => doc.novelDoc)).get();
          const novelDocsMap = new Map(getNovels?.docs.map(doc => [doc.id , doc]))
          
          return novelDocsMap;
     }

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
          console.log('Fetching Hooks: Failed to fetch Bookmarks.', error)
     }
}    

const FetchingCategoryHooks = (refreshing : boolean) => {
     const db = firestore();
     const dispatch : any = useDispatch();

     const getcategory = async () => {
          try {
               const getcategory = await db.collection('Category').get()
               const categorydocs = getcategory.docs.map(doc => ({id : doc.id , ...doc.data()}))
               
               dispatch(setCategory({category : categorydocs}));
          } catch (error) {
               console.error('Fetching Hooks: Failed to fetch Category.', error);
          }
     }
     

     useEffect(() => {
          getcategory();
     },[refreshing])
}

const FetchingUserHooks = (setuserid :any) => {
     const db = firestore();
     const Auth : any = auth();
     const navigation = useNavigation();
     const dispatch : any = useDispatch();

     const fetchingUserCollection = async () => {
          try {
               const uid =  Auth.currentUser?.uid;
               if (uid) {
                 const snapUserData = await db.collection('Users').doc(uid).get()
                 const getUserdata = snapUserData.data();
                 setuserid(uid);

                 if (getUserdata) {
                    let userData: any = [{ id: snapUserData.id, ...getUserdata }]

                    if (!userData?.[0].message_token) {
                    setupMessageToken(uid);
                    }

                    dispatch(setUser(userData))
                    FetchingLibraryHooks(uid , db ,dispatch);
                    FetchingBookmarkHooks(uid , db ,dispatch);

                    return
                 }
               }
               navigation.navigate("Login");
          }catch(error){
                    console.log("Error to get Authentication User" ,error);
          }
     }

     useEffect(() => {
          fetchingUserCollection();
     },[Auth.currentUser])
  
     return null;
}

export {FetchingCollectionHooks , FetchingUserHooks , FetchingCategoryHooks}