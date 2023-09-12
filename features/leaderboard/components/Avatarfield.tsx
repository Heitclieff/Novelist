import React,{useContext} from 'react'
import { 
Box, 
VStack,
Text } from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { Image } from 'react-native';
interface containerProps {
    size  : number,
    image : string,
    username : string,
    point : number,
    color : string,
    index : number,
}

const LeaderAvatarfield : React.FC <containerProps> = ({size , image  = null , username = 'unknown', point = 0 , color , index}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <VStack space= {1} position = 'relative' alignItems={'center'}>
        <Box w = '25' h = '25' rounded = 'full' bg= {color} position=  'absolute' top = {-5} zIndex={'10'} justifyContent={'center'} alignItems={'center'}>
          <Text fontWeight={'semibold'}>{index}</Text>
        </Box>
        <Box w = {size} h = {size}  bg = 'gray.200' borderWidth={'3'} borderColor={color} rounded = 'full' overflow={'hidden'}>
          <Image source={{uri :image}} style={{width : '100%' , height : '100%'}}/>
        </Box>
        <VStack alignItems={'center'}>
            <Text fontWeight={'semibold'} color = {theme.Text.base}>{username}</Text>
            <Text color = {theme.Text.base}>{point}</Text>
        </VStack>
    </VStack>
    
  )
}

export default LeaderAvatarfield;