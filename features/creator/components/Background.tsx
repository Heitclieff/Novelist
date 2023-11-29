import React, { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Box, Pressable } from 'native-base'
import FastImage from 'react-native-fast-image';

interface containerProps {
    image : string
    onModalPress : any
    MAX_HEIGHT : number
}

const Background: React.FC<containerProps> = ({image , MAX_HEIGHT}) => {
    const theme: any = useContext(ThemeWrapper);
    return (
        <Pressable
            w='100%'
        >
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box w='100%' h={MAX_HEIGHT}  bg={theme.themeMode === 'dark' ?  'trueGray.800' : "trueGray.300"} position={'absolute'} zIndex={0} >
                        <FastImage
                            id='background-images'
                            alt="images"
                            resizeMode={FastImage.resizeMode.cover}
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity : 1,
                                position: 'relative',
                            }}
                            source={{
                                uri: image,
                                priority: FastImage.priority.normal
                            }}
                           
                        >

                            <Box width='100%' h={MAX_HEIGHT} bg='black' opacity={0.4} />
                        </FastImage>
                    </Box>
                )
            }}
        </Pressable>

    )
}


export default Background