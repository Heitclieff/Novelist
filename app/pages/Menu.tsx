import React, {FC , useMemo , useEffect , Suspense , lazy} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Divider,
Button,
 } from 'native-base'
import { Feather, MaterialIcons } from '@expo/vector-icons'
 //Components
import Userfield from '../components/menu/[container]/Userfield'
import Optionfield from '../components/global/[container]/Optionfield'
import Menubar from '../components/menu/[container]/Menubar'
import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
const LazyMenubar = React.lazy(() => import('../components/menu/[container]/Menubar'));
const LazyOptionfield = React.lazy(() => import('../components/global/[container]/Optionfield'));

//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getuserData , setTheme} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'

interface Pageprops { 
  navigation :any,
}

const Menu :React.FC <Pageprops> = ({navigation}) => {
  const Memorizeuserfield = React.memo(Userfield)
  const MemorizeOptionfield = React.memo(LazyOptionfield)
  const MemorizeMenubar  = React.memo(LazyMenubar);

  const theme:any =  useContext(ThemeContext)
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])
  
  const Menuitems = [{
  title : 'Edit Profile',
  direct : 'Editprofile',
  IconProperty : {
    type : Feather,
    name : 'edit'
  }
},
{
  title : 'Leaderboard',
  direct : 'Leaderboard',
  IconProperty : {
    type : MaterialIcons,
    name : 'leaderboard'
  }
},
{
  title : 'Bookmarks',
  direct : 'Bookmarks',
  IconProperty : {
    type : Feather,
    name : 'bookmark'
  }
},
{
  title : 'Settings',
  direct : 'SettingsStack',
  IconProperty : {
    type : Feather,
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
          >​ 
            {React.useMemo(() => {
              return <Memorizeuserfield data = {userdata}/> 
            }, [userdata])}
          </Box>
          <VStack
          id = 'Options-section'
          w = '100%'
          space=  {1}  
          >
            <Suspense fallback = {<Box>Loading..</Box>}>
              {React.useMemo(() => {
                return  Menuitems.map((item, key) => (
                  <MemorizeOptionfield
                  key={key}
                  title  = {item.title}
                  OptionIcon = {item.IconProperty}
                  navigation={navigation}
                  direction = {item.direct}
                />    
                ))
              },[navigation])}
            </Suspense>
          </VStack>
        </VStack>
    </Box>
  )
}

export default Menu;
