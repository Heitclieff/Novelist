import React,{FC} from 'react'
import { 
Box,
Center,
Text,
HStack,
Image,
VStack,
Icon,
} from 'native-base'
import { Ionicons ,Foundation } from '@expo/vector-icons'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../systems/theme'

interface Showcaseprops {
    username : string,
    image : string ,
    theme :any
}

const Usershowcase :React.FC <Showcaseprops> = ({username, image , theme}) => {
    const textcolor = theme === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light
  return (
    <HStack 
    w = '100%' 
    h = {130} 
    alignItems={'center'}
    bg = {theme.Bg.container}
    rounded = 'md'
    space = {2}
    p = {3}>
        <Box w =  '30%'>
            <Box
             id = 'images-container'
             w = {100}
             h = {100}
             rounded = 'full'
             bg = 'gray.200'
             overflow = 'hidden'
            >
                {image && <Image
                    w = '100%'
                    h=  '100%'
                    resizeMode= 'cover'
                    source={{uri : image}}
                    alt = "image"
              />}
            </Box>    
        </Box>
        <VStack
        w = '70%'
        space = {1}
        >
            <Text
            fontSize={'lg'}
            fontWeight={'semibold'}
            color = {theme.Text.base}
            >{username ? username : 'Username'}</Text>
            <VStack justifyContent ={'center'}>
                <HStack space = {1}>
                    <Text
                    color = {theme.Text.base}
                    fontWeight={'semibold'}
                    >0</Text>
                    <Text color = {theme.Text.base}>Project</Text>
                </HStack>
                <HStack space = {1}>
                    <Text
                    color = {theme.Text.base}
                    fontWeight={'semibold'}
                    >0</Text>
                    <Text color = {theme.Text.base}>Collaboration</Text>
                </HStack>
            </VStack>
        </VStack>
    </HStack>
  )
}

export default Usershowcase;
