import React,{useEffect, useRef , useState} from 'react'
import { 
Box,
HStack,
Icon,
Text,
IconButton } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Entypo , Ionicons , Feather } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import { useContext } from 'react'
import { useSharedValue ,useAnimatedScrollHandler, withTiming, Easing, useAnimatedStyle  } from 'react-native-reanimated';

import * as Haptics from 'expo-haptics';


interface contianerProps { 
}

const ContentNavigation : React.FC <contianerProps> = () => {
    const navigation:any  = useNavigation();
    const theme:any = useContext(ThemeContext);

  return (
    <Animated.View
      style={[{
      width : '100%', 
      height : 80 , 
      zIndex: 10 }]
    }>
    <HStack w = '100%' safeAreaTop justifyContent={'space-between'} alignItems={'center'} pl = {5} pr = {5}> 
            <Box>
               <HStack alignItems={'center'}>
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
                    <Text color = {theme.Text.base}>Chapter Name</Text>
               </HStack>
              
            </Box>
            <HStack>
               <IconButton 
                    size = 'sm'
                    w = '30'
                    h = {30}
                    rounded={'full'}
                    icon = {
                         <Icon 
                         size = 'md'
                         as = {Feather} 
                         color = {'coolGray.300'}
                         name = {'moon'}/>}
                    />
                    
               <IconButton 
               size = 'sm'
               w = '30'
               h = {30}
               rounded={'full'}
               icon = {
                    <Icon 
                    size = 'md'
                    as = {Feather} 
                    color = {'coolGray.300'}
                    name = {'list'}/>}
               />
            </HStack>
          
        </HStack>
    </Animated.View>
  )
}

export default ContentNavigation;