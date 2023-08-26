import React, {useContext} from 'react'
import { Box, HStack,Text, VStack , Icon,  IconButton } from 'native-base'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { Image } from 'expo-image'
import { Feather } from '@expo/vector-icons'

interface containerProps {}

const DefaultNotify : React.FC <containerProps> = () => {
    const theme:any = useContext(ThemeContext)
  return (
    <HStack w = '100%'  h= {70}   mt  = {2} bg = {theme.Bg.container} rounded={'full'} justifyContent={'center'}>
        <Box w = '20%' h = '100%' justifyContent={'center'} alignItems={'center'}>
            <Box w = '50' h = '50'>
                <Image
                        id='background-images'
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        contentFit='cover'
                        source={'https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Administrator.png'}
                        alt="images"
                />
            </Box>
        </Box>
        <VStack w=  '80%' justifyContent={'center'}>
            <HStack w = '100%' space = {1}>
                <Text color = {theme.Text.base} >Name Change Project Permission to public.</Text>
            </HStack>
            <Text color = {theme.Text.description} fontSize={'xs'}>Today</Text>
        </VStack>
    </HStack>
  )
}

export default DefaultNotify;
