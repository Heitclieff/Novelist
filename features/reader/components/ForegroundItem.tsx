import React, { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Box , VStack , Button, Text , Icon } from 'native-base'
import { Image , Platform } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'

interface containerProps {
    collection: any
}

const ForegroundItem: React.FC<containerProps> = ({ collection }) => {
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
            <Box w='150' h='220' bg='gray.300' overflow='hidden'>
                <Image
                    style={{ width: '100%', height: '100%'}}
                    source={{uri :collection.image}}
                    alt="images"
                />
            </Box>
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