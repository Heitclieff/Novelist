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
    // console.log('leaderboard',data)
    const leaderboardData = data.leaderboard.slice(0, 3);
    // console.log(leaderboardData)
  return (
    <Box flex = {1} position = 'relative'>
        <HStack w = '100%' h ='100%' space = {5} position = 'absolute' zIndex={10} justifyContent={'center'} alignItems={'center'} safeAreaTop>
            <Box mt = {10}>
                <LeaderAvatarfield  
                image = {leaderboardData[1].image}
                username = {leaderboardData[1].username}
                point = {leaderboardData[1].score}
                size =  {100}
                color = {'teal.500'}
                index = {2}
                 />
            </Box>
            <LeaderAvatarfield size =  {120} 
            image = {leaderboardData[0].image}
            username = {leaderboardData[0].username}
            point = {leaderboardData[0].score}
            color = "amber.400"
            index = {1}
            />
            <Box mt = {10} >
                <LeaderAvatarfield 
                image = {leaderboardData[2].image}
                username = {leaderboardData[2].username}
                point = {leaderboardData[2].score}
                size =  {100}
                color = "blue.400"
                index = {3}
                />
            </Box>
        </HStack>
    </Box>
  )
}

export default Leadheader;