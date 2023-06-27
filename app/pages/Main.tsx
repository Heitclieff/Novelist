import React ,{FC , useState ,lazy ,Suspense , useMemo} from 'react'
import { 
Box,
Button,
Text,
VStack
} from 'native-base'
import Appbar from '../components/main/[container]/Appbar'
const LazyTabscontrols = lazy(() => import('./[mainTabs]/TabsControls'))

interface Pageprops { 
  navigation :any 
  theme :any

}

const Main: React.FC <Pageprops> = ({navigation , theme}) => {
  const MemorizeAppbar = React.memo(Appbar)
  const MemorizedTabscontrols = useMemo(() => <LazyTabscontrols theme = {theme} /> ,[theme])

  return (
    <Box>
      <MemorizeAppbar theme = {theme} />
      <Box w = '100%' h= '100%' py={3} bg = {theme.Bg.base}>
        <Suspense fallback = {<Box>Loading...</Box>}>
          {MemorizedTabscontrols}
        </Suspense>
      </Box>
    </Box>
  )
}

export default Main;

