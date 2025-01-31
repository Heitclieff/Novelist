import React, {useRef , useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Box} from 'native-base'
import { Animated } from 'react-native'
import { ImageBackground } from 'react-native'
import FastImage from 'react-native-fast-image'

interface containerProps {
    background : string,
    scrollY  : any,
}


const ParallaxBackground : React.FC <containerProps> = ({background , scrollY}) => {
  const AnimatedBackground = Animated.createAnimatedComponent(FastImage)
  const theme:any = useContext(ThemeWrapper);
  // console.log('background',background)
  const handleImageLoad = () => {
    console.log('Image loaded successfully');
  }
  
  const handleImageError = (error) => {
    console.error('Error loading image:', error);
  }

  return (
    <Box 
    w = '100%' 
    h = '100%' 
    position={'absolute'}
    bg= {theme.Bg.container}
    overflow = 'hidden'
    >
      {background &&
        <AnimatedBackground
          id='background-images'
          source={{
            uri: background,
            priority: FastImage.priority.normal,
          }}
          alt="images"
          resizeMode={FastImage.resizeMode.cover}
          style={{
            width: '100%',
            height: '100%',
            opacity: 1,
            position: 'relative',
            transform: [{
              scale: scrollY.interpolate({
                inputRange: [-500, 0],
                outputRange: [5, 1],
                extrapolateLeft: 'extend',
                extrapolateRight: 'clamp',
              })
            }]
          }}>
          <Box flex={1} bg='black' opacity={0.3}></Box>
        </AnimatedBackground>
      }

    </Box>
  )
}

export default ParallaxBackground;