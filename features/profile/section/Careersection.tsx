import React,{FC , Suspense , useEffect ,useMemo , useCallback, useState ,useContext} from "react";
import { ThemeWrapper } from "../../../systems/theme/Themeprovider";
import { Box, Center, HStack, VStack , Text} from "native-base";
import { useDispatch , useSelector } from "react-redux";
import { RootState } from "../../../systems/redux/reducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
// import { getCollectionData } from "../../../systems/redux/action";
import { FlatList } from "react-native";
import { ItemList } from "../../../components/layout/Flatlist/ItemList";
import Itemfield from "../../../components/field/Itemfield";
import { SpinnerItem } from "../../../components/Spinner";
//firebase
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
  id : string
  setCareerAmout : any
}

const MemorizedCollectionItems = React.memo(({ item, index }: any) => {
    return (
      <Box pl = {6} pr = {6}>
          <Itemfield 
            id = {item.id} 
            data= {item}/>
      </Box>
    );
  });

const Careersection : React.FC <Pageprops> = ({id , setCareerAmout}) => {
    const theme:any = useContext(ThemeWrapper);
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const collectionsData = useSelector((state:any) => state.userData)


    const [snapProject, setsnapProject] = useState<any[]>([])
    const [isLoading , setLoading] = useState<boolean>(true);

    const findingProjectwithid = async () => {
      try{
        const getnovel = await firestore().collection('Novels')
        .where('owner' ,'==' , id)
        .where('status' , '==' , true)
        .get()
  
        setCareerAmout(getnovel.docs.length);
        const noveldocs = getnovel.docs.map((doc => ({id : doc.id , ...doc.data()})))
        setsnapProject(noveldocs)
        setLoading(false);
      }catch(error){
        console.log("Failed To find Project" ,error)
      }
    }
    useEffect(() => {
      findingProjectwithid()
    },[id])
  
    if(isLoading) return(
      <SpinnerItem/>
    )
    return (
        <>
        {snapProject.length > 0 ?    
          <Center>
            <Text mt = {4} color = {theme.Text.base} fontWeight={'semibold'}>Careers</Text>
            <ItemList collection = {snapProject}>
                {(item:any , index:number) => <MemorizedCollectionItems item={item} index={index} />}
            </ItemList>
          </Center>   

          :<Center mt = {5}>
              <Text color = {theme.Text.base}>Not founds any Careers</Text>
          </Center>
      }
      </>
    )
}
export default Careersection;