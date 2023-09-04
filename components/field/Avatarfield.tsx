import React from 'react'
import { Box } from 'native-base'
import { Image } from 'react-native'

interface containerProps {
     image : string
}
const Avatarfield : React.FC <containerProps> =({image}) => {
  return (
    <Box w=  '25' h = '25' bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
          <Image
          id ='Avatar-image'
          style={{width : '100%' , height : '100%'}}
          source={{uri:image}}
          />
    </Box>
  )
}

export default Avatarfield;