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

interface CollectionProps { 
  title : string,
  view : string,
  images : string
}

const CollectionItems :React.FC <CollectionProps> = ({title , view, images}) => {
  return (
    <Pressable >
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return (
        <VStack
        w = '160px'
        space=  {3}
        bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
        rounded={'md'}
        alignItems={'center'}
        >
            <Box 
            id = "Displaycase"
            w = "150px"
            h = "200px"
            rounded={'sm'}
            borderWidth={'1px'}
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
                  color = 'gray.700'
                  numberOfLines={2}
                  >{title}</Text>
                  <HStack
                  alignItems={'center'}
                  space = {1}
                  >

                    <Text 
                    fontSize={'xs'}
                    color={'gray.500'}
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
              h = '25px'
              icon = {
                <Icon 
                as = {Feather} 
                color = {'gray.700'}
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