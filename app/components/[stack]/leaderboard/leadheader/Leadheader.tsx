import React from 'react'
import { Box , HStack, Text } from 'native-base';
import { Image } from 'expo-image';
import AvatarContainer from './AvatarContainer';

interface containerProps { }
const Leadheader : React.FC <containerProps> = () => {
  return (
    <Box flex = {1} position = 'relative'>
        <Box w = '100%' h = '100%' bg = 'black'>
            <Image source={'https://anime-nani.net/wp-content/uploads/2023/04/Jigokuraku.jpg.webp'} style={{width : '100%' , height : '100%' , opacity : 0.4}}/>
        </Box>
        <HStack w = '100%' h ='100%' space = {5} position = 'absolute' zIndex={10} justifyContent={'center'} alignItems={'center'} safeAreaTop>
            <Box mt = {10}>
                <AvatarContainer size =  {100}/>
            </Box>
            <AvatarContainer size =  {120}/>
            <Box mt = {10} >
                <AvatarContainer size =  {100}/>
            </Box>
        </HStack>
    </Box>
  )
}

export default Leadheader;
