import React,{useContext} from 'react'
import { 
VStack , 
Text ,
Box,
Skeleton
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const HeaderSkelton = () => {
    const theme:any = useContext(ThemeWrapper);

    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const HEADER_HEIGHT = ScreenHeight / 1.7

  return (
    <Box w={ScreenWidth} h={HEADER_HEIGHT} overflow={'hidden'} alignItems={'center'} position='relative'>
        <Box w={ScreenWidth} h='100%' overflow={'hidden'} position={'absolute'} bg={'trueGray.800'}>
            
        </Box>
        <Box w='100%' h='100%' position='absolute' zIndex={10}>
            <LinearGradient colors={['transparent',theme.Bg.header]} style = {{width : '100%' , height : HEADER_HEIGHT}}/>           
        </Box>

        <Box safeAreaTop w='100%' h='100%' position={'absolute'} mt={2} zIndex={10}>
            <VStack w="100%" h='100%' justifyContent={'center'} alignItems={'center'} >
                <Skeleton w='60%' h='70%' startColor={theme.Bg.container} rounded={'xs'} >
                </Skeleton>
            </VStack>
        </Box>
    </Box>
  )
}
