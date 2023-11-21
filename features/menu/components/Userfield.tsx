import React, { useContext } from 'react'
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
import FastImage from 'react-native-fast-image'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface FiledProps {
    data: any,
}

const Userfield: React.FC<FiledProps> = ({data}) => {
    const theme:any = useContext(ThemeWrapper)
    const navigation = useNavigation();
    // console.log('userfield',data)
    // data.map((item : any , key : number) => console.log(item))
    return ( data.map((item : any , key : number) => 
    <Pressable key = {key} onPress={()=> navigation.navigate("ProfileStack")}>
            {({
                isHovered,
                isFocused,
                isPressed
            }) => {
                return (
                    <HStack
                        alignItems= 'center'
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
                                <FastImage
                                    style={{width : '100%', height : '100%' }}
                                    source={{
                                        uri : item.pf_image  , 
                                        header :{Authorization : "someAuthToken"},
                                        priority : FastImage.priority.normal,
                                        cache: FastImage.cacheControl.cacheOnly
                                    }}
                                    alt = "images"
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </Box>
                        </Box>
                        <Box
                            w='70%'
                            h='100%'
                            pl={5}
                            justifyContent={'center'}>
                            <Text
                                fontWeight = 'semibold'
                                fontSize = 'md'
                                color = {theme.Text.base}
                            >{item ? item.username : "undifined username"}
                            </Text>
                            <Text
                                color = {theme.Text.base}
                            >
                                {item ? item.email : "undifined Email"}
                            </Text>
                            <HStack space={2}>
                                <Text fontSize = 'xs'  color = {theme.Text.base}>{`${item ? item.follower : 0} follower`}</Text>
                                <Divider
                                    orientation='vertical' />
                                <Text fontSize = 'xs' color = {theme.Text.base}>{`${item ? item.following : 0} following`}</Text>
                            </HStack>
                        </Box>
                        <Box
                            h='100%'
                            justifyContent= 'center'
                        >
    
                        <EntypoIcon
                            name='chevron-right'
                            size = {20}
                            color = {theme.Icon.base}
                        />
    
                        </Box>

                    </HStack>
                )

            }}
        </Pressable>

    )
    )
}

export default Userfield;