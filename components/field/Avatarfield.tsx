import React from 'react'
import { Box } from 'native-base'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'

interface containerProps {
     image : string
     size  : number | string
}
const Avatarfield : React.FC <containerProps> =({image , size = 25}) => {

  return (
    <Box w=  {size} h = {size} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
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
  )
}

export default Avatarfield;