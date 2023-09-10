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
import { getCollectionData , getuserData} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'

interface Pageprops {
}

const MemorizedElementnavigation = React.memo(Elementnavigation)
const MemorizedLibraryitem = React.memo(Libraryitem)

const Library: React.FC <Pageprops> = () => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  const theme:any = useContext(ThemeWrapper);


  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCollectionData());
  },[dispatch , isReduxLoaded])

  return (
    <VStack flex= {1} bg = {theme.Bg.base} space  ={2}>
        <MemorizedElementnavigation title = 'Library'/>
        <Box flex = {1}>
          <FlatList>
            <Box w= '100%' mt = {2}>
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
              {isReduxLoaded && Collectionsdata.length > 0 || Collectionsdata ?
                      Collectionsdata.map((item:any , index:number) => (       
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