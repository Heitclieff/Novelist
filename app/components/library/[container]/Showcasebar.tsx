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

interface Showcaseprops {
    books : string,
    username : string,
    image : string
}

const Showcasebar :React.FC <Showcaseprops> = ({books , username, image}) => {
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
            >{username ? username : 'Username'}</Text>
            <HStack space = {2} alignItems={'center'}>
                <Box>
                    <Icon
                    as = {Ionicons}
                    name = 'ios-library'
                    color = 'gray.600'
                    />
                </Box>
                <HStack space = {1}>
                    <Text 
                    color = 'gray.700'
                    fontWeight={'semibold'}
                    >{books ? books : 0}</Text>
                    <Text color = 'gray.700'>books in Library</Text>
                </HStack>
            </HStack>
        </VStack>
    </HStack>
  )
}

export default Showcasebar;
