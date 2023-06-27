import React ,{FC , useEffect ,lazy , Suspense , useMemo}from 'react'
import { 
Box,
VStack,
HStack,
Text,
 } from 'native-base'

 // Components
import Showcasebar from '../components/library/[container]/Showcasebar'
import { userdata , Collectionsdata } from '../../assets/VisualCollectionsdata'

const LazyGlobalgrid = lazy(() => import('../components/global/[layout]/Globalgrid'))

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionData } from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'


interface Pageprops {
  theme : any
}

const Library: React.FC <Pageprops> = ({theme}) => {
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state:any)=> state.collectionsData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
  
  useEffect(() => {
    if(!isReduxLoaded) dispatch(getCollectionData());
  },[dispatch , isReduxLoaded])

  const MemorizeShowcasebar = React.memo(Showcasebar);
  const MemorizedGlobalgrid = useMemo(() => 
    <LazyGlobalgrid 
    theme =  {theme}  
    collections={Collectionsdata}
    bottomSpace={160}
  />,[theme])

  return (
    <VStack w = '100%' h = '100%' p = {2} bg = {theme.Bg.base}>
        {React.useMemo(() => {

          return <MemorizeShowcasebar
          theme = {theme}
          books='10'
          username = {userdata[0].username}
          image= {userdata[0].image}
          />
        }, [theme])}
        
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