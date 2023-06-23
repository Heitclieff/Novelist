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

interface Createprops { 
  theme :any
}

const Createrbar : React.FC <Createprops> = ({theme}) => {
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
            color = {theme === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light}
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
                color = {theme === 'dark' ? Themecolor.icon.Addicon.dark : Themecolor.icon.Addicon.light}
                name = 'plus'/>}
                />
        </HStack>
    </Box>
  )
}

export default Createrbar;