import React,{FC , Suspense , useEffect ,useMemo , useCallback, useState } from "react";
import { Box, Center, HStack, VStack } from "native-base";
import { useDispatch , useSelector } from "react-redux";
import { RootState } from "../../../systems/redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
// import { getCollectionData } from "../../../systems/redux/action";
import { FlatList } from "react-native";
import { ItemList } from "../../../components/layout/Flatlist/ItemList";
import Itemfield from "../../../components/field/Itemfield";

//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {}

const MemorizedCollectionItems = React.memo(({ item, index }: any) => {
    return (
      <Box pl = {6} pr = {6}>
          <Itemfield 
            id = {item.id} 
            data= {item}/>
      </Box>
    );
  });

const Careersection : React.FC <Pageprops> = () => {
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const collectionsData = useSelector((state:any) => state.userData)
    // const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )
    const [snapProject, setsnapProject] = useState<any[]>([])
    const [isReduxLoaded , setisReduxLoaded] = useState<boolean>(false);
    // console.log('career',collectionsData[0].project)
    const fetchProject = async () => {
      let p = []
      let pd = collectionsData[0].project
      for (let proDoc of pd) {
        let projectData = await firestore().collection('Novels').doc(proDoc).get()
        p.push({id: proDoc, ...projectData.data()})
      }
      // pd.forEach( async (proDoc) => {
        
      // });
      setsnapProject(p)
      setisReduxLoaded(true)
    }

    // const fetchCollectionsData = useCallback(() => {
    //     dispatch(getCollectionData());
    //   }, [dispatch]);    

    useEffect(() => {
      if(!isReduxLoaded) {
        fetchProject()
        // console.log(snapProject)
      };
    },[snapProject])
  
    return (
        <>
        {isReduxLoaded &&    
  
          <Center>
            <ItemList collection = {snapProject}>
                {(item:any , index:number) => <MemorizedCollectionItems item={item} index={index} />}
            </ItemList>
          </Center>   
      }
      </>
    )
}
export default Careersection;