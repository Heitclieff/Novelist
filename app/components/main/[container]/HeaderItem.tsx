import React,{useContext} from 'react'
import { Box , Text, VStack ,HStack , Icon, View, theme} from 'native-base'
import { ImageBackground } from 'react-native'
import { Dimensions  , Animated} from 'react-native'
import { Image } from 'expo-image'
import { BlurView } from 'expo-blur'
import { AntDesign } from '@expo/vector-icons'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'native-base'
interface containerProps {
    data : any
    id : number,
    translateX  : any
}
const HeaderItem : React.FC <containerProps> = ({data , id, translateX}) => {
  const theme:any =  useContext(ThemeContext)
  const ScreenWidth = Dimensions.get('window').width
  const ScreenHeight = Dimensions.get('window').height
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('Novelmain' ,{id})}>
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
      return(
          <Box  w = {ScreenWidth}  h = {ScreenHeight / 1.7}  overflow={'hidden'} alignItems={'center'}  position='relative'>
          <Box  w ={ScreenWidth} h = '100%'  overflow={'hidden'} position={'absolute'}>
              <ImageBackground
              id  = 'Backdrop-image'
              style={{width : '100%', height : '100%',  position : 'relative'}}
              source={{uri : data.images}}
              alt = "images"
              >
                <BlurView  intensity={25} tint= {theme.themeMode} style = {{zIndex : 2}}>
                    <Box w = '100%' h = {'100%'}></Box>
                </BlurView>
              </ImageBackground> 
              </Box>
              <Box w='100%' h = '100%' position= 'absolute' zIndex={10}
                        bg={{
                            linearGradient: {
                                colors: ['transparent', theme.Bg.base],
                                start: [0, 0, 0, 0.5],
                                end: [0, 0 , 0 ,0],
                            },
              }}></Box>
        
          {/* <Box w = '100%' h=  '100%' bg= 'black' position={'absolute'} opacity={0.4} zIndex={2}/> */}
          <Box safeAreaTop  w = '100%' h= '100%' position={'absolute'} mt =  {2} zIndex={10}>
              <VStack w = "100%" h = '100%' justifyContent={'center'} alignItems={'center'} >
                  <Box w = '60%' h = '70%' bg = 'gray.200' rounded={'xs'} overflow={'hidden'} >
                    <Image
                    id = 'Item-image'
                    style={{width : '100%', height : '100%'}}
                    contentFit= 'cover'
                    source={data.images}
                    alt = "images"
                    /> 
                </Box>
                <VStack w = '60%'  mt = {2} >
                  <Text fontWeight={'semibold'} fontSize={'lg'}  numberOfLines={1} color = 'white'>{data.title}</Text>
                    <HStack
                      alignItems={'center'}
                      space = {1}
                      >
                        <Text 
                        fontSize={'sm'}
                        color = 'white'
                        >{data.view}
                        </Text>
                        <Icon
                        size = 'sm'
                        color = 'white'
                        as = {AntDesign}
                        name = 'eyeo'
                        />
                      </HStack>
                
              </VStack>
              </VStack>
              
              
        
          </Box>
      </Box>
      )}
        }
  </Pressable>
  )
}

export default HeaderItem;
