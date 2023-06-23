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
import { useColorMode } from 'native-base'
import { Themecolor } from '../../systems/theme'
//visual data
import { userdata } from '../../assets/VisualCollectionsdata'

interface Pageprops { }

const Creater : React.FC <Pageprops> = () => {
    const {colorMode} = useColorMode();
  return (
    <VStack w = '100%' h = '100%' bg = {colorMode === 'dark' ? Themecolor.bg.dark : 'gray.100'} space = {2}>
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
        <Box w = '100%' h = '73%' >
                <TabsControls/>
        </Box>
    </VStack>
  )
}

export default Creater;
