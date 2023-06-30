import React, { FC, useState, lazy, Suspense, useMemo , useEffect } from 'react'
import {
  Box,
} from 'native-base'
import Appbar from '../components/main/[container]/Appbar'
import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'

const LazyTabscontrols = lazy(() => import('./[mainTabs]/TabsControls'))


interface Pageprops {
  navigation: any
}

const Main: React.FC<Pageprops> = ({navigation}) => {
  const theme:any = useContext(ThemeContext)
  const MemorizeAppbar = React.memo(Appbar)
  const MemorizedTabscontrols = useMemo(() => <LazyTabscontrols/>, [])

  return (
    <>
      <MemorizeAppbar/>
      <Box bg = {theme.Bg.base} flex = {1} py={3}>
        <Suspense fallback={<Box>Loading...</Box>}>
          {MemorizedTabscontrols}
        </Suspense>
      </Box>
    </>
  )
}

export default Main;

