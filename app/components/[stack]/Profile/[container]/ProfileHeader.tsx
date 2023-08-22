import React,{Suspense, useContext} from 'react'
import { useNavigation } from '@react-navigation/native';
import { Box , VStack , HStack , Text , Button, Center ,Divider } from 'native-base'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
interface contianerProps {
    currentProfile : any,
}
const LazyAvatarfield  = React.lazy(() =>import('./Avatarfield'));
const LazyDisplaystatusbar = React.lazy(() =>import('./Displaystatusbar'));


interface ProfileButtonprops {
    theme : any,
    navigation : any
}

const EditProfileButton : React.FC <ProfileButtonprops> = ({theme , navigation}) => {
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


const ProfileHeader : React.FC <contianerProps> = ({currentProfile}) =>{
    const theme:any = useContext(ThemeContext)
    const navigation = useNavigation();
  return (
    <VStack w = '100%'>
        <Box h = {100}>
            <HStack position={'relative'} justifyContent={'space-between'}>
                <VStack paddingX= {7} position={'absolute'} alignItems={'flex-start'}  left = {0} top={-15} >
                    <Suspense fallback={<Box>Loading..</Box>}>
                        {currentProfile &&
                            <LazyAvatarfield image={currentProfile.image} />
                        }
                    </Suspense>
                </VStack>
               
                <Box w = '100%' h = {50} justifyContent={'center'} alignItems={'flex-end'} paddingX = {6}>
                    <Box w = '25%'>
                        {/* Validate Profile for use Button between Follow && Followed and Edit profile. */}
                        <EditProfileButton theme = {theme} navigation = {navigation}/>
                    </Box>
                </Box>
            </HStack>
        </Box>
        <VStack flex = {1} paddingY={1} paddingX={9} justifyContent={'flex-start'} >
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
        <Divider bg = {theme.Divider.base}/>
    </VStack>
  )
}

export default ProfileHeader;
