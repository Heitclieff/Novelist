import React,{Suspense , useMemo , useEffect , useState} from "react";
import { 
Box,
VStack,
HStack,
Center,
Button,
Icon,
Text,
IconButton,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../../../systems/Theme/ThemeProvider";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

const LazyProfilebackground  = React.lazy(() =>import('./Profilebackground'));
const LazyAvatarfield  = React.lazy(() =>import('./Avatarfield'));
const LazyDisplaystatusbar = React.lazy(() =>import('./Displaystatusbar'));

interface containerProps { 
    Profiledata : any,
    currentProfile : any,
}

interface ProfileButtonprops {
    theme : any,
    navigation : any
}

const EditProfileButton : React.FC <ProfileButtonprops> = ({theme , navigation}) => {
    console.log(theme)
    const EditProfile = () => {
        console.log("Edit Functions.")
    }
    return(
        <Button
            h={8}
            variant={'outline'}
            rounded={'2xl'}
            borderColor={theme.Button.outline}
            colorScheme={'coolGray'}
            onPress={() => navigation.navigate('Editprofile')}
            size='xs'>
            <Center>
                <Text fontSize={'11'} fontWeight={'semibold'} color = {theme.Text.base}>
                    Edit Profile
                </Text>
            </Center>  
        </Button>
    )
}

const FollowButton = ({theme}:any) => {
   const FollowState = () => {
        console.log("Follow Functions.")
    }
    return(
        <Button
            h={8}
            rounded={'2xl'}
            borderColor={theme.Button.outline}
            bg=  {theme.Button.follow.base}
            _hover={{bg :theme.Button.follow.focused}}
            _pressed={{backgroundColor :theme.Button.follow.focused}}
            size='xs'>
            <Center>
                <Text fontSize={'11'} fontWeight={'semibold'} color = {theme.Text.skelton}>
                    Follow
                </Text>
            </Center>  
        </Button>
    )
}

const InfoBox : React.FC <containerProps> =({Profiledata = [] , currentProfile}) => {
    const theme:any = useContext(ThemeContext)
    const navigation = useNavigation();
    return (
        <VStack pt = {3} bg = {theme.Bg.base}>
            <Box w='100%' height={230} position={'relative'}>
                <VStack w = '100%' h=  '100%' alignItems={'center'} space = {2}>
                    <Suspense fallback={<Box>Loading..</Box>}>
                        {currentProfile &&
                            <LazyProfilebackground background={currentProfile.background} />
                        }
                    </Suspense>
                    <Box w = '100%' alignItems={'flex-end'} paddingX = {6}>
                        <Box w = '25%'>
                            {/* Validate Profile for use Button between Follow&&Followed and Edit profile. */}
                            <EditProfileButton theme = {theme} navigation = {navigation}/>
                        </Box>
                    </Box>
                </VStack>   
                <VStack paddingX= {7} position={'absolute'} left = {0} bottom={0}>
                    <VStack alignItems={'flex-start'} >
                        <Suspense fallback={<Box>Loading..</Box>}>
                            {currentProfile &&
                                <LazyAvatarfield image={currentProfile.image} />
                            }
                        </Suspense>
                    </VStack>
                </VStack>
                </Box>  
                <VStack flex = {1} paddingY={1} paddingX={9} justifyContent={'start'} >
                    <Text
                        color={theme.Text.base}
                        fontSize={'xl'}
                        fontWeight={'semibold'}
                    >{currentProfile.username}</Text>
                    <Text
                        color={theme.Text.description}
                    >description
                    </Text>
                </VStack> 
                <Box w='100%' paddingX={9} mt={1} mb = {2}>
                    <Suspense fallback={<Box>Loading...</Box>}>
                        {React.useMemo(() => {
                            return(
                                <LazyDisplaystatusbar 
                                    follower = {currentProfile.follower}
                                    following = {currentProfile.following}
                                    career = {0}
                                />
                            )
                        },[currentProfile])}
                    </Suspense>
                </Box>
        </VStack>
    )
}

export default InfoBox;