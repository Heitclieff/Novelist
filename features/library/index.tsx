import React ,{FC , useEffect ,lazy , Suspense , useMemo , useContext}from 'react'
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

//@Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
// import { getCollectionData , getuserData} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { fetchLibraryData } from '../../systems/redux/action';

//firebase
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

interface Pageprops {
}

const MemorizedElementnavigation = React.memo(Elementnavigation)
const MemorizedLibraryitem = React.memo(Libraryitem)

const Library: React.FC <Pageprops> = () => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Librarydata = useSelector((state:any)=> state.libraryData)
  const theme:any = useContext(ThemeWrapper);
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state: RootState) => state.islibraryLoaded);
  const getLibraryAndDispatch = async () => {
    try {
      const uid = auth().currentUser.uid;
      const snapshot = await firestore().collection('Librarys').doc(uid).get();
      if (snapshot.exists) {
        const data = snapshot.data();
        console.log(data);
  
        const novelLibrary = data.novel_library || [];
        console.log(novelLibrary);
  
        // Create an array to store the updated data
        const updatedData = [];
  
        for (const docId of novelLibrary) {
          // Fetch additional data from the 'Projects' collection
          const projectSnapshot = await firestore().collection('Projects').where('novelDoc', '==', docId).get();
  
          for (const projectDoc of projectSnapshot.docs) {
            const userDocs = projectDoc.data().userDoc;
            const creater = [];
  
            for (const user of userDocs) {
              const uData = await firestore().collection('Users').doc(user).get();
              const userData = uData.data();
              creater.push({ id: user, username: userData.username, image: userData.image });
            }
  
            const imagePro = projectDoc.data().imagePro;
  
            // Push the combined data to the 'updatedData' array
            updatedData.push({ id: docId, ...projectDoc.data(), creater, imagePro });
          }
        }
  
        // Dispatch the updated data to Redux
        dispatch(fetchLibraryData(updatedData));
      } else {
        console.log('Document does not exist.');
      }
    } catch (error) {
      console.error('Error fetching Library', error);
    }
  };
  
  

  useEffect(() => {
    if(!isReduxLoaded) {
      getLibraryAndDispatch()
    };
  },[dispatch , isReduxLoaded])

  return (
    <VStack flex= {1} bg = {theme.Bg.base} space  ={2}>
        <MemorizedElementnavigation title = 'Library'/>
        <Box flex = {1}>
          <FlatList>
            <Box w= '100%' mt = {4}>
              <Box pl = {6} pr = {6}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<Icon as = {<EvilIcon name='search'/>} size = {5} mr = {2}/>}
                  placeholder='Enter your library Novel'
                  />
              </Box> 
            </Box> 
            <VStack space = {1} m ={5} mt = {6}>
              {isReduxLoaded && Librarydata.length > 0 || Librarydata ?
                      Librarydata.map((item:any , index:number) => (       
                          <MemorizedLibraryitem key = {index} id = {item.id} data= {item}/>        
                          )) 
                      : null
                  }
            </VStack>
            </FlatList>
        </Box>
    </VStack>
  )
}

export default Library;