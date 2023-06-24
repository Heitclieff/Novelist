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

interface Pageprops { 
    theme : any
}

const Creater : React.FC <Pageprops> = ({theme}) => {
  return (
    <VStack w = '100%' h = '100%' bg = {theme.Bg.base} space = {2}>
        <Box h = '12%'>
            <Createrbar theme = {theme} />
        </Box>
        
        <Box w = '100%' h = '15%' alignItems={'center'}>
            <Box w = '90%'>
                <Usershowcase
                theme = {theme}
                username = {userdata[0].username}
                image={userdata[0].image}
                />
            </Box>
        </Box>
        <Box w = '100%' h = '73%' >
             <TabsControls theme = {theme}/>
        </Box>
    </VStack>
  )
}

export default Creater;
