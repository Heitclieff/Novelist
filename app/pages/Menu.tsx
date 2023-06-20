import React, {FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Divider,
 } from 'native-base'
import { Feather, MaterialIcons } from '@expo/vector-icons'

 //Components
import Userfield from '../components/menu/[container]/Userfield'
import Optionfield from '../components/menu/[container]/Optionfield'
import Menubar from '../components/menu/[container]/Menubar'

//userdata
import { userdata } from '../../assets/VisualCollectionsdata'

interface Pagesprops { }

const Menu :React.FC <Pagesprops> = () => {
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
  direct : '',
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
    bg = 'coolGray.100'
    >
      <Menubar/>
        <VStack paddingY={5}>
          <Box
          id = 'profile-section'
          w = '100%'
          h = {200}
          >
            <Userfield
              data = {userdata}
              />
          </Box>
          <Box
          id = 'Options-section'
          w = '100%'
          
          >
            {Menuitems.map((item) => {
              return (
                <Optionfield
                title  = {item.title}
                OptionIcon = {item.IconProperty}
              />    
              )
            })}
             
          </Box>
            
        </VStack>

    </Box>
  )
}

export default Menu;
