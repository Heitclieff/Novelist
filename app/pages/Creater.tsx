import React,{FC , lazy , Suspense, useMemo} from 'react'
import { 
Box,
VStack,
} from 'native-base'

//components
import Createrbar from '../components/creater/[container]/Createrbar'
import Usershowcase from '../components/global/[container]/Usershowcase'

const LazyTabscontrols = lazy(() => import('./[workspaceTabs]/TabsControls'))
//visual data
import { userdata } from '../../assets/VisualCollectionsdata'

interface Pageprops { 
    theme : any
}

const Creater : React.FC <Pageprops> = ({theme}) => {
    const MemorizeCreaterbar = React.memo(Createrbar)
    const MemorizeUsershowcase = React.memo(Usershowcase)
    const MemorizedTabscontrols = useMemo(() => <LazyTabscontrols theme = {theme}/> , [theme] )
  return (
    <VStack w = '100%' h = '100%' bg = {theme.Bg.base} space = {2}>
        <Box h = '12%'>
            <MemorizeCreaterbar theme = {theme} />
        </Box>
        
        <Box w = '100%' h = '15%' alignItems={'center'}>
            <Box w = '90%'>
                {React.useMemo(() =>{
                    return <MemorizeUsershowcase
                    theme = {theme}
                    username = {userdata[0].username}
                    image={userdata[0].image}
                    />
                },[theme] )}
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
