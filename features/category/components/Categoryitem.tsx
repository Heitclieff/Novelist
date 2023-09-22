import React,{FC} from 'react'
import { 
Box , 
VStack ,
Text ,
Center,
Pressable,
 } from 'native-base'
import { Image } from 'react-native'
import { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface Itemsprops {
    images : string 
    title : string 
}

const CategoryItems : React.FC <Itemsprops> = ({images , title, proDoc}) =>{
  const theme:any = useContext(ThemeWrapper)
  const navigation = useNavigation();
  console.log('cate item',title)

  return (
    <Pressable onPress={()=> navigation.navigate('Template',{title})}>
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
      return (
            <VStack>
            <Box
            w = '100%'
            bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : null}
            overflow={'hidden'}
            p = {2}
            >
              <Box overflow={'hidden'} h = {180}>
                <Image
                  style={{width : '100%' , height : '100%'}}
                  contentFit = 'cover'
                  source={{uri:images}}
                  alt = "images"/>
              </Box>
              <Box p = {2}>
                <Center>
                    <Text color = {theme.Text.base}>{title ? title : "Title"}</Text>
                </Center>
            </Box>
            </Box>
          
        
        </VStack>
      )
    }}
    
    </Pressable>
    
  )
}

export default CategoryItems; 