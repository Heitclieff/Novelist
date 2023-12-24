//@ --UI context and React Hooks.
import React,{useContext, useState} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import {Text, VStack} from 'native-base';
import { useSharedValue , useAnimatedScrollHandler } from 'react-native-reanimated';

//@ --Icons
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'

//@ --Redux tools
import {useSelector} from 'react-redux';

//@ --Layouts
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import { Indexnavigation } from '../../components/navigation/Indexnavigation';
import CollectionsField from './components/Collectionsfield';

//@ --Components
import Indexheader from './header/Indexheader';
import SecurityHooks from './hooks/security.hooks';

//@ --Custom Hooks
import { IgnoreLogsHooks } from './hooks/ignore.hooks';
import { messagingHooks } from './hooks/notification.hooks';
import { 
FetchingCollectionHooks , 
FetchingUserHooks , 
FetchingCategoryHooks 
} from './hooks/fetching.hooks';

// --use Memorization
const MemorizedIndexnavigation = React.memo(Indexnavigation);
const MemorizedIndexheaderitem = React.memo(Indexheader);
const MemorizedCollectionField = React.memo(CollectionsField);

interface pageProps {}

interface loadingProps {
  heading : boolean
  top :boolean
  second : boolean
}

const Index : React.FC <pageProps> = () => {
    const theme:any = useContext(ThemeWrapper);
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
      scrollY.value = event.contentOffset.y;
    })

    const userdata : any = useSelector((state : any | unknown) => state.userData);
    const [userid , setuserid] = useState<string>("");
    const [CollectionMostview , setCollectionMostview] = useState<any[]>([]);
    const [CollectionHotNew , setCollectionHotNew] = useState<any[]>([])
    const [CollectionTopNew  , setCollectionTopNew] = useState<any[]>([]);
    const [refreshing ,setRefreshing] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<loadingProps>({
        heading : true,
        top : true,
        second : true
    });


    // Custom Hooks for start Systems.
    IgnoreLogsHooks(refreshing);
    SecurityHooks({userid , userdata});     
    messagingHooks(userdata);
    FetchingUserHooks(setuserid);
    FetchingCategoryHooks(refreshing);  
    FetchingCollectionHooks({
        hots : setCollectionHotNew,
        top : setCollectionTopNew,
        most : setCollectionMostview
      } , 
      setLoading, 
      refreshing
    )
   
  return (
    <VStack bg = {theme.Bg.base} flex = {1} position = 'relative'>
        {userdata?.length > 0 &&
          <MemorizedIndexnavigation 
            scrollY={scrollY}
            notify = {userdata[0].notify}
            
            leftElement = {
              <Text
                fontSize={'2xl'}
                fontWeight={'bold'}
                color={theme.Icon.between}
              >Nobelist
              </Text>     
            }

            rightElement = {[{
              id: 1 , 
              navigate : 'Search',
              icon: <AntdesignIcon  
                      name = 'search1' 
                      color = {theme.Icon.between} 
                      size = {18}
                    /> 
              },{
              id: 2 ,
              navigate : 'Notification',
              icon: <IonIcon  
                      name = 'notifications' 
                      color = {theme.Icon.between} 
                      size = {18} 
                    /> 
              }
            ]}
          />
        }
        
      {CollectionTopNew.length > 0 || CollectionTopNew ?
        <FlatList onScroll={scrollHandler} refreshing = {refreshing} setRefreshing={setRefreshing}>
          <VStack flex = {1}>
            <MemorizedIndexheaderitem
              collections={CollectionMostview}
              isLoading = {isLoading.heading}
            />

            <VStack  pl = {3} mt = {4}>
              <MemorizedCollectionField
              title="Hot New Novels"
              collections={CollectionHotNew}
              isLoading = {isLoading.top}
              />
              <MemorizedCollectionField
              title="Top new Novels"
              collections={CollectionTopNew}
              isLoading = {isLoading.second}
              />
            </VStack>
          </VStack>
        </FlatList>      
      :
      null
      }
    </VStack>
  )
}

export default Index;