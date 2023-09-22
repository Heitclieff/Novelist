import React,{FC, useEffect , useCallback , Suspense} from 'react'
import { Box, VStack } from 'native-base'
import { useContext } from 'react';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryData } from '../../systems/redux/action';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer';
import { ItemList } from '../../components/layout/Flatlist/ItemList';
import CategoryItems from './components/Categoryitem';

//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
}

const MemorizedCategoryItems = React.memo(CategoryItems)

const Category: React.FC <Pageprops> = () => {
  const theme: any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Categorydata = useSelector((state:any)=> state.categoryData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscategoryLoaded);
  
  const getCategoryAndDispatch = async () => {
      try {
          const fetchCate = await firestore().collection('Categories').get()
          const Catearray = []
          
          for (const doc of fetchCate.docs) {
            const proJect = await firestore().collection('Projects').where('cateDoc','==',doc.id).get()
            const projectItem = []
            for (let proData of proJect.docs) {
              projectItem.push({id: proData.id})
            }
            const dataDoc = doc.data()
            // console.log(dataDoc)
            Catearray.push({ title: doc.id, images: dataDoc.image, proDoc: projectItem })
          }
          // console.log('this is category',Catearray)

          dispatch(getCategoryData(Catearray));  

        } catch (error) {
          console.error('Error fetching Category', error);
      }
  };

  useEffect(() => {
    if(!isReduxLoaded) {
      getCategoryAndDispatch()
    };
  },[dispatch , isReduxLoaded])

  return (
    <Box
    flex = {1}
    pl = {2}
    pr = {2}
    bg = {theme.Bg.base}
    >
    <Suspense fallback = {<Box>Loading...</Box>}>
      {isReduxLoaded &&  
        <ItemList collection={Categorydata}>
            {(item:any, index:number) => (
                <MemorizedCategoryItems 
                    key = {index} 
                    images={item.images} 
                    title ={item.title}
                    proDoc={item.proDoc}/> 
            )}
          </ItemList>       
        }
    </Suspense>
    </Box>
  )
}

export default Category;