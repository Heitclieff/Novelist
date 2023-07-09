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
    <VStack  w=  '90%' h = '75' bg = {theme.Bg.base}alignItems={'center'} justifyContent={'center'} rounded= 'md' >
        <HStack alignItems={'center'} >
            <Box w  = '10%' alignItems={'center'}>
                <Text fontSize={'lg'} color = {theme.Text.base}>{index}</Text>
            </Box>
            <Box w = '20%'  alignItems={'center'}>
                <Box w = '60' h = '60' bg = 'gray.200' rounded= 'full'>
                    
                </Box>
            </Box>
            <HStack w ='70%'space = {3} pl = {3} justifyContent={'space-between'} pr = {5}>
                <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'normal'}>username</Text>
                <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>0</Text>
            </HStack>
        </HStack>
        <Divider bg=  {theme.Divider.base} mt = {2}/>
    </VStack>
  )
}

export default LeadContainer;
