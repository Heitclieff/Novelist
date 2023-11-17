import React,{useContext, useEffect , useState} from 'react'
import { 
Box , 
VStack ,
HStack , 
Icon , 
Text , 
Select} from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { FlatList } from '../../../components/layout/Flatlist/FlatList';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

//@Components
import Elementnavigation from '../../../components/navigation/Elementnavigation';
import CommitItem from '../components/CommitItem';

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
     } ,[refreshing])
  return (
   <VStack flex = {1} bg = {theme.Bg.base}>
        <Memorizednavigation title = "Commits" 
            rightElement={[{icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
        />
     <VStack pl ={6} pt = {5} pr = {6} flex= {1}>
          <Box w = '100%' h= {8}>
               <Select h={'100%'} borderColor={theme.Divider.base} bg = {theme.Bg.container} color={theme.Text.base}>
               <Select.Item label="All" value="ux" />
                    <Select.Item label="Chapter 1" value="ux" />
                    <Select.Item label="Chapter 2" value="web" />
                    <Select.Item label="Chapter 3" value="cross" />
               </Select>
          </Box>
          <FlatList refreshing = {refreshing} setRefreshing={setRefreshing}>
               <VStack mt = {5} space = {3}>
                    {projectcommits.field?.length > 0 &&
                         projectcommits.field.map((item:any , index:number) =>
                              <MemorizedCommitItem key = {index} data= {item} doc_id=  {id}/>
                    )}
               </VStack>
              
          </FlatList>
     </VStack>
    
   </VStack>
  )
}

export default Commit;