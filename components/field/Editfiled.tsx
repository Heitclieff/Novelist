import React, {useContext} from 'react'
import { 
Box,
HStack,
Text,
Input,
VStack,
Divider,
Pressable
} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface containerProps {
    options  : any
    height : number
    inputStyle : string
    inputColor : string
 }

const Editfield : React.FC <containerProps> = ({options , inputStyle = 'flex-start' , inputColor = 'blue.500'}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('EditPage',{options})}>
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
    return(
        <Box pl = {2} justifyContent ={options.height ? 'flex-start' : 'center'}  h = {options.height ? options.height : '10'}  bg={isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null} >
        <HStack pl={4} mr = {4} alignItems={'center'} justifyContent={inputStyle} pt = {1} space = {2}>
            <Box w = '22%' >
                <Text
                fontWeight={'semibold'}
                color = {theme.Text.base}
                >{options.title}</Text>
            </Box>
            <Box>
                <Text color={inputColor}>{options.value}</Text>
            </Box>
            
        </HStack>
      </Box>
    )
    
    }}
    </Pressable>
  )
}

export default Editfield;