import React ,{FC , useState} from 'react'
import { 
Box,
Button,
Text,
VStack
} from 'native-base'
import Appbar from '../components/main/[container]/Appbar'
import TabsControls from './[mainTabs]/TabsControls'

interface Homeprops { 
  navigation :any
}


const Main: React.FC <Homeprops> = ({navigation}) => {
  
  return (
    <Box>
      <Appbar/>
      <Box w = '100%' h= '100%' py={3}>
        <TabsControls/>
      </Box>
    </Box>
  )
}

export default Main;

