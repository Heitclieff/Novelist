import React , {useEffect} from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "../../../systems/redux/action";
import firestore from '@react-native-firebase/firestore'

const FetchingCategoryHooks = (data : any, setLoading : any) => {
     const dispatch = useDispatch();
     const db = firestore();

     const getCategoryAndDispatch = async () => {
          try {
               const getcategory = await db.collection('Category').get()
               const categorydocs = getcategory.docs.map(doc => ({id : doc.id , ...doc.data()}))
               
               dispatch(setCategory({category : categorydocs}));
               console.log("--> Category Loaded.")
          }catch (error) {
               console.log('Fetching Hooks: failed to fetched category data', error);
               console.log("Location : category/hooks/fetching.hooks.ts");
          }
     };

     useEffect(() => {
     if(!data.category) getCategoryAndDispatch();
     setLoading(false);
     },[])
 return null    
}
export {FetchingCategoryHooks};