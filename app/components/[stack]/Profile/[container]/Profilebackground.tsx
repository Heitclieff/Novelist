import React from 'react'
import { Box } from 'native-base'
import { Image } from 'expo-image'
interface containerProps {
    background : string,
}

const Profilebackground : React.FC <containerProps> = ({background}) => {
  return (
    <Box 
    w = '90%' 
    h = {170} 
    bg= 'coolGray.200'
    rounded = 'md'
    overflow = 'hidden'
    >
        <Image
        style={{width : '100%' , height : '100%' , flex: 1}}
        source={background}
        />
    </Box>
  )
}

export default Profilebackground;
