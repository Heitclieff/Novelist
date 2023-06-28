import React,{FC} from 'react'
import { 
Box , 
VStack ,
Text ,
Center,
Pressable,
 } from 'native-base'
import { Image } from 'expo-image'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

interface Itemsprops {
    images : string 
    title : string 
}

const CategoryItems : React.FC <Itemsprops> = ({images , title}) =>{
  const theme:any = useContext(ThemeContext)
  return (
    <Pressable >
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
      return (
            <VStack>
            <Box
            w = '100%'
            h = {180}
            bg = 'gray.200'
            rounded= 'md'
            overflow={'hidden'}
            >
                <Image
                style={{width : '100%' , height : '100%'}}
                contentFit = 'cover'
                source={images}
                alt = "images"/>
            </Box>
            <Box p = {2}>
                <Center>
                    <Text color = {theme.Text.base}>{title ? title : "Title"}</Text>
                </Center>
            </Box>
        
        </VStack>
      )
    }}
    
    </Pressable>
    
  )
}

export default CategoryItems;