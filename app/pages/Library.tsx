import React ,{FC , useEffect ,lazy , Suspense , useMemo}from 'react'
import { 
Box,
VStack,
HStack,
Text,
 } from 'native-base'

 // Components
import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
const LazyGlobalgrid = lazy(() => import('../components/global/[layout]/Globalgrid'))
const LazyShowcasebar = lazy(() => import('../components/global/[layout]/Globalgrid'))

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData , getuserData} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'


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
    <VStack w = '100%' h = '100%' p = {2} bg = {theme.Bg.base}>
        {React.useMemo(() => {
          return <MemorizeShowcasebar
          books= '10'
          userdata =  {userdata}
          /> 
        }, [userdata])}
        
        <Box  w = '100%' pl = {3} >
            <HStack space = {1} alignItems={'center'}>
                <Box 
                w= {1.5} 
                h = '90%' 
                rounded={'md'}
                bg  = 'cyan.700'>

                </Box>
                <Text
                fontSize={'md'}
                fontWeight={'semibold'}
                color = {theme.Text.heading}
                >My Library
                </Text>
            </HStack>
           
        </Box>
        {isReduxLoaded  && 
          <Suspense fallback = {<Box>Loading...</Box>}>
             {MemorizedGlobalgrid}
          </Suspense>
        }
    </VStack>
  )
}

export default Library;