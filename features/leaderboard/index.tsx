import React,{useContext, useRef , useEffect, useState} from 'react'
import { 
Box,
Text,
VStack } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { Animated , ImageBackground, RefreshControl } from 'react-native'
import FastImage from 'react-native-fast-image'
import Centernavigation from '../../components/navigation/Centernavigation'
//@Components
import Leadheader from './section/header'
import LeaderItem from './components/LeaderItem'

//@Redux Toolkits
import { ThunkDispatch } from 'redux-thunk'
import { useDispatch , useSelector } from 'react-redux'

import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { getuserData, setHeadLeader, setItemLeader } from '../../systems/redux/action'

// fireabase 
import firestore from '@react-native-firebase/firestore'

interface pageProps {}

const MemorizedLeadheader = React.memo(Leadheader);
const Memorizednavigation = React.memo(Centernavigation);

const Leaderboard: React.FC <pageProps> = () => {
    const db = firestore()
    const theme:any = useContext(ThemeWrapper);
   
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const header = useSelector((state:any) => state.headLeader)
    const itemleader = useSelector((state:any) => state.itemLeader)
    const [refreshing ,setRefreshing] = useState<boolean>(false);

    const MAX_HEIGHT  = 410;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = 300; 
   
    const scrollY = useRef(new Animated.Value(0)).current;
    const AnimatedBackground = Animated.createAnimatedComponent(FastImage);

    const setLeaderBoard = async () => {
        const leaderboardEntries = [];
        const mainLeaderRef = db.collection('Leaderboards')
        await db.collection("Scores").orderBy("score", "desc").limit(15).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            const userId = doc.id;
            const data = doc.data()
            const score = data.score;
            const username = data.username;
            const image = data.image;
            const entry = {
                score,
                username,
                image,
            };

            leaderboardEntries.push(entry);
            });

            // Step 5: Update the Leaderboards collection with the array of entries
            mainLeaderRef.doc('hww60M4MJqjPkLII0C1E')
            .set({
                leaderboard: leaderboardEntries,
            })
            .then(() => {
                console.log("Leaderboard updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating leaderboard:", error);
            });
        })
        .catch((error) => {
            console.error("Error getting top scores:", error);
        });
    }

    const fetchLeaderBoard = async () => {
        try{
            const mainLeaderRef = db.collection('Scores')
            const snapLeader = await mainLeaderRef.get()
            const data = snapLeader.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            data.sort((a, b) => b.score - a.score);
            const headerBoard = data.slice(0,3);


            dispatch(setHeadLeader(headerBoard))
            dispatch(setItemLeader(data))
        }catch(error){
            console.log("Failed to fetcing leaderboard", error)
        }
       
    }  
    
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);

    
    useEffect(() => {
        const shouldrefresh = itemleader?.length <= 0 || refreshing
        if(shouldrefresh)
            fetchLeaderBoard()
    } , [refreshing])
    
        return (
            <Box flex = {1} position = "relative" bg = {theme.Bg.base}>
                <Box position={'absolute'} zIndex = {10} w =  '100%'>
                    <Memorizednavigation title = "Leaderboard" transparent = {true} Contentfixed = {false}/>
                </Box>
                <Box w = '100%' h = {MAX_HEIGHT}  position={'absolute'} justifyContent={'center'} bg = {theme.Bg.container} zIndex = {0} overflow = {'hidden'}>
                    <Box w = '100%' h = '100%'  position = 'absolute' top = {0} >
                        {header?.length > 0 &&
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
                                source={{
                                    uri :header[0].image ,
                                    priority : FastImage.priority.normal,
                                    cache: FastImage.cacheControl.cacheOnly,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
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
                            </AnimatedBackground>
                        </Animated.View>
                        }
                    
                    </Box>
                    <MemorizedLeadheader data = {header} />
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
                refreshControl={
                    <RefreshControl 
                    refreshing = {refreshing} 
                    onRefresh={onRefresh}
                    tintColor={'white'}
                    />
                }
                scrollEventThrottle={16}
                style ={{
                    zIndex : 10,
                    marginTop : HEADER_HEIGHT_NARROWED ,
                    paddingTop : HEADER_HEIGHT_EXPANDED,
                }}
                >
                        <VStack  
                        flex = {1}
                        bg = {theme.Bg.base} 
                        borderTopLeftRadius={'lg'} 
                        borderTopRightRadius={'lg'} 
                        pt = {6}
                        
                        pb = {HEADER_HEIGHT_EXPANDED} 
                        alignItems={'center'} 
                        space = {3}>
                        
                            {itemleader.map((item:any , index:number) => 
                                <LeaderItem key= {index} index = {index + 1} item = {item}/>
                            )}

                        </VStack>


                </Animated.ScrollView>
            </Box>
        </Box>
      
        )
    
}


export default Leaderboard