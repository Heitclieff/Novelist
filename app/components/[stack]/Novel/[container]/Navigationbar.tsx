import React,{useEffect, useRef , useState} from 'react'
import { 
Box,
HStack,
Icon,
IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Entypo , Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import { useContext } from 'react'
import { useSharedValue ,useAnimatedScrollHandler, withTiming, Easing, useAnimatedStyle  } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';


interface contianerProps { 
    isMarks : boolean, 
    setisMarks : any,
    showNavigate : any,
    translateY : any,
}

const Navigationbar : React.FC <contianerProps> = ({isMarks , setisMarks ,showNavigate ,translateY}) => {
    const navigation:any  = useNavigation();
    
    const actionBarStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: withTiming(translateY.value, {
              duration: 100,
              easing: Easing.inOut(Easing.ease),
            }),
          },
        ],
      };
  });
  return (
    <Animated.View
      style={[{
      width : '100%', 
      height : 100 , 
      position : 'absolute', 
      zIndex: 10 },
      actionBarStyle]
    }>
    <HStack w = '100%' safeAreaTop justifyContent={'space-between'} alignItems={'center'} pl = {5} pr = {5}> 
            <Box>
                <IconButton 
                    size = 'sm'
                    w = '30'
                    h = {30}
                    rounded={'full'}
                    onPress={() =>  navigation.goBack()}
                    icon = {
                        <Icon
                        as={Entypo}
                        name='chevron-left'
                        size={'xl'}
                        color = {'coolGray.300'}
                        ></Icon>
                    }
                />
            </Box>
            <IconButton 
                size = 'sm'
                w = '30'
                h = {30}
                rounded={'full'}
                onPress={() => {setisMarks(!isMarks);  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}}
                icon = {
                    <Icon 
                    size = 'md'
                    as = {Ionicons} 
                    color = {isMarks ? 'amber.400': 'coolGray.300'}
                    name = {isMarks ? 'bookmark' : 'bookmark-outline'}/>}
                />
        </HStack>
    </Animated.View>
  )
}

export default Navigationbar;