import React from 'react'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'
import { HStack , Box , Text } from 'native-base'
import { Image } from 'expo-image'

interface containerProps {
    collection : any
}

const CreaterSection : React.FC <containerProps> = ({collection}) => {
    const theme:any = useContext(ThemeContext)
  return (
    <HStack space= {2}>
    {collection.creater && collection.creater.map((item:any , key:number) => {
        return(
            <HStack h= '30' key = {key} alignItems={'center'} space = {1}>
                <Box  bg = 'black' h = '7' w ='7' rounded = 'full' overflow = 'hidden' alignItems={'center'}>
                    <Image
                        style={{width : '100%', height : '100%'}}
                        contentFit= 'cover'
                        source={item.image}
                        alt = "images"
                    />
                </Box>
                <Text color = {theme.Text.description}>{item.username}</Text>
            </HStack>  
        )
    }
    )}
            
</HStack>
  )
}


export default CreaterSection;