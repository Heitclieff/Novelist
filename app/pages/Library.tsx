import React ,{FC , useEffect ,lazy , Suspense , useMemo}from 'react'
import { 
Box,
VStack,
HStack,
Text,
Input,
Icon
 } from 'native-base'

 // Components
import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
const LazyGlobalgrid = lazy(() => import('../components/global/[layout]/Globalgrid'))
const LazyShowcasebar = lazy(() => import('../components/library/[container]/Showcasebar'))
import Librarybar from '../components/library/Librarybar'
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData , getuserData} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { Flatlist } from './[stack]/[global]/Flatlist'
import { EvilIcons } from '@expo/vector-icons'
import Libraryitem from '../components/library/[container]/Libraryitem'
interface Pageprops {
}

const Library: React.FC <Pageprops> = () => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  const userdata = useSelector((state:any) => state.userData)
  const theme:any = useContext(ThemeContext);

  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
  const isuserLoaded = useSelector((state:RootState) =>state.isuserLoaded )

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCollectionData());
  },[dispatch , isReduxLoaded])


  useEffect(() => {
    if(!isuserLoaded) dispatch(getuserData());
  },[dispatch , isuserLoaded])


  const MemorizeShowcasebar = React.memo(LazyShowcasebar);
  const MemorizedGlobalgrid = useMemo(() => 
    <LazyGlobalgrid 
    collections={Collectionsdata}
    bottomSpace={160}
  />,[Collectionsdata])

  return (
    <VStack flex= {1} bg = {theme.Bg.base} space  ={2}>
      <Librarybar/>
      <Box flex = {1}>
        <Flatlist>
          <Box w= '100%' mt = {2}>
            <Box pl = {6} pr = {6}>
                <Input 
                rounded={'full'} 
                bg = {theme.Bg.container} 
                borderColor={theme.Bg.comment} 
                color={theme.Text.base}
                h  = {9}
                InputRightElement={<Icon as = {<EvilIcons name='search'/>} size = {5} mr = {2}/>}
                placeholder='Enter your library Novel'
                />
            </Box> 
          </Box> 
          <VStack space = {1} m ={5} mt = {6}>
            {isReduxLoaded && Collectionsdata.length > 0 || Collectionsdata ?
                    Collectionsdata.map((item:any , index:number) => ( 
                        React.useMemo(() => (
                                <Libraryitem key = {index} id = {item.id} data= {item}/>        
                        ),[]
                        ))) 
                    : null
                }
          </VStack>
          </Flatlist>
      </Box>
    </VStack>
  )
}

export default Library;