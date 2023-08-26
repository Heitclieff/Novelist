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
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native'

interface FiledProps {
    data: any,
}

const Userfield: React.FC<FiledProps> = ({data}) => {
    const theme:any = useContext(ThemeContext)
    const navigation = useNavigation();
    return ( data.map((item : any , key : number) => 
    <Pressable key = {key} onPress={()=> navigation.navigate("ProfileStack")}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <HStack
                        alignItems={'center'}
                        rounded = 'md'
                        bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action : null}
                        p = {2}
                    >
                        <Box >
                            <Box id='img-profile-box'
                                w={85}
                                h={85}
                                rounded='full'
                                bg='gray.200'
                                overflow='hidden'
                            >
                                <Image
                                    w='100%'
                                    h='100%'
                                    resizeMode='cover'
                                    source={{ uri: item.image }}
                                    alt="images"
                                />
                            </Box>
                        </Box>
                        <Box
                            w='70%'
                            h='100%'
                            pl={5}
                            justifyContent={'center'}>
                            <Text
                                fontWeight={'semibold'}
                                fontSize={'md'}
                                color = {theme.Text.base}
                            >{item ? item.username : "undifined username"}
                            </Text>
                            <Text
                                color = {theme.Text.base}
                            >
                                {item ? item.email : "undifined Email"}
                            </Text>
                            <HStack space={2}>
                                <Text fontSize={'xs'} color = {theme.Text.base}>{`${item ? item.follower : 0} follower`}</Text>
                                <Divider
                                    orientation='vertical' />
                                <Text fontSize={'xs'} color = {theme.Text.base}>{`${item ? item.following : 0} following`}</Text>
                            </HStack>
                        </Box>
                        <Box
                            w='0%'
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
    )
}

export default Userfield;
