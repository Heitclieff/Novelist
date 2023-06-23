import React,{FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Icon,
IconButton,
Button, } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../systems/theme'

interface Createprops { }

const Createrbar : React.FC <Createprops> = () => {
  const {colorMode} = useColorMode();
  return  (
    <Box
    safeAreaTop
    w = '100%'
    p = {4}

    >
        <HStack w = '100%' alignItems={'center'} justifyContent={'space-between'}>
            <Text
            fontSize={'lg'}
            fontWeight={'semibold'}
            >   Workspace
            </Text>
            <IconButton 
              size = 'sm'
              colorScheme={'cyan'}
              w = {30}
              h = {30}
              icon = {
                <Icon 
                as = {AntDesign} 
                color = {colorMode === 'dark' ? Themecolor.icon.Addicon.dark : Themecolor.icon.Addicon.light}
                name = 'plus'/>}
                />
        </HStack>
    </Box>
  )
}

export default Createrbar;