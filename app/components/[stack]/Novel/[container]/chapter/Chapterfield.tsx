import React from 'react'
import { HStack, Box, VStack, Text , Divider } from 'native-base'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'
import { Pressable } from 'native-base'
import { useNavigation } from '@react-navigation/native'

interface Fieldprops {
    id : number,
}
const Chapterfield : React.FC <Fieldprops> = ({id}) => {
    const theme:any = useContext(ThemeContext);
    const navigation = useNavigation();
  return (
    <Pressable>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return(
            <HStack w = '100%' space  ={2} pt = {3} pb = {3} bg={isPressed ? theme.Bg.containeraction : isHovered ? theme.Bg.containeractionaction  : theme.Bg.container} rounded= 'md'>
            <Box w = '15%' justifyContent={'center'} alignItems={'center'}>
                <Text color = {theme.Text.base} fontSize={'xl'} fontWeight={'semibold'}>{id}</Text>       
            </Box>
        
            <VStack>
                <Text fontWeight={'medium'} color = {theme.Text.base}>Chapter Name</Text>
                <Text color = {theme.Text.description}>Last updated</Text>
            </VStack>      
        </HStack>
    )}
    }
    </Pressable>
  )
 
}


export default Chapterfield;