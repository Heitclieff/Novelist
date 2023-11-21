import React, {useContext} from 'react'
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
import { Image } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'

interface CollectionProps { 
  id : number | string,
  title : string,
  view : string,
  images : string,
  avatar : any,
}

const CollectionItem :React.FC <CollectionProps> = ({id, title , view, images, like ,avatar = null }) => {
  const theme:any = useContext(ThemeWrapper)
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
        w = {165}
        h = {290}
        p = {1}
        space= {3}
        bg={isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null}      
        >
            <Box 
            id = "Displaycase"
            h = {210}
            >
              <FastImage
              style={{width : '100%', height : '100%' }}
              source={{
                uri : images  , 
                header :{Authorization : "someAuthToken"},
                priority : FastImage.priority.normal}}
              alt = "images"
              resizeMode={FastImage.resizeMode.cover}
              />
            </Box>
            <HStack justifyContent={'space-between'} w = '100%'>
              <VStack  w = '95%'>
                  <Text
                  fontWeight={'semibold'}
                  color = {theme.Text.base}
                  numberOfLines={2}
                  >{title}</Text>
                  <HStack
                  alignItems={'center'}
                  space = {1}
                  >
                  <HStack alignItems={'center'} space = {2}>
                    <HStack alignItems={'center'} space = {1}>
                     <AntdesignIcon
                        color = {theme.Text.description}
                        name = 'eyeo'
                        />
                      <Text 
                        fontSize={'xs'}
                        color={theme.Text.description}
                        >{view}
                        </Text>
                   
                    </HStack>
                    <HStack alignItems={'center'} space = {1}>
                    <AntdesignIcon
                        color = {theme.Text.description}
                        name = 'heart'
                        />
                      <Text 
                        fontSize={'xs'}
                        color={theme.Text.description}
                        >{like}
                        </Text>
                       
                    </HStack>
                  </HStack>
                   
                  </HStack>
              </VStack>
              
            </HStack>
           
        </VStack>
        )
      }}
    </ Pressable>
   
  )
}

export default CollectionItem;