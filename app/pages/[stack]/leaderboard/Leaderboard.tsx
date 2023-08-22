import React,{useContext, useRef , useEffect} from 'react'
import { View } from 'react-native'
import { Box,Text,VStack } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import {Platform , StyleSheet } from 'react-native'
import Leadheader from '../../../components/[stack]/leaderboard/leadheader/Leadheader'
import LeadContainer from '../../../components/[stack]/leaderboard/LeadContainer'
import { useDispatch , useSelector } from 'react-redux'

import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'
import { getuserData } from '../../../../systems/redux/action'
import { ImageBackground } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

interface pageProps {}

const Leaderboard: React.FC <pageProps> = () => {
    const theme:any = useContext(ThemeContext);
   
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userdata = useSelector((state:any) => state.userData)
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )

    const MAX_HEIGHT  = 410;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = 300; 
   
    const scrollY = useRef(new Animated.Value(0)).current;
    const AnimatedBackground = Animated.createAnimatedComponent(ImageBackground)
    const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

    useEffect(() => {
        dispatch(getuserData());
    } , [dispatch , isReduxLoaded])

  return (
    <Box flex = {1} >
        <Box w = '100%' h = {MAX_HEIGHT}  position={'absolute'} justifyContent={'center'}>
         <Box w = '100%' h = '100%'  position = 'absolute' top = {0}>
            <Animated.View style = {[{width : '100%' , height : '100%'}, { transform: [
                  {
                    translateY: scrollY.interpolate({
                      inputRange: [0, 300],
                      outputRange: [0, -100],
                      extrapolate: 'clamp',
                    }),
                  },
                ], }]}>
                <AnimatedBackground
                    id='background-images'
                    source={{uri :userdata[0].image}}
                    alt="images"
                    style={{ 
                        width: '100%', 
                        height: '100%', 
                        opacity: 1,
                        position: 'relative',

                        transform: [{
                            scale : scrollY.interpolate({
                                inputRange : [-500 ,0],
                                outputRange : [5,1],
                                extrapolateLeft : 'extend',
                                extrapolateRight : 'clamp',
                            })
                        }]
                        }
                    }
                    > 
                    <Box w ='100%' h= '100%' bg = 'black' opacity={0.6} position={'absolute'} zIndex={5}></Box>
                    <Box w = '100%' h = '100%' position={'absolute'} zIndex={10} bottom = {1}  bg={{
                        linearGradient: {
                            colors: ['transparent', 'transparent', theme.Bg.base],
                            start: [1, 0, 0],
                            end: [0, 0, 0],
                        },
                    }}>
                    </Box>
                    <AnimatedBlurView
                    tint="dark"
                    intensity={96}
                    style = {{
                        ...StyleSheet.absoluteFillObject,
                        zIndex : 2,
                        opacity : scrollY.interpolate({
                            inputRange : [-50 , 0 , 50 ,100],
                            outputRange : [1,0,0,1]
                        })
                    }}
                    />
                </AnimatedBackground>   
            </Animated.View>
         </Box>
        <Leadheader data = {userdata[0]} />
        
    </Box>
    <Box flex=  {1}>
        <Animated.ScrollView
        showsVerticalScrollIndicator = {false}
        onScroll={Animated.event([
            {
                nativeEvent : {
                    contentOffset : {
                        y: scrollY
                    }
                }
            }
        ],
        {
            useNativeDriver : true
        })}
        scrollEventThrottle={16}
        style ={{
            zIndex : 3 ,
            marginTop : HEADER_HEIGHT_NARROWED ,
            paddingTop : HEADER_HEIGHT_EXPANDED,
        }}
        >
                <VStack  bg = {theme.Bg.base} borderTopLeftRadius={'lg'} borderTopRightRadius={'lg'} pt = {6} pb = {HEADER_HEIGHT_EXPANDED} alignItems={'center'} space = {3}>
                        { [0,0,0,0,0,0,0,0,0].map((item ,index:number) =>
                        <LeadContainer index = {index + 4} key = {index} />
                        )
                    }
                </VStack>
        </Animated.ScrollView>
    </Box>
    
    </Box>
  
  )
}


export default Leaderboard