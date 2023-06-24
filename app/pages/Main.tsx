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
  return (
    <Box>
      <Appbar theme = {theme} />
      <Box w = '100%' h= '100%' py={3} bg = {theme.Bg.base}>
        <TabsControls theme = {theme} />
      </Box>
    </Box>
  )
}

export default Main;

