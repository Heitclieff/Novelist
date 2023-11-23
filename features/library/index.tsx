import React ,{FC , useEffect ,lazy , Suspense , useMemo , useContext , useState}from 'react'
import { 
Box,
VStack,
HStack,
Text,
Input,
Icon
 } from 'native-base'

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { FlatList } from '../../components/layout/Flatlist/FlatList';
 
//@Components
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import Librarynavigation from '../../components/navigation/Librarynaviation';
import Elementnavigation from '../../components/navigation/Elementnavigation';
import Libraryitem from './components/Libraryitem';
import { SpinnerItem } from '../../components/Spinner';
//@Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
// import { getCollectionData , getuserData} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { setMylibrary } from '../../systems/redux/action';
//firebase
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

interface Pageprops {
}


const MemorizedElementnavigation = React.memo(Elementnavigation)
const MemorizedLibraryitem = React.memo(Libraryitem)

const Library: React.FC <Pageprops> = () => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const theme:any = useContext(ThemeWrapper);
  const myBooks = useSelector((state:any) => state.book);
  const userdata = useSelector((state:any) => state.userData)
  const [refreshing ,setRefreshing] = useState<boolean>(false);
  const [isLoading ,setLoading] = useState<boolean>(true);
  const userID = userdata[0]?.id; 

  const getLibraryContent = async ():Promise<void> => {
    try {
      console.log("fetch library")
      // fixed userdata to Object
      const snapshotusers = firestore().collection("Users").doc(userID)
      const getlibrarykeys = await snapshotusers.collection("Library").orderBy("date" , "desc").get();
      const librarykeys = getlibrarykeys.docs.map(doc => doc.data().novelDoc);

      const findingNovels = await firestore().collection("Novels")
      .where(firestore.FieldPath.documentId() ,'in', librarykeys)
      .get();
    
      const novelDocs = findingNovels.docs.map(doc => ({id: doc.id ,...doc.data()}))
      dispatch(setMylibrary({book : novelDocs}))

    } catch (error) {
      console.log("fetching Userdata failed" , error)
    }
  };
  
  useEffect(() => {
    const shouldrefresh = !myBooks || refreshing
    if(shouldrefresh) getLibraryContent();
    setLoading(false);
  },[userID , refreshing])

  return (
    <VStack flex= {1} bg = {theme.Bg.base} space  ={2}>
        <MemorizedElementnavigation title = 'Library'/>
        <Box flex = {1}>
          {isLoading ?
            <Box mt = {10}>
              <SpinnerItem/>
            </Box> 
            :
            <FlatList refreshing={refreshing} setRefreshing={setRefreshing}>
              <Box w='100%' mt={4}>
                <Box pl={6} pr={6}>
                  <Input
                    rounded={'full'}
                    bg={theme.Bg.container}
                    borderColor={theme.Bg.comment}
                    color={theme.Text.base}
                    h={9}
                    InputRightElement={<Icon as={<EvilIcon name='search' />} size={5} mr={2} />}
                    placeholder='Enter your library Novel'
                  />
                </Box>
              </Box>
              <VStack space={1} m={5} mt={6}>
                {myBooks &&
                  myBooks.book?.length > 0 ?
                  myBooks.book.map((item: any, index: number) => (
                    <MemorizedLibraryitem key={index} id={item.id} data={item} />
                  ))
                  : <Text color={theme.Text.base}>No data</Text>
                }
              </VStack>
            </FlatList>
        }
          
        </Box>
    </VStack>
  )
}

export default Library;