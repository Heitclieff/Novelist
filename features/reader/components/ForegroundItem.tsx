import React, { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Box , VStack , Button, Text , Icon , Skeleton } from 'native-base'
import { Image , Platform } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
interface containerProps {
    collection: any
    isLoading : boolean
}

const ForegroundItem: React.FC<containerProps> = ({ collection , isLoading}) => {
    const theme:any = useContext(ThemeWrapper)
    
    return (
        <VStack
            w='100%'
            h='100%'
            justifyContent={'center'}
            alignItems={'center'}
            position={'absolute'}
            zIndex={10}
            space={2}
        >
            {isLoading ?
                <Skeleton
                    w = "150"
                    h = '220'
                    startColor = {theme.Bg.container}
                />
            :
            <Box w='150' h='220' bg= {theme.Bg.container} overflow='hidden'>
                <FastImage
                style={{width : '100%', height : '100%' }}
                source={{
                    uri : collection.image  , 
                    priority : FastImage.priority.normal,
                }}
                alt = "images"
                resizeMode={FastImage.resizeMode.cover}
                />
            </Box>
            }
            <Box w='140'>
                {Platform.OS == 'ios' &&
                    <Button
                        h='9'
                        size='sm'
                        variant={theme.themeMode === 'dark' ? 'outline' : 'solid'}
                        bg={theme.themeMode === 'dark' ? null : 'amber.400'}
                        borderColor={'amber.400'}
                        leftIcon={
                        <IonIcon
                            size= {15}
                            color={theme.themeMode === 'dark' ? '#fbbf24' : theme.Icon.base}
                            name={'library-outline'} />}
                    >
                        <Text fontWeight={'medium'} fontSize={'xs'} color={theme.themeMode === 'dark' ? 'amber.400' : null}>Add to library</Text>
                </Button>    
                }
            </Box>
        </VStack>
    )
}

export default ForegroundItem;