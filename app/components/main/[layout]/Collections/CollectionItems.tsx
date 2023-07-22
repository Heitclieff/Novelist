import React, {FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Button,
Icon,
IconButton,
Pressable,
 } from 'native-base'
import { FontAwesome5 , Feather , AntDesign} from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useContext } from 'react'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native'


interface CollectionProps { 
  id : number | string,
  title : string,
  view : string,
  images : string,
  avatar : any,
}

const CollectionItems :React.FC <CollectionProps> = ({id, title , view, images ,avatar = null }) => {
  const theme:any = useContext(ThemeContext)
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Novelmain' ,{id})}>
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
        bg={isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null}
        rounded={'md'}
        
        >
            <Box 
            id = "Displaycase"
            w = {150}
            h = {200}
            >
              <Image
              style={{width : '100%', height : '100%'}}
              contentFit= 'cover'
              source={images}
              alt = "images"
              />
            </Box>
            <HStack justifyContent={'space-between'} w = '100%'>
              <VStack  w = '90%'>
                  <Text
                  fontWeight={'semibold'}
                  color = {theme.Text.base}
                  numberOfLines={2}
                  >{title}</Text>
                  <HStack
                  alignItems={'center'}
                  space = {1}
                  >

                    <Text 
                    fontSize={'xs'}
                    color={theme.Text.description}
                    >{view}
                    </Text>
                    <Icon
                    size = 'xs'
                    color = {theme.Text.description}
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
                color = {theme.Text.description}
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