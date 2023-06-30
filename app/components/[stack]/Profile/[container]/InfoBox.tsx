import React,{Suspense , useMemo , useEffect , useState} from "react";
import { 
Box,
VStack,
HStack,
Center,
Button,
Icon,
Text,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../../../systems/Theme/ThemeProvider";
import { useContext } from "react";
const LazyProfilebackground  = React.lazy(() =>import('./Profilebackground'));
const LazyAvatarfield  = React.lazy(() =>import('./Avatarfield'));
const LazyDisplaystatusbar = React.lazy(() =>import('./Displaystatusbar'));



// const MemorizedProfilebackground = React.memo(LazyProfilebackground);
// const MemorizedAvatarfield = React.memo(LazyAvatarfield);
// const MemorizedDisplaystatusbar = React.memo(LazyDisplaystatusbar);

interface containerProps { 
    Profiledata : any,
    currentProfile : any,
}

const InfoBox : React.FC <containerProps> =({Profiledata = [] , currentProfile}) => {
    const theme:any = useContext(ThemeContext)

    return (
        <VStack pt = {3} bg = {theme.Bg.base}>
            <Box w='100%' height={230} alignItems={'center'} position={'relative'}>
                    <Suspense fallback={<Box>Loading..</Box>}>
                        {currentProfile &&
                            <LazyProfilebackground background={currentProfile.background} />
                        }
                    </Suspense>
                    <Suspense fallback={<Box>Loading..</Box>}>
                        {currentProfile &&
                            <LazyAvatarfield image={currentProfile.image} />
                        }
                    </Suspense>
            </Box>
            <VStack p={1} justifyContent={'center'} space={1}>
                <Center>
                    <Text
                        color={theme.Text.base}
                        fontSize={'lg'}
                        fontWeight={'semibold'}

                    >{currentProfile.username}</Text>
                    <Text
                        color={theme.Text.base}
                    >description
                    </Text>
                </Center>
                <Center>
                    <Button
                        leftIcon={
                            <Icon
                                as={Ionicons}
                                name='create-outline'
                                color={theme.Icon.base}
                                size={'sm'} />}

                        variant={'outline'}
                        borderColor={theme.Button.outline}
                        colorScheme={'coolGray'}
                        size='xs'>
                        <Text height={'4'} color={theme.Text.base} fontSize={'xs'}>Edit Profile</Text>
                    </Button>
                </Center>
                <Center>
                    <Box w='90%' mt={1}>
                        <Suspense fallback={<Box>Loading...</Box>}>
                            {React.useMemo(() => {
                                return(
                                    <LazyDisplaystatusbar/>
                                )
                            },[currentProfile])}
                        </Suspense>
                    </Box>
                </Center>
            </VStack>
        </VStack>
    )
}

export default InfoBox;