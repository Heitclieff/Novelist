import React, { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Box, Pressable } from 'native-base'
import FastImage from 'react-native-fast-image';

interface containerProps {
    image : string
    onModalPress : any
}

const Background: React.FC<containerProps> = ({image , onModalPress}) => {
    const theme: any = useContext(ThemeWrapper);
    return (
        <Pressable
            w='100%'
            onPress = {() => onModalPress()}
        >
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box w='100%' h={200} bg={theme.themeMode === 'dark' ? isPressed ? 'trueGray.600' :  'trueGray.800' : "trueGray.300"} overflow ='hidden'>
                       {image && 
                            <FastImage
                            id = 'item-image'
                            alt = "images"
                            resizeMode={FastImage.resizeMode.cover}
                            source={{
                                 uri : image  , 
                                 header :{Authorization : "someAuthToken"},
                                 priority : FastImage.priority.normal}}
                            style={{
                                 width : '100%' , 
                                 height : '100%',
                                 opacity : isPressed ? 0.6 : 1
                            }}
                        />
                       }
                  
                    </Box>
                )
            }}
        </Pressable>

    )
}


export default Background