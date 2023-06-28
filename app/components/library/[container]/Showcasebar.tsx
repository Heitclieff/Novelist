import React,{FC, useEffect} from 'react'
import { 
Box,
Center,
Text,
HStack,
Image,
VStack,
Icon,
} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

interface Showcaseprops {
    books : string,
    userdata : any,
}

const Showcasebar :React.FC <Showcaseprops> = ({books , userdata}) => {
    const theme:any = useContext(ThemeContext);
  return (
             userdata.map((item:any ,key:number) => 
                <HStack 
                key = {key}
                w = '100%' 
                h = {150} 
                alignItems={'center'}
                p = {3}>
                        <Box w =  '30%'>
                        <Box
                            id='images-container'
                            w={100}
                            h={100}
                            rounded='full'
                            bg='gray.200'
                            overflow='hidden'
                        >
                            {item.image && <Image
                                w='100%'
                                h='100%'
                                resizeMode='cover'
                                source={{ uri: item.image }}
                                alt="image"
                            />}
                        </Box>
                    </Box>
                    <VStack
                        w='70%'
                        space={2}
                    >
                        <Text
                            fontSize={'lg'}
                            fontWeight={'semibold'}
                            color={theme.Text.base}
                        >{item.username ? item.username : 'Username'}</Text>
                        <HStack space={2} alignItems={'center'}>
                            <Box>
                                <Icon
                                    as={Ionicons}
                                    name='ios-library'
                                    color={theme.Icon.base}
                                />
                            </Box>
                            <HStack space={1}>
                                <Text
                                    color={theme.Text.base}
                                    fontWeight={'semibold'}
                                >{books ? books : 0}</Text>
                                <Text color={theme.Text.base}>
                                    Books in Library
                                </Text>
                            </HStack>
                        </HStack>
                    </VStack>

                </HStack>
            )
        
  )
}

export default Showcasebar;
