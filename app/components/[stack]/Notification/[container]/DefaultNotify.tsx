import React, {useContext} from 'react'
import { Box, HStack,Text, VStack , Icon,  IconButton } from 'native-base'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { Image } from 'expo-image'
import { Feather } from '@expo/vector-icons'

interface containerProps {}

const DefaultNotify : React.FC <containerProps> = () => {
    const theme:any = useContext(ThemeContext)
  return (
    <HStack w = '100%' h = {70} pl = {5} mt  = {5}>
        <Box w = '20%' h = '100%'>
            <Box w = '70' h = '70'>
                <Image
                        id='background-images'
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        contentFit='cover'
                        source={'https://www.jollyboxdesign.com/wp-content/uploads/2021/08/Administrator.png'}
                        alt="images"
                />
            </Box>
        </Box>
        <VStack w=  '70%' justifyContent={'center'}>
            <HStack space = {1}>
                <Text color = {theme.Text.base}>Name Change Project Permission to public.</Text>
            </HStack>
            <Text color = {theme.Text.base}>Today</Text>
        </VStack>
        <Box w = '10%'  justifyContent={'center'} alignItems={'center'}>
        <IconButton 
                    size = 'sm'
                    w = '30'
                    h = {30}
                    rounded={'full'}
                    icon = {
                        <Icon
                        as={Feather}
                        name='more-horizontal'
                        size={'xl'}
                        color = {'coolGray.300'}
                        ></Icon>
                    }
                />
        </Box> 
    </HStack>
  )
}

export default DefaultNotify;
