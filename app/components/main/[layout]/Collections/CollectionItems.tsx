import React, {FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Button,
Icon,
Image,
IconButton,
Pressable,
 } from 'native-base'
import { FontAwesome5 , Feather , AntDesign} from '@expo/vector-icons'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../../systems/theme'

interface CollectionProps { 
  title : string,
  view : string,
  images : string,
  avatar : any,
}

const CollectionItems :React.FC <CollectionProps> = ({title , view, images ,avatar = null }) => {
  const {colorMode} = useColorMode()
  return (
    <Pressable >
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return (
        <VStack
        w = {160}
        h = {280}
        space=  {3}
        bg={isPressed ? colorMode === 'dark' ? "coolGray.700" : "coolGray.200" : isHovered ? colorMode === 'dark' ? "coolGray.800" : "coolGray.200"  : colorMode === 'dark'? 'coolGray.800' : "coolGray.100"}
        rounded={'md'}
        alignItems={'center'}
        >
            <Box 
            id = "Displaycase"
            w = {150}
            h = {200}
            borderColor={'gray.200'}
            >
              <Image
              w = '100%'
              h=  '100%'
              resizeMode= 'cover'
              source={{uri : images}}
              alt = "images"
              />
            </Box>
            <HStack justifyContent={'space-between'} w = '100%'>
              <VStack  w = '90%'>
                  <Text
                  fontWeight={'semibold'}
                  color = {colorMode === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light}
                  numberOfLines={2}
                  >{title}</Text>
                  <HStack
                  alignItems={'center'}
                  space = {1}
                  >

                    <Text 
                    fontSize={'xs'}
                    color={colorMode === 'dark' ? Themecolor.collection.viewtext.dark : Themecolor.collection.viewtext.light}
                    >{view}
                    </Text>
                    <Icon
                    size = 'xs'
                    as = {AntDesign}
                    name = 'eyeo'
                    />
                  </HStack>
              </VStack>
              <IconButton 
              size = 'sm'
              w = '10%'
              h = {25}
              icon = {
                <Icon 
                as = {Feather} 
                color = {colorMode === 'dark' ?  'gray.400' : 'gray.700'}
                name = 'more-vertical'/>}
                />
            </HStack>
           
        </VStack>
        )
      }}
    </ Pressable>
   
  )
}

export default CollectionItems;