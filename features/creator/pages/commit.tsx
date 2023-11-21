import React,{useContext, useEffect , useState} from 'react'
import { 
Box , 
VStack ,
HStack , 
Icon , 
Text , 
Select,
Center} from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { FlatList } from '../../../components/layout/Flatlist/FlatList';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { AppSkeleton } from '../../../components/skelton/app';
//@Components
import Elementnavigation from '../../../components/navigation/Elementnavigation';
import CommitItem from '../components/CommitItem';
import { SpinnerItem } from '../../../components/Spinner';

// @Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

// @Redux tookits
import { useDispatch , useSelector } from 'react-redux';
import { setprojectCommits } from '../../../systems/redux/action';

interface Pageprops {
     route : any
}

const Memorizednavigation = React.memo(Elementnavigation);
const MemorizedCommitItem = React.memo(CommitItem);

const Commit : React.FC <Pageprops> =  ({route}) => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const dispath = useDispatch();     
     const firebase = firestore();

     const [refreshing , setRefreshing] = useState<boolean>(false);
     const [isLoading , setisLoading] = useState<boolean>(true); 
     const [initial , setInitial] = useState<boolean>(true);
     
     const projectcommits = useSelector((state) => state.field);
     const {snapshotcontent , id} = route.params;
     
     const fetchingCommit =  async () : Promise <void> => { 
          try{
               if(id === projectcommits.id){
                    return
               }
               
               const getcommit = await snapshotcontent.collection('Commits').get();
               const commitdocs = getcommit.docs.map((doc) => ({commit_id : doc.id , ...doc.data()}));
     
               dispath(setprojectCommits({field : commitdocs , id : id}))

          }catch(error){
               console.log("Failed to feching Commit" , error)
          }
     }

     useEffect(() => { 
          if(id){ 
               fetchingCommit();
          }
          setisLoading(false);
     } ,[refreshing])

     useEffect(() => {
          setTimeout(() => {
            setInitial(false);
          },0)
        },[])

  if(isLoading) return(
     <AppSkeleton/>
  )
  return (
   <VStack flex = {1} bg = {theme.Bg.base}>
        <Memorizednavigation title = "Commits" 
            rightElement={[{icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
        />
     <VStack pl ={6} pt = {5} pr = {6} flex= {1}>
          <Box w = '100%' h= {5}>
          </Box>
          <FlatList refreshing = {refreshing} setRefreshing={setRefreshing}>
               <VStack mt = {5} space = {3}>
                    {
                    isLoading ?
                         <SpinnerItem/>
                    :
                         projectcommits.field?.length > 0 ? 
                              projectcommits.field.map((item:any , index:number) =>
                                   <MemorizedCommitItem 
                                   key = {index} 
                                   data= {item} 
                                   doc_id=  {id}
                                   />
                              )
                         :

                         <Center>
                              <Text color = {theme.Text.base} fontSize={'xs'}>Nothing to commit right now.</Text>
                         </Center>   
               }
               </VStack>
              
          </FlatList>
     </VStack>
    
   </VStack>
  )
}

export default Commit;