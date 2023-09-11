import React,{useEffect, useRef , useState , useContext} from 'react'
import { 
Box,
HStack,
Icon,
Text,
IconButton } from 'native-base';
import { Animated } from 'react-native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';

import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'

// import * as Haptics from 'expo-haptics';

interface contianerProps { 
}

const Chapternavigation : React.FC <contianerProps> = () => {
    const navigation:any  = useNavigation();
    const theme:any = useContext(ThemeWrapper);

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
                         rounded={'full'}
                         onPress={() =>  navigation.goBack()}
                         icon = {
                            <EntypoIcon
                                name='chevron-left'
                                size={20}
                                color = {'coolGray.300'}
                            />
                         }
                    />
                    <Text color = {theme.Text.base}>Chapter Name</Text>
               </HStack>
              
            </Box>
            <HStack>
               <IconButton 
                    size = 'sm'
                    rounded={'full'}
                    icon = {
                         <FeatherIcon 
                            size = {20}
                            color = {'coolGray.300'}
                            name = 'moon'/>}
                    />
                    
               <IconButton 
               size = 'sm'
               rounded={'full'}
               icon = {
                    <IonIcon
                    size = {20}
                    color = {'coolGray.300'}
                    name = 'list'
                    />}
               />
            </HStack>
          
        </HStack>
    </Animated.View>
  )
}

export default Chapternavigation;
