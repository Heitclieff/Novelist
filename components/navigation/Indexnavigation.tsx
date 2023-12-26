import React, {
useContext
}   from 'react'
import { Text } from 'react-native'
import {
HStack,
VStack,
Box,
Divider,
IconButton,
Button,
Icon
}   from 'native-base'

import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import Animated, {
     useSharedValue,
     useAnimatedStyle,
     interpolateColor,
} from 'react-native-reanimated';

interface AppbarProps {
     scrollY : any
     leftElement : any 
     rightElement : any
     notify : number

}

const AnimatedAntdesignIcon = Animated.createAnimatedComponent(AntdesignIcon)
const AnimatedIonIcon = Animated.createAnimatedComponent(IonIcon)

const Indexnavigation: React.FC<AppbarProps> = ({ scrollY , leftElement = null ,rightElement = [] ,notify}) => {
    const theme: any = useContext(ThemeWrapper);
    const navigation = useNavigation();
    
    const animatedNavbarStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(scrollY.value, [0, 100],
            ['transparent', theme.Bg.header]);
        return {
            backgroundColor,

        };
    });

    const AnimatedTextStyle = useAnimatedStyle(() => {
        const textColor = interpolateColor(scrollY.value, [0, 100],
        ['white', theme.Text.between_heading]);

        return {
            color : textColor
        }
    })

    return (
        <VStack
            w='100%'
            position={'absolute'}
            zIndex={10}
            justifyContent={'flex-end'}
        >
            <Animated.View style={[animatedNavbarStyle]}>
                <HStack
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    safeAreaTop
                    pl = {4}
                >
                    
                        <Animated.Text
                        style = {[AnimatedTextStyle,  {fontSize : 20 , fontWeight : 'bold' }]}
                        >
                            Nobelist
                        </Animated.Text>
         

                    <HStack
                        pr={5}
                        space={2}
                    >   
                    <Button
                            onPress= {() => navigation.navigate('Search')}
                            w='30px'
                            h="30px"
                            p={0}
                            rounded='full'
                            alignItems={'center'}
                            bg = {'transparent'}
                            justifyContent={'center'}
                            _pressed={{opacity : 0.5 , backgroundColor : 'transparent' }}
                            
                            >
                                <AnimatedAntdesignIcon
                                    name='search1'
                                    size={18}
                                    style={AnimatedTextStyle}
                                />
                        </Button>
                        
                       
                       
                        
                            <Button
                            onPress= {() => navigation.navigate("Notification")}
                            w='30px'
                            h="30px"
                            p={0}
                            rounded='full'
                            alignItems={'center'}
                            bg = {'transparent'}
                            justifyContent={'center'}
                            _pressed={{opacity : 0.5 , backgroundColor : 'transparent' }}
                            >
                                 {notify > 0 ?
                                    <VStack position='relative' alignItems='center' justifyContent='center' pl={2} pr={2}>
                                        <Box position='absolute' zIndex={10} pt={5}>
                                            <Box position='absolute' zIndex={10} minW={2} minH={2} bg='red.500' rounded='full' />
                                        </Box>
                                        <Box position='absolute'>
                                            <AnimatedIonIcon name='notifications' style={AnimatedTextStyle} size={15} />
                                        </Box>
                                     </VStack>  
                                    :


                                    <AnimatedIonIcon
                                      name = 'notifications'
                                      size={18}
                                      style={AnimatedTextStyle}
                                    />
                            }
                        </Button>                 
                    </HStack>
                </HStack>
            </Animated.View>
        </VStack>
    )
}

export {Indexnavigation};