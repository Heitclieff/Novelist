import React,{useContext} from 'react'
import { 
Box, 
VStack,
Text,
Pressable,
} from 'native-base';

import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { Image } from 'react-native';
import FastImage from 'react-native-fast-image';

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
          <FastImage
                  style={{width : '100%', height : '100%' }}
                  source={{
                    uri : image  ,
                    priority : FastImage.priority.normal,
                  }}
                  alt = "images"
                  resizeMode={FastImage.resizeMode.cover}
                />
        </Box>
        <VStack alignItems={'center'}>
            <Text fontWeight={'semibold'} color = {'white'}>{username}</Text>
            <Text color = {'white'}>{point}</Text>
        </VStack>
    </VStack>

  )
}

export default LeaderAvatarfield;