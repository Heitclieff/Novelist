import React, { useContext } from 'react'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { Box , VStack , Button, Text , Icon } from 'native-base'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
interface containerProps {
    collection: any
}

const ForegroundItem: React.FC<containerProps> = ({ collection }) => {
    const theme:any = useContext(ThemeContext)
    
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
                    style={{ width: '100%', height: '100%' }}
                    contentFit='cover'
                    source={collection.images}
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
                        leftIcon={<Icon
                            size='md'
                            as={Ionicons}
                            color={theme.themeMode === 'dark' ? 'amber.400' : theme.Text.base}
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
