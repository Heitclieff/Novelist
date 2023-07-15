import React,{useContext, useRef , useEffect} from 'react'
import { View } from 'react-native'
import { Box,Text,VStack } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import {Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view'
import { Image } from 'expo-image'
import Leadheader from '../../../components/[stack]/leaderboard/leadheader/Leadheader'
import LeadContainer from '../../../components/[stack]/leaderboard/LeadContainer'
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'
import { getuserData } from '../../../../systems/redux/action'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useHeaderHeight } from '@react-navigation/elements'


interface pageProps {}

const Leaderboard: React.FC <pageProps> = () => {
    const theme:any = useContext(ThemeContext);
    const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55;
    const MAX_HEIGHT  = 400;
    const STICKY_HEADER_HEIGHT = 90;
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userdata = useSelector((state:any) => state.userData)
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )

    const headerHeight = useHeaderHeight();
    useEffect(() => {
        dispatch(getuserData());
    } , [dispatch , isReduxLoaded])

  return (
    <ParallaxScrollView 
    parallaxHeaderHeight={MAX_HEIGHT}
    stickyHeaderHeight={headerHeight}
    backgroundColor = {'transparent'}
    fadeOutForeground={true} 
    fadeOutStickyHeader = {false}
    fadeOutHeader  ={false}
    backgroundScrollSpeed={2}
    backgroundSpeed = {10}
    showsVerticalScrollIndicator =  {false}
    renderBackground = {() => (
        <Box w = '100%' h = '100%' bg = 'black'>
            <Image
            id='background-images'
            style={{ width: '100%', height: '100%', opacity: 0.6, resizeMode: 'cover' }}
            contentFit='cover'
            source={userdata[0].image}
            alt="images"
            />
        </Box>
        
    )}

    
    renderStickyHeader = {() => (
        <Box w=  '100%' h ='100%' bg = 'black' overflow={'hidden'} position = 'relative'> 
        <Box w = '100%' h= '265' position = 'absolute' top = {0}>
            <Image
                id='background-images'
                style={{ width: '100%', height: '100%', opacity: 0.6, transform: [{ translateY: 0 }] }}
                contentFit='cover'
                source={userdata[0].image}
                alt="images"
            />     
        </Box>
            
    </Box>
    
    )}


    renderHeader = {() => (
        <Box w=  '100%' h ='100%' bg = 'black' overflow={'hidden'} position = 'relative'> 
        <Box w = '100%' h= '265' position = 'absolute' top = {0}>
            <Image
                id='background-images'
                style={{ width: '100%', height: '100%', opacity: 0.6, transform: [{ translateY: 0 }] }}
                contentFit='cover'
                source={userdata[0].image}
                alt="images"
            />     
        </Box>
            
    </Box>
    
    )}

    renderForeground={() => (
        <Box w='100%' h='100%'
        bg={{
            linearGradient: {
                colors: ['transparent', 'transparent', theme.Bg.base],
                start: [1, 0, 0],
                end: [0, 0, 0],
            },
        }}>
            <Leadheader data = {userdata[0]}/>
         </Box>
       
    )}>
    <Box w = '100%' h = '100%' >
        <VStack bg = {theme.Bg.base} pt = {6} pb = {5} alignItems={'center'} space = {3}>
                { [0,0,0,0,0,0,0,0,0,0,0,0].map((item ,index:number) =>
                    <LeadContainer index = {index + 4} key = {index} />
                )
                }
        </VStack>
    </Box>
    </ParallaxScrollView>
   
        /* <ImageHeaderScrollView
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            scrollViewBackgroundColor= {theme.Bg.tabbar}
            showsVerticalScrollIndicator = {false}
            renderHeader={() => {
                return(
                    <Leadheader data = {userdata[0]} />   
                )
            }
            }>
            <TriggeringView>
                <VStack mt = {6} alignItems={'center'} space = {3}>
                    { [0,0,0,0,0,0,0].map((item ,index:number) =>
                        <LeadContainer index = {index + 4} />
                    )
                    }
                </VStack>
            </TriggeringView>
    
        
        </ImageHeaderScrollView> */

    
  )
}

export default Leaderboard