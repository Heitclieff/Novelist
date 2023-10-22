import React from 'react'
import { Box } from 'native-base'
import { Image } from 'react-native'

interface containerProps {
     image : string
     size  : number | string
}
const Avatarfield : React.FC <containerProps> =({image , size = 25}) => {
  // console.log('avatar',image)
  return (
    <Box w=  {size} h = {size} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
          <Image
          id ='Avatar-image'
          style={{width : '100%' , height : '100%'}}
          source={{uri:image}}
          />
    </Box>
  )
}

export default Avatarfield;