import React , {FC} from 'react'
import { 
Box,
Text,
Image
 } from 'native-base'


interface BannerProps {
     images : any;
}

const Banner : React.FC <BannerProps> = ({images}) => {
  return (
     <Box w = '100%' h  = {250} p = {2} display = 'flex' justifyContent={'center'}>
          <Box w = '100%' bg = 'gray.300' h = {200} rounded= 'sm' overflow={'hidden'}>
               <Image 
               source={images.banner}
               resizeMode ='cover'
               w=  '100%'
               h=  '100%'
               alt="Banner Images"/>
          </Box>
     </Box>
  )
}

export default Banner;