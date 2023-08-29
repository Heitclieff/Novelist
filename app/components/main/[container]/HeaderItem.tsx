import React,{useContext , useRef} from 'react'
import { Box , Text, VStack ,HStack , Icon, View, theme} from 'native-base'
import { ImageBackground } from 'react-native'
import { Dimensions} from 'react-native'
import { Image } from 'expo-image'
import { BlurView } from 'expo-blur'
import { AntDesign } from '@expo/vector-icons'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'native-base'
import Animated from 'react-native-reanimated'

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
  
  const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)
  return (
    <Pressable onPress={() => navigation.navigate('Novelmain' ,{id})}>
    {({
      isHovered,
      isFocused,
      isPressed
    }) => {
      return(
          <Box  w = {ScreenWidth}  h = {ScreenHeight / 1.7}  overflow={'hidden'} alignItems={'center'}  position='relative'>
          <Box  w ={ScreenWidth} h = '100%'  overflow={'hidden'} position={'absolute'} bg = {theme.Bg.base}>
                <AnimatedBackground
                  id='background-images'
                  source={{ uri: data.images}}
                  alt="images"
                  blurRadius={3}
                  style={{
                      width: '100%',
                      height: '100%',
                      opacity: 0.6,                
                      position: 'relative',
                }}/>
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
                        <HStack
                        alignItems={'center'}
                        space = {2}>
                            <Icon
                            size = 'sm'
                            color = {theme.Text.description}
                            as = {AntDesign}
                            name = 'eyeo'
                            />
                              <Text 
                              fontSize={'sm'}
                              color = {theme.Text.description}
                              >{data.view}
                              </Text>
                         
                        </HStack>
                        
                        <HStack
                          alignItems={'center'}
                          space = {1}>
                            <Icon
                              size = 'sm'
                              color = {theme.Text.description}
                              as = {AntDesign}
                              name = 'heart'/>
                            <Text 
                              fontSize={'sm'}
                              color = {theme.Text.description}>
                                4.7k
                            </Text>

                        </HStack>
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
