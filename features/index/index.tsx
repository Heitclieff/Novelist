import React,{useContext , useEffect} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { Box , Text, VStack } from 'native-base';
import { useSharedValue , useAnimatedScrollHandler } from 'react-native-reanimated';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'
//@Redux tools
import { useDispatch , useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../systems/redux/reducer';
import { getCollectionsDataShowcase } from '../../systems/redux/action';
//@Components
import Indexheader from './header/Indexheader';
//@Layouts
import { Indexnavigation } from '../../components/navigation/Indexnavigation';
import CollectionsField from './components/Collectionsfield';

const MemorizedIndexnavigation = React.memo(Indexnavigation);
const MemorizedIndexheaderitem = React.memo(Indexheader);
const MemorizedCollectionField = React.memo(CollectionsField);

const Index : React.FC = () => {
    const theme:any = useContext(ThemeWrapper);
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })

    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);

    useEffect(() => {
        if (!isReduxLoaded) dispatch(getCollectionsDataShowcase());
    }, [dispatch, isReduxLoaded])

  return (
    <Box bg = {theme.Bg.base} flex = {1} position = 'relative'>
        <MemorizedIndexnavigation 
        scrollY={scrollY}
        leftElement = {
          <Text
          fontSize={'2xl'}
          fontWeight={'bold'}
          color={theme.Text.heading}
          >Nobelist
          </Text>     
         }

         rightElement = {[
          {icon: <AntdesignIcon name = 'search1'/> , navigate : 'Search'} ,
          {icon: <IonIcon name = 'notifications'/> , navigate : 'Notification'}
        ]}
        />
        {isReduxLoaded && Collectionsdata.length > 0 || Collectionsdata ?
            <FlatList onScroll={scrollHandler}>
                <VStack flex = {1}>
                    <MemorizedIndexheaderitem collections={Collectionsdata}/>
                    <VStack  pl = {3} mt = {4}>
                        <MemorizedCollectionField
                        title="Hot New Novels"
                        collections={Collectionsdata}
                        />
                        <MemorizedCollectionField
                        title="Top new Novels"
                        collections={Collectionsdata}
                        />
                </VStack>
                </VStack>
            </FlatList>      
        :null }
    </Box>
  )
}

export default Index;