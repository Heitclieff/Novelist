import React, {useContext, useEffect , Suspense , lazy} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Divider,
Button,
 } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

 //@Components

import Userfield from './components/Userfield'
const LazyMenunavigation = React.lazy(() => import('../../components/navigation/Menunavigation'));
const LazyOptionfield = React.lazy(() => import('../../components/field/Optionfield'));

//@redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getuserData , setTheme } from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { useNavigation } from '@react-navigation/native'

interface Pageprops { }

const Menu :React.FC <Pageprops> = () => {
  const Memorizeuserfield = React.memo(Userfield)
  const MemorizeOptionfield = React.memo(LazyOptionfield)
  const MemorizeMenubar  = React.memo(LazyMenunavigation);
  const navigation = useNavigation();
  const theme:any =  useContext(ThemeWrapper)
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])
  
  const Menuitems = [{
  title : 'Edit Profile',
  direct : 'Editprofile',
  IconProperty : {
    name : 'edit'
  }
},
{
  title : 'Leaderboard',
  direct : 'Leaderboard',
  IconProperty : {
    name : 'leaderboard'
  }
},
{
  title : 'Bookmarks',
  direct : 'Bookmarks',
  IconProperty : {
    name : 'bookmark'
  }
},
{
  title : 'Settings',
  direct : 'SettingsStack',
  IconProperty : {
    name : 'settings'
  }
},
]

  return (
    <Box 
    w=  '100%'
    h=  '100%'
    p = {3}
    bg = {theme.Bg.base}
    >
      {React.useMemo(() => {
        return <Suspense fallback = {<Box>Loading..</Box>}>
            <MemorizeMenubar/>
        </Suspense> 
      } , [theme])}
        <VStack paddingY={5}>
          <Box
          id = 'profile-section'
          w = '100%'
          h = {200}
          justifyContent={'center'}
          >​ 
            {React.useMemo(() => {
              return <Memorizeuserfield data = {userdata}/> 
            }, [userdata])}
          </Box>
          <VStack
          id = 'Options-section'
          w = '100%'
          space=  {2}  
          pl = {2}
          pr = {2}
          >
               {React.useMemo(() => {
                return  Menuitems.map((item, key) => (
                  <MemorizeOptionfield
                  key={key}
                  title  = {item.title}
                  OptionIcon = {item.IconProperty}
                  navigation={navigation}
                  isDividerEnable = {false}
                  isChevronEnable={false}
                  direction = {item.direct}
                />    
                ))
              },[navigation])}
   
          </VStack>
        </VStack>
    </Box>
  )
}

export default Menu;