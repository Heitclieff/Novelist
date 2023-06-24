import React, {FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Divider,
Button,
 } from 'native-base'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useColorMode , useColorModeValue } from 'native-base'
import { Themecolor } from '../../systems/theme'

 //Components
import Userfield from '../components/menu/[container]/Userfield'
import Optionfield from '../components/global/[container]/Optionfield'
import Menubar from '../components/menu/[container]/Menubar'

//userdata
import { userdata } from '../../assets/VisualCollectionsdata'

interface Pageprops { 
  navigation :any,
  theme :  any,
  setTheme: any,
}

const Menu :React.FC <Pageprops> = ({navigation ,theme , setTheme}) => {
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
      <Menubar  theme = {theme} setTheme = {setTheme} />
        <VStack paddingY={5}>
          <Box
          id = 'profile-section'
          w = '100%'
          h = {200}
          >
            <Userfield
              data = {userdata}
              theme = {theme}
              />
          </Box>
          <VStack
          id = 'Options-section'
          w = '100%'
          space=  {1}
          >
            {Menuitems.map((item, key) => {
              return (
                <Optionfield
                key={key}
                theme = {theme}
                title  = {item.title}
                OptionIcon = {item.IconProperty}
                navigation={navigation}
                direction = {item.direct}
              />    
              )
            })}
             
          </VStack>
        </VStack>

    </Box>
  )
}

export default Menu;
