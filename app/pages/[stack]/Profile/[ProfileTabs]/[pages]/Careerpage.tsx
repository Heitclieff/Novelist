import React,{FC , Suspense , useEffect ,useMemo , useCallback} from "react";
import { Box, Center, HStack, VStack } from "native-base";
import { useDispatch , useSelector } from "react-redux";
import { RootState } from "../../../../../../systems/redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { getCollectionData } from "../../../../../../systems/redux/action";
import { FlatList } from "react-native";
import CollectionItems from "../../../../../components/main/[layout]/Collections/CollectionItems";
interface Pageprops {}

const MemorizedCollectionItems = React.memo(({ item, index }: any) => {
    return (
      <Box pl={4} pr={4} pb={3}>
        <CollectionItems
          key={item.id}
          id = {item.id}
          title={item.title}
          view={item.view}
          images={item.images}
        />
      </Box>
    );
  });

const Careerpage : React.FC <Pageprops> = () => {
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const collectionsData = useSelector((state:any) => state.collectionsData)
    const isReduxLoaded = useSelector((state:RootState) =>state.iscollectionLoaded )

    const fetchCollectionsData = useCallback(() => {
        dispatch(getCollectionData());
      }, [dispatch]);    

    useEffect(() => {
      if(!isReduxLoaded) fetchCollectionsData();
    },[fetchCollectionsData])
  
    const renderItem = React.useCallback(
        ({ item, index }: any) => {
           return <MemorizedCollectionItems item={item} index={index} />;
         
        },[]
    );
    return (
        <>
        {isReduxLoaded &&    
  
          <Center>
              <FlatList
              showsVerticalScrollIndicator = {false}
              data={collectionsData}
              renderItem={renderItem}
              keyExtractor={(item:any) => item.id}
              numColumns={2}
              style = {{width : 'auto' }}
              ItemSeparatorComponent={() => <Box w = '20'/>}
              />
          </Center>   
      }
      </>
    )
}
export default Careerpage;
