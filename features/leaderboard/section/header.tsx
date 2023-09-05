import React,{useContext} from 'react'
import { 
Box , 
HStack,
Text } from 'native-base';
import { Image } from 'react-native';
import LeaderAvatarfield from '../components/Avatarfield';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import Animated from 'react-native-reanimated';

interface containerProps { 
    data : any
}
const Leadheader : React.FC <containerProps> = ({data}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <Box flex = {1} position = 'relative'>
        <HStack w = '100%' h ='100%' space = {5} position = 'absolute' zIndex={10} justifyContent={'center'} alignItems={'center'} safeAreaTop>
            <Box mt = {10}>
                <LeaderAvatarfield  
                size =  {100}
                color = {'teal.500'}
                index = {3}
                 />
            </Box>
            <LeaderAvatarfield size =  {120} 
            image = {data.image}
            username = {data.username}
            point = {20021}
            color = "amber.400"
            index = {1}
            />
            <Box mt = {10} >
                <LeaderAvatarfield 
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