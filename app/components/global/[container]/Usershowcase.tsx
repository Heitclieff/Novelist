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

interface Showcaseprops {
    username : string,
    image : string
}

const Usershowcase :React.FC <Showcaseprops> = ({username, image}) => {
  return (
    <HStack 
    w = '100%' 
    h = {130} 
    alignItems={'center'}
    borderWidth={'1'}
    borderColor={'gray.300'}
    bg = 'coolGray.100'
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
            >{username ? username : 'Username'}</Text>
            <VStack justifyContent ={'center'}>
                <HStack space = {1}>
                    <Text
                    color = 'gray.700'
                    fontWeight={'semibold'}
                    >0</Text>
                    <Text color = 'gray.700'>Project</Text>
                </HStack>
                <HStack space = {1}>
                    <Text
                    color = 'gray.700'
                    fontWeight={'semibold'}
                    >0</Text>
                    <Text color = 'gray.700'>Collaboration</Text>
                </HStack>
            </VStack>
        </VStack>
    </HStack>
  )
}

export default Usershowcase;
