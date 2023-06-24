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
import { Ionicons } from '@expo/vector-icons'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../systems/theme'

interface Showcaseprops {
    books : string,
    username : string,
    image : string
    theme :any
}

const Showcasebar :React.FC <Showcaseprops> = ({books , username, image ,theme}) => {
  return (
    <HStack 
    w = '100%' 
    h = {150} 
    alignItems={'center'}
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
        space = {2}
        >
            <Text
            fontSize={'lg'}
            fontWeight={'semibold'}
            color = {theme.Text.base}
            >{username ? username : 'Username'}</Text>
            <HStack space = {2} alignItems={'center'}>
                <Box>
                    <Icon
                    as = {Ionicons}
                    name = 'ios-library'
                    color = {theme.Icon.base}
                    />
                </Box>
                <HStack space = {1}>
                    <Text 
                    color = {theme.Text.base}
                    fontWeight={'semibold'}
                    >{books ? books : 0}</Text>
                    <Text color = {theme.Text.base}>
                        Books in Library
                    </Text>
                </HStack>
            </HStack>
        </VStack>
    </HStack>
  )
}

export default Showcasebar;
