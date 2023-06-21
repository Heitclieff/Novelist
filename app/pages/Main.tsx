import React ,{FC , useState} from 'react'
import { 
Box,
Button,
Text,
VStack
} from 'native-base'
import Appbar from '../components/main/[container]/Appbar'
import TabsControls from './[mainTabs]/TabsControls'

interface Pageprops { 
  navigation :any
}


const Main: React.FC <Pageprops> = ({navigation}) => {
  
  return (
    <Box>
      <Appbar/>
      <Box w = '100%' h= '100%' py={3} bg = 'coolGray.100'>
        <TabsControls/>
      </Box>
    </Box>
  )
}

export default Main;

