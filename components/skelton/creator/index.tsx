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

export const CreatorSkeleton = () => {
    const theme:any = useContext(ThemeWrapper);

    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const MAX_HEIGHT  = ScreenHeight / 2.5;

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
        <Skeleton w = '100%' h = {MAX_HEIGHT} startColor={theme.Bg.containeraction}>
        </Skeleton>
        <Box mt =  {5}>
            <SpinnerItem />
        </Box>
       
    </Box>
  )
}