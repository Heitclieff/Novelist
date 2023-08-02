import React,{useEffect, useRef , useState} from 'react'
import { 
Box,
HStack,
Icon,
Text,
IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Entypo , Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider';
import { useContext } from 'react'
import { useSharedValue ,useAnimatedScrollHandler, withTiming, Easing, useAnimatedStyle  } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';


interface contianerProps { 
    Title : string,
}

const Navigationbar : React.FC <contianerProps> = ({Title}) => {
    const navigation:any  = useNavigation();
  return (
    <Animated.View
      style={[{
      width : '100%', 
      height : 100 , 
      position : 'absolute', 
      zIndex: 10 }]
    }>
    <HStack w = '100%' safeAreaTop position = 'relative' justifyContent={'center'} pl = {5} pr = {5}> 
            <Box  left = {5} safeAreaTop  alignItems={'flex-end'} position={'absolute'}>
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
            <Box h = '100%' mt = {1}>
                <Text fontSize={'md'} fontWeight={'semibold'} color = 'white'>{Title}</Text>
            </Box>
        </HStack>
    </Animated.View>
  )
}

export default Navigationbar;