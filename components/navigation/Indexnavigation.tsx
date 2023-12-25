import React, {
useContext
}   from 'react'
import {
HStack,
VStack,
Box,
Text,
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

const NotificationAlertIcon = () => {
    const theme:any = useContext(ThemeWrapper);
    return(
        <VStack position='relative' alignItems='center' justifyContent='center' pl={2} pr={2}>
        <Box position='absolute' zIndex={10} pt={5}>
            <Box position='absolute' zIndex={10} minW={2} minH={2} bg='red.500' rounded='full' />
        </Box>
        <Box position='absolute'>
            <IonIcon name='notifications' color={theme.Icon.between} size={15} />
        </Box>
    </VStack>
    )
}

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
                rightElement.length > 0 && rightElement.map((item: any ,key:number) => {
                    const notifyAlert = item.id == 2  && notify > 0;
                    // const key = notifyAlert ? 'notify_' + item.id :  item.id;
                    return (
                        <IconButton
                        key = {key}
                        onPress={() => navigation.navigate(item.navigate)}
                        size='sm'
                        rounded='full'
                        colorScheme='cyan'
                        icon={ notifyAlert ? (
                            <NotificationAlertIcon key = {key}/>
                        ) : item.icon
                        
                        }
                      />
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