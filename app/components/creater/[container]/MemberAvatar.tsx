import React from 'react'
import { Box } from 'native-base'
import { Image } from 'expo-image'
interface containerProps {
     image : string
}
const MemberAvatar : React.FC <containerProps> =({image}) => {
  return (
    <Box w=  '25' h = '25' bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
          <Image
          id ='Avatar-image'
          style={{width : '100%' , height : '100%'}}
          source={image}
          />
    </Box>
  )
}

export default MemberAvatar;
