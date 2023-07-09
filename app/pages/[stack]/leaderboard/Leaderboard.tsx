import React,{useContext, useRef} from 'react'
import { View } from 'react-native'
import { Box,Text,VStack } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { Animated, Platform } from 'react-native'
import { ScrollView } from 'react-native'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view'
import { Image } from 'expo-image'
import Leadheader from '../../../components/[stack]/leaderboard/leadheader/Leadheader'
import LeadContainer from '../../../components/[stack]/leaderboard/LeadContainer'
interface pageProps {}

const Leaderboard: React.FC <pageProps> = () => {
    const theme:any = useContext(ThemeContext);
    const MIN_HEIGHT = Platform.OS == 'ios' ? 90 : 55;
    const MAX_HEIGHT  = 350;
  return (
    <Box flex = {1}>
        <ImageHeaderScrollView
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            scrollViewBackgroundColor= {theme.Bg.tabbar}
            renderHeader={() => (
                <Leadheader/>   
            )}
        >
            <TriggeringView>
                <VStack mt = {6} alignItems={'center'} space = {3}>
                    { [0,0,0,0,0,0,0].map((item ,index:number) =>
                        <LeadContainer index = {index + 4} />
                    )

                    }
                </VStack>
              
            </TriggeringView>
    
        
        </ImageHeaderScrollView>
        </Box>
    
   
  )
}

export default Leaderboard