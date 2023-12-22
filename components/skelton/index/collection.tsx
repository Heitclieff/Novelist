import React,{useContext} from 'react'
import {
HStack, 
VStack , 
Text ,
Box,
Skeleton
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Dimensions } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export const CollectionSkelton = () => {
    const theme:any = useContext(ThemeWrapper);

    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const HEADER_HEIGHT = ScreenHeight / 1.7

  return (
    <HStack space = {2.5}>
        {[0,0,0].map((item , key) =>
            <Skeleton 
                key = {key}
                id = "Displaycase"    
                w = {165}
                h = {210}
                startColor = {theme.Bg.container}
            />   
        )}
    </HStack>
   
  )
}
