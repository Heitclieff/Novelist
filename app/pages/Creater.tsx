import React,{FC , lazy , Suspense, useMemo , useEffect} from 'react'
import { 
Box,
    Icon,
VStack,
} from 'native-base'

//components
import Createrbar from '../components/creater/[container]/Createrbar'
const LazyUsershowcase = React.lazy(() => import('../components/global/[container]/Usershowcase'));
import CreateContainer from '../components/creater/[container]/CreateContainer';

import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsDataShowcase} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { Flatlist } from './[stack]/[global]/Flatlist';
import { Pressable } from 'native-base';
import { Input } from 'native-base';
import { EvilIcons , AntDesign } from '@expo/vector-icons';
import { Fab } from 'native-base';
interface Pageprops { 
    theme : any
}

const Creater : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeContext);
    const MemorizeCreaterbar = React.memo(Createrbar)
 
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);
  
    useEffect(() => {
        if (!isReduxLoaded) dispatch(getCollectionsDataShowcase());
    }, [dispatch, isReduxLoaded])

  return (
    <VStack flex=  {1} bg = {theme.Bg.base} space = {2}>
        <Box h = '12%'>
            <Suspense fallback = {<Box>Loading...</Box>}>
                <MemorizeCreaterbar/>
            </Suspense>
        </Box>

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
                        placeholder='Enter your Project name'
                        />
                    </Box>   
            </Box> 
                <VStack space = {1} m ={5} mt = {5}>
                {isReduxLoaded && Collectionsdata.length > 0 || Collectionsdata ?
                    Collectionsdata.map((item:any , index:number) => ( 
                        React.useMemo(() => (
                                <CreateContainer key = {index} id = {item.id} data= {item}/>        
                        ),[]
                        ))) 
                    : null
                }
                </VStack> 
            </Flatlist>
        </Box>
        <Fab renderInPortal={false} shadow={2} bg ={'teal.600'} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
    </VStack>
  )
}

export default Creater;
