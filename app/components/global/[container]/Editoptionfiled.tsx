import React from 'react'
import { 
Box,
HStack,
Text,
Input,
VStack,
Divider,
Pressable
} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
interface containerProps {
    options  : any
    height : number
 }

const Editoptionfiled : React.FC <containerProps> = ({options}) => {
    const theme:any = useContext(ThemeContext);
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Edittingtemplete',{options})}>
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
    return(
        <Box justifyContent ={options.height ? 'flex-start' : 'center'}  h = {options.height ? options.height : '10'}  bg={isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null} >
        <HStack  pl={6} alignItems={'center'} pt = {1} space = {2}>
            <Box w = '20%' >
                <Text
                fontWeight={'semibold'}
                color = {theme.Text.base}
                >{options.title}</Text>
            </Box>
            <Box>
                <Text color={'blue.500'}>{options.value}</Text>
            </Box>
            
        </HStack>
      </Box>
    )
    
    }}
    </Pressable>
  )
}

export default Editoptionfiled;
