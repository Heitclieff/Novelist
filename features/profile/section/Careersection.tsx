import React,{FC , Suspense , useEffect ,useMemo , useCallback} from "react";
import { Box, Center, HStack, VStack } from "native-base";
import { useDispatch , useSelector } from "react-redux";
import { RootState } from "../../../systems/redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getCollectionData } from "../../../systems/redux/action";
import { FlatList } from "react-native";
import { ItemList } from "../../../components/layout/Flatlist/ItemList";
import Itemfield from "../../../components/field/Itemfield";
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
    const collectionsData = useSelector((state:any) => state.collectionsData)
    const isReduxLoaded = useSelector((state:RootState) =>state.iscollectionLoaded )

    const fetchCollectionsData = useCallback(() => {
        dispatch(getCollectionData());
      }, [dispatch]);    

    useEffect(() => {
      if(!isReduxLoaded) fetchCollectionsData();
    },[fetchCollectionsData])
  
    return (
        <>
        {isReduxLoaded &&    
  
          <Center>
            <ItemList collection = {collectionsData}>
                {(item:any , index:number) => <MemorizedCollectionItems item={item} index={index} />}
            </ItemList>
          </Center>   
      }
      </>
    )
}
export default Careersection;