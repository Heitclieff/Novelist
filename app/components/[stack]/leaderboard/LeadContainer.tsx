import React,{useContext} from 'react'
import { Box, HStack,VStack ,Text, Divider } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { Image } from 'expo-image'
interface containerProps {
    index: number
}
const LeadContainer : React.FC <containerProps> = ({index}) => {
    const theme:any = useContext(ThemeContext);
  return (
    <VStack  w=  '95%' h = '85' bg = {theme.Bg.container} alignItems={'center'} justifyContent={'center'} rounded= 'lg' >
        <HStack alignItems={'center'}>
            <Box w  = '10%' alignItems={'center'}>
                <Text fontSize={'lg'} fontWeight={'semibold'} color = {theme.Text.base}>{index}</Text>
            </Box>
            <Box w = '20%'  alignItems={'center'}>
                <Box w = '50' h = '50' bg = 'gray.200' rounded= 'full'>
                    
                </Box>
            </Box>
            <HStack w ='70%'space = {3} pl = {3} justifyContent={'space-between'} pr = {5}>
                <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'normal'}>unknown</Text>
                <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>0</Text>
            </HStack>
        </HStack>
    </VStack>
  )
}

export default LeadContainer;
