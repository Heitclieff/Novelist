import React , {FC} from 'react'
import { 
Box,
Text,
 } from 'native-base'
import { Image } from 'expo-image';

interface BannerProps {
     images : any;
}

const Banner : React.FC <BannerProps> = ({images}) => {

  return (
     <Box w = '100%' h  = {250} p = {2} display = 'flex' justifyContent={'center'}>
          <Box w = '100%' bg = 'gray.300' h = {200} rounded= 'sm' overflow={'hidden'}>
               <Image 
               style={{width : '100%' , height : '100%' , flex : 1}}
               source={images.banner}
               />
          </Box>
     </Box>
  )
}

export default Banner;