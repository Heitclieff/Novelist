import React,{useContext} from 'react'
import { 
Box,
HStack,
Icon,
Text,
IconButton } from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated';

interface contianerProps { 
    Title : string,
}

const Profilenavigation : React.FC <contianerProps> = ({Title}) => {
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
                    rounded={'full'}
                    onPress={() =>  navigation.goBack()}
                    icon = {
                        <EntypoIcon
                        name='chevron-left'
                        size={20}
                        color = 'white'
                        />
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

export default Profilenavigation;