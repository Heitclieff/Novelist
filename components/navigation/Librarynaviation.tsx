import React,{useContext} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Icon,
IconButton,
Button, } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'

interface Createprops { 
}

const Librarynavigation : React.FC <Createprops> = () => {
  const theme:any = useContext(ThemeWrapper)
  return  (
    <Box
    safeAreaTop
    w = '100%'
    pt = {4}
    pl = {4}
    >
        <HStack w = '100%' alignItems={'center'} justifyContent={'space-between'}>
            <Text
            fontSize={'lg'}
            fontWeight={'semibold'}
            color = {theme.Text.heading}
            >   Library
            </Text>
            {/* <IconButton 
              size = 'sm'
              colorScheme={'cyan'}
              w = {30}
              h = {30}
              icon = {
                <Icon 
                as = {AntDesign} 
                color = {theme.Icon.heading}
                name = 'plus'/>}
                /> */}
        </HStack>
    </Box>
  )
}

export default Librarynavigation;