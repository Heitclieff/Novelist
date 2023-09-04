import React,{useContext} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Icon,
IconButton,
Button, } from 'native-base'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface Createprops { 
  onRightButtonpress : any
}

const Creatornavigation : React.FC <Createprops> = ({onRightButtonpress}) => {
  const theme:any = useContext(ThemeWrapper)
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
              onPress={onRightButtonpress}
              size = 'sm'
              colorScheme={'cyan'}
              w = {30}
              h = {30}
              icon = {
                <AntdesignIcon 
                size = {15}
                color = 'white'
                name = 'plus'/>}
                />
        </HStack>
    </Box>
  )
}

export default Creatornavigation;