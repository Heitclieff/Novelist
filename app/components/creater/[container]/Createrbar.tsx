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
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

interface Createprops { 
}

const Createrbar : React.FC <Createprops> = () => {
  const theme:any = useContext(ThemeContext)
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
            color = {theme.Text.heading}
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
                color = {theme.Icon.heading}
                name = 'plus'/>}
                />
        </HStack>
    </Box>
  )
}

export default Createrbar;