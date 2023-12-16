import React,{useContext , useEffect , useRef , useState} from 'react'
import { 
VStack,
HStack ,
Box ,
Text, 
Input , 
Icon,
useToast,
Pressable} from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import { useRoute } from '@react-navigation/native';

// @Components
import Userfield from './components/Userfield';
import Itemfield from './components/Itemfield';
import AlertItem from '../reader/components/Alert';
import SendAlert from '../../services/alertService';
import sendNotification from '../../services/notificationService';

//@Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { useSelector , useDispatch } from 'react-redux';
import { setProjectTeams } from '../../systems/redux/action';

const MemorizedUserfield = React.memo(Userfield);
const MemorizedItemfield = React.memo(Itemfield);


const Searchpage : React.FC =() => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const dispatch = useDispatch();
     const route = useRoute();
     const toast = useToast();

     const fixedsearch = route.params?.fixedsearch ? true : false;

     const [searchQuery, setsearchQuery] = useState<string>('');
     const [novelResults ,setNovelResults] = useState<[]>([])
     const [searchResults, setSearchResults] = useState<{}>([]);

     const useraccount = useSelector((state) => state.userData)
     const userdocs = useSelector((state) => state.teams);
     const docID = useSelector((state) => state.content)

     const searchingSomething = async (value : string) => {
          const account_query =  await searchUsers(value);
          const novel_query =  await  searchnovel(value);

          if(value.length >= 1){
               if(account_query.length > 0 && novel_query.length > 0){

                    const users = account_query.map((doc) => ({id: doc.id ,...doc.data()}));
                    const noveldocs = novel_query
                    .filter(doc => doc.data().status === true) 
                    .map(doc => ({ id: doc.id, ...doc.data() }));

                    setNovelResults(noveldocs);
                    setSearchResults(users);
     
                    return
               }

               if(account_query?.length > 0){
                    const users = account_query.map((doc) => ({id: doc.id ,...doc.data()}));

                    setNovelResults([]);
                    setSearchResults(users);
               }
               else if (novel_query?.length > 1){
                    const noveldocs = novel_query
                    .filter(doc => doc.data().status === true) 
                    .map(doc => ({ id: doc.id, ...doc.data() }));
                    setSearchResults([])
                    setNovelResults(noveldocs);
               }
          }else{
               setNovelResults([]);
               setSearchResults([]);
          }
     }

     useEffect(() => {
          searchingSomething(searchQuery);
     },[searchQuery])

     const searchUsers = async (value : string) : Promise<T> => {
          try{
               const usersRef = await firestore().collection('Users')
               .where('username', '>=' , value)
               .where('username', '<=', value +`\uf8ff`)
               .limit(5)
               .get()

               return usersRef.docs;
               // if(usersRef.docs.length > 0) {
               //      const users = usersRef.docs.map((doc) => ({id: doc.id ,...doc.data()}));
               //      setSearchResults(users);   
               // }else{
               //      setSearchResults([]);
               // }

          }catch(error){
               console.log("Error Searching Users" , error)
          }
     }

     const searchnovel = async (value : string) : Promise<void> => {
          if(!value) {
               setSearchResults([]);
               return
          }

          try{
               const novelRef = await firestore().collection('Novels')
               .where('title', '>=' , value)
               .where('title', '<=', value +`\uf8ff`)
               .limit(5)
               .get()

               return novelRef.docs;
               // if(novelRef.docs.length > 0) {
               //      const noveldocs = novelRef.docs.map((doc) => ({id: doc.id ,...doc.data()}));
               //      setNovelResults(noveldocs)
               // }

          }catch(error){
               console.log("Error Searching Novels" , error)
          }
     }

     const UpdatedTeams = async (data:any) : Promise<void> => {
          let status = "error"
          try{
               const updateItem = [
                    ...userdocs.teams,
                    {
                         ...data,
                         pending: true,
                         isleader : false,
                    }
               ]
               dispatch(setProjectTeams({teams : updateItem}));
     
               if(data?.message_token){
                    sendNotification({
                         token : data?.message_token,
                         target : data.id,
                         body : `you have a new invited from ${useraccount[0]?.username}`,
                         icon : useraccount[0]?.pf_image,
                         type : 'invite',
                         project : docID.id
                    });
               }else{
                    console.log("ERROR : failed to send notification because target device doesn't have message token.")
               }
          
               const timestamp = firestore.FieldValue.serverTimestamp();
               const docRef =  await firestore()
                              .collection('Novels')
                              .doc(docID.id)
                              .collection('Creator')
                              .add({
                                   pending : true,
                                   userDoc : data.id,
                                   addAt  : timestamp,
                              })
     
               
               console.log("docRef ID" , docRef.id)
               status = "success";
          }catch(error){
               console.log("ERROR: failed to update teams" ,error)
          }

          SendAlert(status , "Added" , "Add failed" , toast)
     }
  return (
     <VStack flex = {1} bg=  {theme.Bg.base} space = {5}>
          <HStack  pl = {3} pr = {3} pt = {3} safeAreaTop space = {2}>
                  <Input
                  w = '80%'
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment}  
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<Icon as = {<EvilIcon name='search'/>} size = {5} mr = {2}/>}
                  placeholder='Search'
                  onChangeText={(e) => setsearchQuery(e)}
                  />
               <Pressable flex = {1} justifyContent={'center'} alignItems={'center'} onPress={()=> navigation.goBack()}> 
                    {({
                    isHovered,
                    isFocused,
                    isPressed
                    }) => {
                         return(   
                         <Box>
                              <Text fontWeight={'semibold'} color={isPressed ? theme.Text.description : isHovered ? theme.Text.description : theme.Text.base}>Cancel</Text>
                         </Box>
                         )
                         }}
               </Pressable>
          </HStack> 
          <FlatList flex = {1}>
               {novelResults?.length > 0 &&
               <VStack pl = {4} pr = {4} pt = {2}>
                    {
                         novelResults.map((item:any , index:number) => {
                              return(
                                   <MemorizedItemfield 
                                   key = {index}
                                   id = {item.id}
                                   data = {item}
                                   />
                              )
                         }
                         )
                    }
                </VStack>
               }
               {searchResults?.length > 0 &&
                    <VStack pl = {4} pr = {4} pt = {1}>
                         {
                              fixedsearch ?
                              searchResults.map((item:any , index:number) => {
                                   const status = userdocs.teams.find((doc) => doc.id === item.id)
                                   if(status?.isleader) return

                                   return(
                                        <MemorizedUserfield 
                                        key = {index}
                                        id = {item.id}
                                        data = {item}
                                        status = {status}
                                        UpdatedTeams={UpdatedTeams}
                                        />
                                   )
                              })
                              : searchResults.map((item:any , index:number) => { 
                                   return(
                                        <MemorizedUserfield 
                                        key = {index}
                                        id = {item.id}
                                        data = {item}
                                        teamsmode = {false}
                                        UpdatedTeams={() => navigation.navigate('ProfileStack', {profile : item})}
                                        />
                                   )
                              })   
                         }
                    </VStack>
                }
          </FlatList>
     </VStack>
  )
}

export default Searchpage;