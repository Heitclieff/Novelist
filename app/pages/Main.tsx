import React, { FC, useState, lazy, Suspense, useMemo , useEffect } from 'react'
import {
  Box, VStack,
} from 'native-base'
import Appbar from '../components/main/[container]/Appbar'
import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
import { Flatlist } from './[stack]/[global]/Flatlist'
import HeaderField from '../components/main/[layout]/Header/HeaderField'
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { getCollectionsDataShowcase } from '../../systems/redux/action'
import { AnyAction } from 'redux'

const LazyCollectionFields = lazy(() => import('../components/main/[layout]/Collections/CollectionFileds'))
const LazyTabscontrols = lazy(() => import('./[mainTabs]/TabsControls'))
const MemorizeAppbar = React.memo(Appbar)
const MemorizeHeaderField = React.memo(HeaderField)

interface Pageprops {
  navigation: any
}

const MemorizedColletionFileds = React.memo(LazyCollectionFields)
const Main: React.FC<Pageprops> = ({navigation}) => {
  const theme:any = useContext(ThemeContext)
  const MemorizedTabscontrols = useMemo(() => <LazyTabscontrols/>, [])

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
  const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);

  useEffect(() => {
      if (!isReduxLoaded) dispatch(getCollectionsDataShowcase());
  }, [dispatch, isReduxLoaded])


  return (
    <>
      <MemorizeAppbar/>
      <Box bg = {theme.Bg.base} flex = {1} py={3} pl = {4}>
        {/* <Suspense fallback={<Box>Loading...</Box>}>
          {MemorizedTabscontrols}
        </Suspense> */}
        {isReduxLoaded &&
            <Flatlist>
            <MemorizeHeaderField
              collections={Collectionsdata}
            />
            <VStack mt = {4}>
              <MemorizedColletionFileds
                title="Hot New Novels"
                collections={Collectionsdata}
              />
              <MemorizedColletionFileds
                title="Top new Novels"
                collections={Collectionsdata}
              />
            </VStack>
            
          </Flatlist>
        }
        
      </Box>
    </>
  )
}

export default Main;

