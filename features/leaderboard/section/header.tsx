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
                {data.length > 0 ? (
                <LeaderAvatarfield  
                image = {data[1].account.pf_image}
                username = {data[1].account.username}
                point = {data[1].score}
                size =  {100}
                color = {'teal.500'}
                index = {2}
                 />)
                :
                ( <LeaderAvatarfield  
                    image = {'null'}
                    username = {'unknow'}
                    point = {0}
                    size =  {100}
                    color = {'teal.500'}
                    index = {2}
                     />)
                }
            </Box>
            {data.length > 0 ? 
            (
            <LeaderAvatarfield size =  {120} 
            image = {data[0].account.pf_image}
            username = {data[0].account.username}
            point = {data[0].score}
            color = "amber.400"
            index = {1}
            />) :
            (
                <LeaderAvatarfield size =  {120} 
                image = {'null'}
                username = {"unknow"}
                point = {0}
                color = "amber.400"
                index = {1}
            />
            )
            }
            <Box mt = {10} >
                {data.length > 0 ?
                (
                    <LeaderAvatarfield 
                    image = {data[2].account.pf_image}
                    username = {data[2].account.username}
                    point = {data[2].score}
                    size =  {100}
                    color = "blue.400"
                    index = {3}
                    />) :
                (
                    <LeaderAvatarfield 
                    image = {'null'}
                    username = {"unknow"}
                    point = {0}
                    size =  {100}
                    color = "blue.400"
                    index = {3}
                    />
                )
                }
            </Box>
        </HStack>
    </Box>
  )
}

export default Leadheader;