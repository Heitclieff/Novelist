import React,{useRef} from 'react'
import { 
Box , 
VStack ,
Text ,
Center,
Pressable,
 } from 'native-base'
import FastImage from 'react-native-fast-image'
import { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface Itemsprops {
    images : string 
    title : string 
    id : string
}

const CategoryItems : React.FC <Itemsprops> = ({images , title , id}) =>{
  const theme:any = useContext(ThemeWrapper)
  const navigation = useNavigation();

  return (
    <Pressable onPress={()=> navigation.navigate('Template',{title, path : 'Novels' , option : id})}>
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
                <FastImage
                  style={{width : '100%', height : '100%' }}
                  source={{
                    uri : images  , 
                    header :{Authorization : "someAuthToken"},
                    priority : FastImage.priority.normal
                  }}
                  alt = "images"
                  resizeMode={FastImage.resizeMode.cover}
                />
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