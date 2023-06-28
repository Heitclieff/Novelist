import React,{FC} from 'react'
import { 
Box,
Center,
Text,
HStack,
Image,
VStack,
Icon,
} from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

interface Showcaseprops {
    data  : any
}

const Usershowcase :React.FC <Showcaseprops> = ({data}) => {
    const theme:any = useContext(ThemeContext)
  return ( data.map((item:any , key:number) => 
  <HStack 
  key = {key}
  w = '100%' 
  h = {130} 
  alignItems={'center'}
  rounded = 'md'
  space = {2}
  p = {3}>
      <Box w =  '30%'>
          <Box
           id = 'images-container'
           w = {100}
           h = {100}
           rounded = 'full'
           bg = 'gray.200'
           overflow = 'hidden'
          >
              {item.image && <Image
                  w = '100%'
                  h=  '100%'
                  resizeMode= 'cover'
                  source={{uri : item.image}}
                  alt = "image"
            />}
          </Box>    
      </Box>
      <VStack
      w = '70%'
      space = {1}
      >
          <Text
          fontSize={'lg'}
          fontWeight={'semibold'}
          color = {theme.Text.base}
          >{item.username ? item.username : 'Username'}</Text>
          <VStack justifyContent ={'center'}>
              <HStack space = {1}>
                  <Text
                  color = {theme.Text.base}
                  fontWeight={'semibold'}
                  >0</Text>
                  <Text color = {theme.Text.base}>Project</Text>
              </HStack>
              <HStack space = {1}>
                  <Text
                  color = {theme.Text.base}
                  fontWeight={'semibold'}
                  >0</Text>
                  <Text color = {theme.Text.base}>Collaboration</Text>
              </HStack>
          </VStack>
      </VStack>
  </HStack>
  
  
  
  )
   
  )
}

export default Usershowcase;
