import React,{useContext} from 'react'
import { 
Box, 
HStack,
VStack ,
Text,
Divider } from 'native-base'
import { Image } from 'react-native';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'

interface containerProps {
    index: number
}
const LeaderItem : React.FC <containerProps> = ({index, item}) => {
    const theme:any = useContext(ThemeWrapper);
  return (
    <VStack  w=  '95%' h = '85' bg = {theme.Bg.container} alignItems={'center'} justifyContent={'center'} rounded= 'lg' >
        <HStack alignItems={'center'}>
            <Box w  = '10%' alignItems={'center'}>
                <Text fontSize={'lg'} fontWeight={'semibold'} color = {theme.Text.base}>{index}</Text>
            </Box>
            <Box w = '20%'  alignItems={'center'}>
                <Box w = '50' h = '50' bg = 'gray.200' rounded= 'full'>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 50, height: 50, borderRadius: 25}}
                    />
                </Box>
            </Box>
            <HStack w ='70%'space = {3} pl = {3} justifyContent={'space-between'} pr = {5}>
                <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'normal'}>{item.username}</Text>
                <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>{item.score}</Text>
            </HStack>
        </HStack>
    </VStack>
  )
}

export default LeaderItem;