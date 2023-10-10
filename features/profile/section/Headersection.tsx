import React,{Suspense, useContext} from 'react'
import { 
Box , 
VStack ,
HStack , 
Text , 
Button, 
Center ,
Divider } from 'native-base'
import { useNavigation } from '@react-navigation/native';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
const Avatarfield  = React.lazy(() =>import('../../../components/field/Avatarfield'));
const Statusdisplay = React.lazy(() =>import('../components/Statusdisplay'));


interface contianerProps {
    currentProfile : any,

}

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


const Headersection : React.FC <contianerProps> = ({currentProfile}) =>{
    const theme:any = useContext(ThemeWrapper)
    const navigation = useNavigation();
  return (
    <VStack w = '100%'>
        <Box w = '100%' h = {5} bg = {'transparent'}></Box>
        <VStack  bg = {theme.Bg.base}>

        <Box h = {100}>
            <HStack w = '100%' h = '100%' position={'relative'} justifyContent={'space-between'}>
                <VStack w = {100} h=  '100%' marginX={7}  position={'absolute'} alignItems={'flex-start'}   left = {0} top={-15} >
                    <Suspense fallback={<Box>Loading..</Box>}>
                        {currentProfile &&
                            <Avatarfield image={currentProfile.pf_image} size = {'100%'} />
                        }
                    </Suspense>
                </VStack>
               
                <Box w = '100%' h = '50%' justifyContent={'center'} alignItems={'flex-end'} paddingX = {6}>
                    <Box>
                        {/* Validate Profile for use Button between Follow && Followed and Edit profile. */}
                        <EditProfileButton theme = {theme} navigation = {navigation}/>
                    </Box>
                </Box>
            </HStack>
        </Box>
        <VStack flex = {1} paddingY={-5} paddingX={9} justifyContent={'flex-start'} >
                    <Text
                        color={theme.Text.base}
                        fontSize={'xl'}
                        fontWeight={'semibold'}
                    >{currentProfile.username}</Text>
                    <Text
                        color={theme.Text.description}
                    >{currentProfile.description}
                    </Text>
                </VStack> 
                <Box w='100%' paddingX={9} mt={1} mb = {2}>
                    <Suspense fallback={<Box>Loading...</Box>}>
                        {React.useMemo(() => {
                            return(
                                <Statusdisplay 
                                    follower = {currentProfile.follower}
                                    following = {currentProfile.following}
                                    career = {0}
                                />
                            )
                        },[currentProfile])}
                    </Suspense>
                </Box>
        </VStack>
        <Divider bg = {theme.Divider.base}/>
    </VStack>
  )
}

export default Headersection;