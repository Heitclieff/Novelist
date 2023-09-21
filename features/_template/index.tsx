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
  const theme:any = useContext(ThemeWrapper);
  const route = useRoute()
  const {title}:any = route.params
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const [cateItemData, setCateItemData] = useState<any[]>([]);
  const Collectionsdata = []
  
  const isReduxLoaded = false;
  const getCateItem = async () => {
    const cateItemSnap = await firestore().collection('Projects').where('cateDoc', '==', title).get()
    const cateItem_Data = []
    for (const cateDoc of cateItemSnap.docs) {
      const data = cateDoc.data().novelDoc
      const novelSnap = await firestore().collection('Novels').doc(data).get()
      const createdAt = novelSnap.data().createAt.toDate();
      const lastUpdate = novelSnap.data().lastUpdate.toDate();
      
      // console.log('template',novelSnap)
      cateItem_Data.push({ id: cateDoc.id, ...cateDoc.data(), ...novelSnap.data(), createAt: createdAt, lastUpdate: lastUpdate })
    }
    setCateItemData(cateItem_Data);
    // console.log(cateItem_Data)
    // cateItem_Data.map(item => {
    //   console.log("Category Document:", item.cateDoc);
    //   console.log("Comment Status:", item.comment_status);
    //   console.log("Commit Status:", item.commit_status);
    //   console.log("Create At:", item.createAt);
    //   console.log("Creators:", item.creater);
    //   console.log("ID:", item.id);
    //   console.log("Image URL:", item.image);
    //   console.log("Last Update:", item.lastUpdate);
    //   console.log("Like:", item.like);
    //   console.log("Name:", item.name);
    //   console.log("Novel Document:", item.novelDoc);
    //   console.log("Overview:", item.overview);
    //   console.log("Owner:", item.owner);
    //   console.log("Project Status:", item.project_status);
    //   console.log("Rating:", item.rating);
    //   console.log("Status:", item.status);
    //   console.log("Title:", item.title);
    //   console.log("View:", item.view);
    // });
  }
     useEffect(() => {
       if(!isReduxLoaded) {
        getCateItem()
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