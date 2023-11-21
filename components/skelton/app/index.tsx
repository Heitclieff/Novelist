import React,{useContext} from 'react'
import { 
VStack , 
Text ,
Box,
Skeleton
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SpinnerItem } from '../../Spinner'

export const AppSkeleton = () => {
    const theme:any = useContext(ThemeWrapper);

    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const HEADER_HEIGHT = ScreenHeight / 1.7

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
        <Box mt = {10}>
            <SpinnerItem/>
        </Box>
    </Box>
  )
}