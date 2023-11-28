import React from 'react'
import { Box , Pressable } from 'native-base'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'

interface containerProps {
     image : string
     size  : number | string
     action : any
}
const Avatarfield : React.FC <containerProps> =({image , size = 25 , action}) => {

  return (
    <Pressable onPress = {action}>
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
      return(
        <Box w= {size} h = {size} bg = 'gray.200' borderWidth = {1} rounded={'full'} position = "relative" overflow={'hidden'}>
            <Box 
            w=  {size} 
            h = {size} 
            bg = "black" 
            opacity = {isPressed ? 0.3 : isHovered ? 0.3  : 0} 
            position = "absolute" 
            zIndex = {10}
            />
            <FastImage
              id ='Avatar-image'
              alt = "images"
              resizeMode={FastImage.resizeMode.cover}
              source={{
                  uri : image  , 
                  header :{Authorization : "someAuthToken"},
                  priority : FastImage.priority.normal}}
              style={{
                  width : '100%' , 
                  height : '100%'
              }}
          />
        </Box>
    )}}
  </Pressable>
  )
}

export default Avatarfield;