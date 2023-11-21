import React,{useContext} from 'react'
import { 
VStack , 
Text ,
Box,
Skeleton,
Center
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SpinnerItem } from '../../Spinner'
export const ReaderSkeleton = () => {
    const theme:any = useContext(ThemeWrapper);

    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const HEADER_HEIGHT = ScreenHeight / 1.7

  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
        <Box w={ScreenWidth} h={HEADER_HEIGHT}  overflow={'hidden'} alignItems={'center'} position='relative'>
                <Box w={ScreenWidth} h='100%' overflow={'hidden'} position={'absolute'} bg={'trueGray.800'}>
                    
                </Box>
                <Box w='100%' h='100%' position='absolute' zIndex={10}>
                    <LinearGradient colors={['transparent',theme.Bg.header]} style = {{width : '100%' , height : HEADER_HEIGHT}}/>           
                </Box>

                <Box safeAreaTop w='100%' h='100%' position={'absolute'} mt={2} zIndex={10}>
                    <VStack w="100%" h='100%' justifyContent={'center'} alignItems={'center'} >
                    <Box w='150' h='220' overflow='hidden'>
                        <Skeleton w='100%' h='100%' startColor={theme.Bg.container} rounded={'xs'} >
                        </Skeleton>
                    </Box>
                    </VStack>
                </Box>
            </Box>

        <Center>
            <SpinnerItem/>
        </Center>
    </VStack>
    
  )
}
