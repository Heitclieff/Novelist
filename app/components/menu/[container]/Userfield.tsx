import React, { FC } from 'react'
import {
    Box,
    Text,
    VStack,
    HStack,
    Image,
    IconButton,
    Center,
    Divider,
    Icon,
    Pressable
} from 'native-base'
import { Entypo } from '@expo/vector-icons'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../systems/theme'
interface FiledProps {
    data: any,
}

const Userfield: React.FC<FiledProps> = ({ data }) => {
    const {colorMode} = useColorMode();

    return (
        <Pressable >
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <HStack
                        w='100%'
                        h={150}
                        alignItems={'center'}
                        rounded = 'md'
                        bg = {isPressed ? colorMode === 'dark' ? "coolGray.700" :"coolGray.200" : isHovered ? colorMode === 'dark' ? "coolGray.700": "coolGray.200" : colorMode === 'dark' ? "coolGray.800": "coolGray.100"}
                        p = {1}
                    >
                        <Box w='30%'>
                            <Box id='img-profile-box'
                                w={110}
                                h={110}
                                rounded='full'
                                bg='gray.200'
                                overflow='hidden'
                            >
                                <Image
                                    w='100%'
                                    h='100%'
                                    resizeMode='cover'
                                    source={{ uri: data[0].image }}
                                    alt="images"
                                />
                            </Box>
                        </Box>
                        <Box
                            w='60%'
                            h='100%'
                            pl={5}
                            justifyContent={'center'}>
                            <Text
                                fontWeight={'semibold'}
                                fontSize={'md'}
                            >{data[0] ? data[0].username : "undifined username"}
                            </Text>
                            <Text>
                                {data[0] ? data[0].email : "undifined Email"}
                            </Text>
                            <HStack space={2}>
                                <Text fontSize={'xs'}>{`${data[0] ? data[0].follower : 0} follower`}</Text>
                                <Divider
                                    orientation='vertical' />
                                <Text fontSize={'xs'}>{`${data[0] ? data[0].following : 0} following`}</Text>
                            </HStack>
                        </Box>
                        <Box
                            w='10%'
                            h='100%'
                            justifyContent={'center'}

                        >
                            <IconButton
                                icon={
                                    <Icon
                                        as={Entypo}
                                        name='chevron-right'
                                        size={'xl'}
                                    ></Icon>
                                } />
                        </Box>

                    </HStack>
                )

            }}
        </Pressable>

    )
}

export default Userfield;
