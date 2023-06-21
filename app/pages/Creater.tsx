import React,{FC} from 'react'
import { 
Box,
Text,
VStack,
HStack,
Button,
Icon,
} from 'native-base'

//components
import Createrbar from '../components/creater/[container]/Createrbar'
import Usershowcase from '../components/global/[container]/Usershowcase'
import TabsControls from './[workspaceTabs]/TabsControls'

import { userdata } from '../../assets/VisualCollectionsdata'

interface Pageprops { }

const Creater : React.FC <Pageprops> = () => {
  return (
    <VStack w = '100%' h = '100%' bg = 'coolGray.200' space = {2}>
        <Box h = '12%'>
            <Createrbar/>
        </Box>
        
        <Box w = '100%' h = '15%' alignItems={'center'}>
            <Box w = '90%'>
                <Usershowcase
                username = {userdata[0].username}
                image={userdata[0].image}
                />
            </Box>
        </Box>
        <Box w = '100%' h = '73%' alignItems={'center'}>
            <Box w = '90%' h = '100%' bg = 'coolGray.100' mt = {2} rounded ='md'>
                <TabsControls/>
            </Box>
           
        </Box>
    </VStack>
  )
}

export default Creater;
