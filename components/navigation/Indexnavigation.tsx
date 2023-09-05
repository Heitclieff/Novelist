import React, {
useContext
}   from 'react'
import {
HStack,
VStack,
Box,
Text,
Divider,
Button,
Icon
}   from 'native-base'
// import { AntDesign,FontAwesome , Ionicons} from '@expo/vector-icons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5'
import IonIcon from 'react-native-vector-icons/Ionicons'

import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'
import Animated, {
     useSharedValue,
     useAnimatedStyle,
     interpolateColor,
} from 'react-native-reanimated';

interface AppbarProps {
     scrollY : any
}

const Indexnavigation: React.FC<AppbarProps> = ({ scrollY }) => {
    const theme: any = useContext(ThemeWrapper);
    const navigation = useNavigation();
    const animatedNavbarStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(scrollY.value, [0, 100],
            ['transparent', theme.Bg.header]);
        return {
            backgroundColor,
        };
    });

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
                >
                    <VStack
                        pl={5}
                    >
                        <Text
                            fontSize={'2xl'}
                            fontWeight={'bold'}
                            color={theme.Text.heading}
                        >Nobelist</Text>
                    </VStack>
                    <HStack
                        pr={5}
                        space={1}
                    >
                        <Button
                            rounded={'full'}
                            w={35}
                            h={35}
                            bg={'transparent'}
                            _hover={{ bg: 'gray.300' }}
                            _pressed={{ backgroundColor: 'gray.300' }}
                            onPress={() => navigation.navigate('Search')}

                        >
                            <AntdesignIcon
                                name='search1'
                                color={theme.Icon.heading}
                            />

                        </Button>
                        <Button
                            rounded={'full'}
                            w={35}
                            h={35}
                            bg={'transparent'}
                            _hover={{ bg: 'gray.300' }}
                            _pressed={{ backgroundColor: 'gray.300' }}
                            onPress={() => navigation.navigate('Notification')}
                        >
                            <IonIcon
                                name={'notifications'}
                                color={theme.Icon.heading}

                            />
                        </Button>
                    </HStack>
                </HStack>
            </Animated.View>
        </VStack>
    )
}

export default Indexnavigation;