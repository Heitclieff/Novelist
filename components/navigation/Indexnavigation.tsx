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

import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

import Animated, {
     useSharedValue,
     useAnimatedStyle,
     interpolateColor,
} from 'react-native-reanimated';

interface AppbarProps {
     scrollY : any
     leftElement : any 
     rightElement : any

}

const Indexnavigation: React.FC<AppbarProps> = ({ scrollY , leftElement = null ,rightElement = []}) => {
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
                        {leftElement}
                    </VStack>
                    <HStack
                        pr={5}
                        space={1}
                    >   

                {
                    rightElement.length > 0 && rightElement.map((item: any, index: number) => {
                        return (
                            <Button
                            key = {index}
                            rounded={'full'}
                            w={35}
                            h={35}
                            bg={'transparent'}
                            _hover={{ bg: 'gray.300' }}
                            _pressed={{ backgroundColor: 'gray.300' }}
                            onPress={() => navigation.navigate(item.navigate)}
                            >
                                {item.icon}
                            </Button>
                        );
                    })
                }
                    </HStack>
                </HStack>
            </Animated.View>
        </VStack>
    )
}

export {Indexnavigation};