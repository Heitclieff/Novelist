import React,{useEffect, useRef , useState, useContext} from 'react'
import { 
Box,
HStack,
Icon,
IconButton } from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons';
import Animated from 'react-native-reanimated';

// import * as Haptics from 'expo-haptics';


interface contianerProps { 
    isMarks : boolean, 
    setisMarks : any,
    showNavigate : any,
}

const Navigationbar : React.FC <contianerProps> = ({isMarks , setisMarks ,showNavigate}) => {
    const navigation:any  = useNavigation();
    const theme:any = useContext(ThemeWrapper);
  return (
    <Animated.View
      style={[{
      width : '100%', 
      height : 100 , 
      position : 'absolute', 
      zIndex: 10 }]
    }>
    <HStack w = '100%' safeAreaTop justifyContent={'space-between'} alignItems={'center'} pl = {5} pr = {5}> 
            <Box>
                <IconButton 
                    size = 'sm'
                    rounded={'full'}
                    onPress={() =>  navigation.goBack()}
                    icon = {
                        <EntypoIcon
                        name='chevron-left'
                        size= {20}
                        color = {theme.Icon.static}
                        />
                    }
                />
            </Box>
            <IconButton 
                size = 'sm'
                rounded={'full'}
                onPress={() => {setisMarks()}}
                icon = {
                    <IonIcon 
                    size = {15}
                    color = {isMarks ? '#fbbf24': theme.Icon.static}
                    name = {isMarks ? 'bookmark' : 'bookmark-outline'}/>}
                />
        </HStack>
    </Animated.View>
  )
}

export default Navigationbar;