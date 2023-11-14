import React,{useContext , useEffect , useRef , useState} from 'react'
import { 
VStack,
HStack ,
Box ,
Text, 
Input , 
Icon,
Pressable} from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import { useRoute } from '@react-navigation/native';
import { MessageConfig } from './assets/config';
// @Components
import Userfield from './components/Userfield';
import Itemfield from './components/Itemfield';

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
     
     const fixedsearch = route.params?.fixedsearch ? true : false;

     const [searchQuery, setsearchQuery] = useState<string>('');
     const [novelResults ,setNovelResults] = useState<[]>([])
     const [searchResults, setSearchResults] = useState<{}>([]);

     const useraccount = useSelector((state) => state.userData)
     const userdocs = useSelector((state) => state.teams);
     const docID = useSelector((state) => state.content)

     const searchUsers = async () : Promise<void> => {
          if(!searchQuery) {
               setSearchResults([]);
               return
          }
          try{
               const usersRef = await firestore().collection('Users')
               .where('username', '>=' , searchQuery)
               .where('username', '<=', searchQuery +`\uf8ff`)
               .get()

               if(usersRef.docs.length > 0) {
                    const users = usersRef.docs.map((doc) => ({id: doc.id ,...doc.data()}));
                    setSearchResults(users);   
               }else{
                    setSearchResults([]);
               }

          }catch(error){
               console.log("Error Searching Users" , error)
          }
     }

     const searchnovel = async () : Promise<void> => {
          if(!searchQuery) {
               setSearchResults([]);
               return
          }

          try{
               const novelRef = await firestore().collection('Novels')
               .where('title', '>=' , searchQuery)
               .where('title', '<=', searchQuery +`\uf8ff`)
               .limit(5)
               .get()

               if(novelRef.docs.length > 0) {
                    const noveldocs = novelRef.docs.map((doc) => ({id: doc.id ,...doc.data()}));
                    setNovelResults(noveldocs)
               }

          }catch(error){
               console.log("Error Searching Novels" , error)
          }
     }

     const UpdatedTeams = async (data:any) : Promise<void> => {
          const updateItem = [
               ...userdocs.teams,
               {
                    ...data,
                    pending: true,
                    isleader : false,
               }
          ]
          dispatch(setProjectTeams({teams : updateItem}));
          sendNotification(data?.message_token);

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
     }

     const sendNotification = async (token:string) => {
          if(!token) return

          try{
               const currentuser = useraccount[0];
               const response = await fetch(MessageConfig.protocol, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `key=${MessageConfig.server_key}`,
                    },
                    body: JSON.stringify({
                      to : token,
                      notification: {
                        title: 'Nobelist',
                        body: `you have a new invited from ${currentuser.username}.`,
                        icon : currentuser?.pf_image,
                      },
                      data: {
                        custom_key: MessageConfig.custom_key,
                        icon : currentuser?.pf_image,
                        title : `you have a new invited from ${currentuser.username}.`,
                        type : 'invite',
                        navigate : "project"
                      },
                    }),
                  });
                
                  const data = await response.json();
                  console.log('Notification Response:', data);

          }catch(error){
               console.log("Failed to send Notification" , error)
          }
        };

     useEffect(() => {
        
          searchnovel();
          
          searchUsers();
     } , [searchQuery])
  return (
     <VStack flex = {1} bg=  {theme.Bg.base} space = {5}>
          <HStack pl = {6} pr = {6} pt = {3} safeAreaTop space = {2}>
                  <Input
                  w = '85%'
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
               <VStack p = {4}>
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
                    <VStack p = {4}>
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