import React, { useContext, useEffect} from 'react'
import { Dimensions } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'
import { 
Box, 
Text, 
VStack, 
HStack,
Pressable
} from 'native-base'

import FastImage from 'react-native-fast-image';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient'

import { PreloadHooks } from '../hooks/image.hooks'

interface containerProps {
    data: any
    id: number,
}

const Collectionheader: React.FC<containerProps> = ({ data, id}) => {
    const theme: any = useContext(ThemeWrapper)
    const ScreenWidth = Dimensions.get('window').width
    const ScreenHeight = Dimensions.get('window').height
    const HEADER_HEIGHT = ScreenHeight / 1.7
    const navigation = useNavigation();
    
    PreloadHooks(data?.image);
    
    return (
        <Pressable onPress={() => navigation.navigate('Novelmain', { id })}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <Box w={ScreenWidth} h={HEADER_HEIGHT} overflow={'hidden'} alignItems={'center'} position='relative'>
                        <Box w={ScreenWidth} h='100%' overflow={'hidden'} position={'absolute'} bg={'trueGray.800'}>
                            <FastImage
                             id='background-images'
                             source={{ uri: data.image }}
                             blurRadius = {3}
                             style = {{
                                width: '100%',
                                height: '100%',
                                opacity: 0.6,
                                position: 'relative',
                             }}
                            />
                        </Box>
                        <Box w='100%' h='100%' position='absolute' zIndex={10}>
                            <LinearGradient colors={['transparent',theme.Bg.header]} style = {{width : '100%' , height : HEADER_HEIGHT}}/>           
                        </Box>

                        {/* <Box w = '100%' h=  '100%' bg= 'black' position={'absolute'} opacity={0.4} zIndex={2}/> */}
                        <Box safeAreaTop w='100%' h='100%' position={'absolute'} mt={2} zIndex={10}>
                            <VStack w="100%" h='100%' justifyContent={'center'} alignItems={'center'} >
                                <Box w='60%' h='70%' bg='gray.200' rounded={'xs'} overflow={'hidden'} >
                                    <FastImage
                                        id = "Item-image"
                                        style={{width : '100%', height : '100%' }}
                                        source={{
                                            uri : data.image  , 
                                            priority : FastImage.priority.normal
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </Box>
                                <VStack w='60%' mt={2} >
                                    <Text fontWeight={'semibold'} fontSize={'lg'} numberOfLines={1} color= {theme.Text.between_heading}>{data.title}</Text>
                                    <HStack
                                        alignItems={'center'}
                                        space={2}
                                    >
                                        <HStack
                                        alignItems={'center'}
                                        space={2}
                                        >
                                            <AntdesignIcon
                                              name = 'eyeo'
                                              color = {theme.Icon.between}
                                              size = {15}
                                            />
                                            <Text
                                                fontSize={'sm'}
                                                color={theme.Text.between_heading}
                                            >{data.view}
                                            </Text>
                                        </HStack>

                                        <HStack
                                        alignItems={'center'}
                                        space={2}
                                        >
                                            <AntdesignIcon
                                              name = 'heart'
                                              color = {theme.Icon.between}
                                              size = {12}
                                            />
                                            <Text
                                                fontSize={'sm'}
                                                  color={theme.Text.between_heading}>
                                                {data.like}
                                            </Text>

                                        </HStack>
                                    </HStack>

                                </VStack>
                            </VStack>

                        </Box>
                    </Box>
                )
            }
            }
        </Pressable>
    )
}

export default Collectionheader;