import React from 'react'
import { Box , HStack, Text } from 'native-base';
import { Image } from 'expo-image';
import AvatarContainer from './AvatarContainer';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import { useContext } from 'react';
import Animated from 'react-native-reanimated';

interface containerProps { 
    data : any
}
const Leadheader : React.FC <containerProps> = ({data}) => {
    const theme:any = useContext(ThemeContext)
  return (
    <Box flex = {1} position = 'relative'>
        {/* <Box w = '100%' h = '100%' position = 'absolute' zIndex={'10'} bg={{
                    linearGradient: {
                        colors: ['transparent', 'transparent', theme.Bg.base],
                        start: [1, 0, 0],
                        end: [0, 0, 0],
                    },
                }}></Box>
        <Animated.View style={[{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' , backgroundColor : 'black'}]}>
            <Image source={data.image} style={{width : '100%' , height : '100%' , opacity : 0.35}}/>
        </Animated.View> */}
        <HStack w = '100%' h ='100%' space = {5} position = 'absolute' zIndex={10} justifyContent={'center'} alignItems={'center'} safeAreaTop>
            <Box mt = {10}>
                <AvatarContainer  
                size =  {100}
                color = {'teal.500'}
                index = {3}
                 />
            </Box>
            <AvatarContainer size =  {120} 
            image = {data.image}
            username = {data.username}
            point = {20021}
            color = "amber.400"
            index = {1}
            />
            <Box mt = {10} >
                <AvatarContainer 
                size =  {100}
                color = "blue.400"
                index = {2}
                />
            </Box>
        </HStack>
    </Box>
  )
}

export default Leadheader;
