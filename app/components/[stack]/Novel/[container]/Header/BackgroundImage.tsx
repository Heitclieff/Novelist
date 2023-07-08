import React from 'react'
import { Box } from 'native-base'
import Animated from 'react-native-reanimated'
import { Image } from 'expo-image'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'

interface containerProps {
    translateY : any , 
    scale : any,
    src : string,
}

const BackgroundImage: React.FC<containerProps> = ({translateY , scale , src}) => {
    const theme:any = useContext(ThemeContext)

    return (
        <Box bg='black' h='100%' w='100%' alignItems={'center'} position="relative">
            <Box w='100%' h='100%' position={'absolute'} zIndex={10}
                bg={{
                    linearGradient: {
                        colors: ['transparent', 'transparent', theme.Bg.base],
                        start: [1, 0, 0],
                        end: [0, 0, 0],
                    },
                }}></Box>
            <Animated.View style={[{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }, { transform: [{ translateY }, { scale }] }]}>
                <Image
                    id='background-images'
                    style={{ width: '100%', height: '100%', opacity: 0.6, resizeMode: 'cover' }}
                    contentFit='cover'
                    source={src}
                    alt="images"
                />
            </Animated.View>

        </Box>
    )
}

export default BackgroundImage;
