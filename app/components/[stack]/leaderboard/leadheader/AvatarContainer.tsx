import React,{useContext} from 'react'
import { Box, VStack,Text } from 'native-base';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
interface containerProps {
    size  : number,
}

const AvatarContainer : React.FC <containerProps> = ({size}) => {
    const theme:any = useContext(ThemeContext)
  return (
    <VStack space= {1}>
        <Box w = {size} h = {size}  bg = 'gray.200' borderWidth={'3'} borderColor={'amber.400'} rounded = 'full'>

        </Box>
        <VStack alignItems={'center'}>
            <Text color = {theme.Text.base}>Username</Text>
            <Text color = {theme.Text.base}>Point</Text>
        </VStack>
    </VStack>
    
  )
}

export default AvatarContainer;
