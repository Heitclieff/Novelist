import React,{useContext , useEffect, useState} from 'react'
import { 
Box , 
Button, 
VStack} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { ItemList } from '../../components/layout/Flatlist/ItemList'
import { useRoute } from '@react-navigation/native'

//@Components
import Itemfield from '../../components/field/Itemfield'
import Centernavigation from '../../components/navigation/Centernavigation'

//@Redux Toolkits
// import { getCollectionData } from '../../systems/redux/action'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
     collections : any,
}

const Memorizednavigation = React.memo(Centernavigation);
const MemorizedItemfields = React.memo(Itemfield);

const Template : React.FC <Pageprops> = ({collections}) => {
  // console.log('_template index', collections)
  const theme:any = useContext(ThemeWrapper);
  const route = useRoute()
  const {title}:any = route.params
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const [cateItemData, setCateItemData] = useState<any[]>([]);
  const Collectionsdata = []
  
  const isReduxLoaded = false;
  const getCateItem = async () => {
    const cateItemSnap = await firestore().collection('Novels').where('cateDoc', '==', title).get()
    const cateItem_Data = []
    for (const cateDoc of cateItemSnap.docs) {
      const data = cateDoc.data()
      // console.log('template',data)
      // const novelSnap = await firestore().collection('Novels').doc(data).get()
      const createdAt = data.createAt.toDate();
      const lastUpdate = data.lastUpdate.toDate();
      
      // console.log('template',novelSnap)
      cateItem_Data.push({ id: cateDoc.id, ...cateDoc.data(), createAt: createdAt, lastUpdate: lastUpdate })
    }
    setCateItemData(cateItem_Data);
  }
     useEffect(() => {
       if(!isReduxLoaded) {
        getCateItem()
        // console.log(cateItemData)
       }
     },[dispatch , isReduxLoaded])
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Memorizednavigation title = {title} fixed/>
          <VStack flex={1} pl = {4} pr = {4}>
                <ItemList collection={cateItemData}>
                    {(item:any , index:number) => <MemorizedItemfields key = {index} id = {item.id} data= {item}/> }
                </ItemList>
          </VStack>
         
     </VStack>
  )
}

export default Template;