import React,{useContext} from 'react'
import {
HStack, 
Skeleton
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Dimensions } from 'react-native'

interface skeltonProps {
  args : number[]
}

export const CollectionSkelton : React.FC <skeltonProps> = ({args}) => {
  const theme:any = useContext(ThemeWrapper);

  return (
    <HStack space = {2.5}>
        {args?.map((item , key) =>
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
