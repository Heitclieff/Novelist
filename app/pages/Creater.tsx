import React,{FC , lazy , Suspense, useMemo , useEffect} from 'react'
import { 
Box,
VStack,
} from 'native-base'

//components
import Createrbar from '../components/creater/[container]/Createrbar'
const LazyUsershowcase = React.lazy(() => import('../components/global/[container]/Usershowcase'));
const LazyTabscontrols = lazy(() => import('./[workspaceTabs]/TabsControls'))

import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getuserData} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'

interface Pageprops { 
    theme : any
}

const Creater : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeContext);
    const MemorizeCreaterbar = React.memo(Createrbar)
    const MemorizeUsershowcase = React.memo(LazyUsershowcase)
    const MemorizedTabscontrols = useMemo(() => <LazyTabscontrols/> , [] )
    
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userdata = useSelector((state:any) => state.userData)

    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )

    useEffect(() => {
        if(!isReduxLoaded) dispatch(getuserData());
    },[dispatch , isReduxLoaded])

  return (
    <VStack w = '100%' h = '100%' bg = {theme.Bg.base} space = {2}>
        <Box h = '12%'>
            <Suspense fallback = {<Box>Loading...</Box>}>
                <MemorizeCreaterbar/>
            </Suspense>
        </Box>
        
        <Box w = '100%' h = '15%' alignItems={'center'}>
            <Box w = '90%'>
                {React.useMemo(() =>{
                    return <MemorizeUsershowcase
                    data = {userdata}
                    />
                },[userdata])}
            </Box>
        </Box>
        <Box w = '100%' h = '73%' >
            <Suspense fallback = {<Box>Loading...</Box>}>
               {MemorizedTabscontrols}
            </Suspense>       
        </Box>
    </VStack>
  )
}

export default Creater;
