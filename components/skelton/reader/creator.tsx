import React,{useContext} from 'react'
import { 
HStack,
VStack , 
Text ,
Box,
Skeleton,
Center
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SpinnerItem } from '../../Spinner'
export const CreatorSkeleton = () => {
    const theme:any = useContext(ThemeWrapper);

    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const HEADER_HEIGHT = ScreenHeight / 1.7

  return (
    <Skeleton w = "70px" h= '30'  alignItems={'center'} rounded = 'full'  startColor = {theme.Bg.container}>
    </Skeleton>  
  )
}
