import React ,{FC , useState} from 'react'
import { 
Box,
Button,
Text,
VStack
} from 'native-base'
import Appbar from '../components/main/[container]/Appbar'
import TabsControls from './[mainTabs]/TabsControls'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../systems/theme'
interface Pageprops { 
  navigation :any 
  theme :any

}


const Main: React.FC <Pageprops> = ({navigation , theme}) => {
  const bg = theme === 'dark' ? Themecolor.bg.dark: Themecolor.bg.light  
  const textcolor = theme === 'dark' ? Themecolor.infotext.dark: Themecolor.infotext.light  
  const Buttoncolor = theme === 'dark' ? 'coolGray.700': 'coolGray.200'  
  const Buttonicon = theme === 'dark' ? 'coolGray.200': 'coolGray.700'  
  const themelist = {bg : bg , textcolor : textcolor , Buttoncolor : Buttoncolor , Buttonicon : Buttonicon }

  return (
    <Box>
      <Appbar theme = {themelist} />
      <Box w = '100%' h= '100%' py={3} bg = {bg}>
        <TabsControls theme = {theme} />
      </Box>
    </Box>
  )
}

export default Main;

