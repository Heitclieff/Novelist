import React, {FC , useMemo} from 'react'
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

//userdata
import { userdata } from '../../assets/VisualCollectionsdata'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen'

interface Pageprops { 
  navigation :any,
  theme :  any,
  setTheme: any,
}

const Menu :React.FC <Pageprops> = ({navigation ,theme , setTheme}) => {
  const Memorizeuserfield = React.memo(Userfield)
  const MemorizeOptionfield = React.memo(Optionfield)
  const MemorizeMenubar  = React.memo(Menubar);
  
  const Menuitems = [{
  title : 'Edit Profile',
  direct : '',
  IconProperty : {
    type : Feather,
    name : 'edit'
  }
},
{
  title : 'Leaderboard',
  direct : '',
  IconProperty : {
    type : MaterialIcons,
    name : 'leaderboard'
  }
},
{
  title : 'Bookmarks',
  direct : '',
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
        return <MemorizeMenubar  theme = {theme} setTheme = {setTheme} />
      } , [theme])}
        <VStack paddingY={5}>
          <Box
          id = 'profile-section'
          w = '100%'
          h = {200}
          >​ 
            {React.useMemo(() => {
              return <Memorizeuserfield data = {userdata} theme = {theme} /> 
            }, [theme])}
          </Box>
          <VStack
          id = 'Options-section'
          w = '100%'
          space=  {1}
          >
            {React.useMemo(() => {
              return  Menuitems.map((item, key) => (
                <MemorizeOptionfield
                key={key}
                theme = {theme}
                title  = {item.title}
                OptionIcon = {item.IconProperty}
                navigation={navigation}
                direction = {item.direct}
              />    
              ))
            },[theme ,navigation])}
             
          </VStack>
        </VStack>

    </Box>
  )
}

export default Menu;
