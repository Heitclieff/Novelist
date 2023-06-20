import React,{FC} from 'react'
import { 
Box , 
VStack ,
Text ,
Center,
Image,
Pressable,
 } from 'native-base'

interface Itemsprops {
    images : string 
    title : string
}

const CategoryItems : React.FC <Itemsprops> = ({images , title}) =>{
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
                w = '100%'
                h=  '100%'
                resizeMode= 'cover'
                source={{uri : images}}
                alt = "images"/>
            </Box>
            <Box p = {2}>
                <Center>
                    <Text>{title ? title : "Title"}</Text>
                </Center>
            </Box>
        
        </VStack>
      )
    }}
    
    </Pressable>
    
  )
}

export default CategoryItems;