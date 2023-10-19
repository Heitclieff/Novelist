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

// @Components
import Userfield from './components/Userfield';

//@Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import { useSelector } from 'react-redux';

const MemorizedUserfield = React.memo(Userfield);

const Searchpage : React.FC =() => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     
     const [searchQuery, setsearchQuery] = useState<string>('');
     const [searchResults, setSearchResults] = useState<[]>([]);
     const userdocs = useSelector((state) => state.teams);
     
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

     useEffect(() => {
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
               <VStack p = {4}>
                    {searchResults.length > 0 &&
                         searchResults.map((item:any , index:number) => {
                              const status = userdocs.teams.find((doc) => doc.id === item.id)
                              if(status?.isleader) return

                              return(
                                   <MemorizedUserfield 
                                   key = {index}
                                   id = {item.id}
                                   data = {item}
                                   username = {item.username}
                                   image = {item.pf_image}
                                   email = {item.email}
                                   status = {status}
                                   />
                              )
                         }
                              
                         )
                    }
               </VStack>
          </FlatList>
     </VStack>
  )
}

export default Searchpage;