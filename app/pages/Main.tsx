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

}


const Main: React.FC <Pageprops> = ({navigation}) => {
  const {colorMode , toggleColorMode} = useColorMode();

  const bg = colorMode === 'dark' ? Themecolor.bg.dark: Themecolor.bg.light  
  return (
    <Box>
      <Appbar bg=  {bg} />
      <Box w = '100%' h= '100%' py={3} bg = {bg}>
        <TabsControls/>
      </Box>
    </Box>
  )
}

export default Main;

