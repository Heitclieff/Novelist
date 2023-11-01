import React, {useContext, useState, useEffect} from 'react'
import { Image } from 'react-native'
import { Pressable } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
HStack , 
Box , 
Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
//firestore
import firestore from '@react-native-firebase/firestore'

interface containerProps {
    collection : any
}

const Creatorsection : React.FC <containerProps> = ({collection}) => {
    const theme:any = useContext(ThemeWrapper)
    const navigation = useNavigation();
    // console.log('reader section creator', collection)
  return (
    <HStack space= {2}>
    {collection && collection.map((item:any , key:number) => {
        return(
            <Pressable onPress= {() => navigation.navigate('ProfileStack', {profile : item})}>
                {({
                  isHovered,
                  isFocused,
                  isPressed
                }) => {
                        return(
                            <HStack h= '30' key = {key} alignItems={'center'} rounded = 'md' space = {1} bg= {isPressed ? theme.Bg.container : isHovered ? theme.Bg.container  : null} >
                                <Box  bg = 'black' h = '7' w ='7' rounded = 'full' overflow = 'hidden' alignItems={'center'}>
                                    <Image
                                        style={{width : '100%', height : '100%'}}
                                        source={{uri :item.pf_image}}
                                        alt = "images"
                                    />
                                </Box>
                                <Text color = {theme.Text.description}>{item.username}</Text>
                            </HStack>  
                  )}}
            </Pressable>
        )
    }
    )}
            
</HStack>
  )
}


export default Creatorsection;