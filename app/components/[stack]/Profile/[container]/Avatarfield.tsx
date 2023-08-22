import React from 'react'
import { Box } from 'native-base';
import { Image } from 'expo-image';

interface containerProps {
    image : string,
}

const Avatarfield : React.FC <containerProps> = ({image}) => {
  return (
    <Box w= '100%' h = '100%' alignItems={'center'}>
      <Box 
        w = '100%' 
        h = '100%' 
        borderWidth={1}
        rounded={'full'}
        bg = 'gray.200' 
        overflow={'hidden'}>
            <Image
            style={{width : '100%' , height :"100%" , flex : 1}}
            source={image}
            />
        </Box>
    </Box>
 
  )
}

export default Avatarfield;
