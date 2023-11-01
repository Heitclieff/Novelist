import React , {useEffect, useState , useRef , useContext} from 'react'
import { useNavigation } from '@react-navigation/native'
import { 
Box, 
VStack,
Text, 
Center,
Button,
IconButton,
Icon,
Skeleton,
HStack,
 } from 'native-base'
import { Animated , Dimensions } from 'react-native'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useRoute } from '@react-navigation/native'

//@Redux Toolkits
import { setUser } from '../../systems/redux/action'
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'
// import { getuserData } from '../../systems/redux/action'

//@Components && Sections;
import Headersection from './section/Headersection'
import Centernavigation from '../../components/navigation/Centernavigation'
import Careersection from './section/Careersection'

//@Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


interface StackProps {
    Profiledata : any
}

const ParallaxBackground  = React.lazy(() =>import('./components/Background'));

const Profile : React.FC <StackProps> = ({Profiledata = []}) => {
    const theme:any = useContext(ThemeWrapper)

    const [isOwner, setisOwner] = useState<boolean>(false);
    const [isfollow ,setisfollow] = useState<boolean>(false);
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [HeaderTitle , setHeaderTitle] =  useState<string>('');
    const [currentProfile , setCurrentProfile] = useState<any>();

    const route = useRoute();
    const navigation = useNavigation();
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

    const profileRoute = route.params?.profile;
    const Screenheight = Dimensions.get('window').height
    const userdata = useSelector((state:any) => state.userData)
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )
 

    const scrollY = useRef(new Animated.Value(0)).current;
    const MAX_HEIGHT  = Screenheight / 3.5;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 2.5; 
    useEffect(() => {
        // dispatch(getuserData());
        // console.log('profile',userdata[0].bg_image)
    } , [userdata])

    const ValidateAccount = () => {
        let current_profile = userdata[0];
        let PROFILE_TITLE = userdata[0].username

        if(profileRoute){
            if(profileRoute.id !== userdata[0].id) {
                current_profile = profileRoute;
                PROFILE_TITLE = profileRoute.username
            }else{
                setisOwner(true);
            }
        }else{
            setisOwner(true);
        }

        findingfollower(current_profile.id);
        setCurrentProfile(current_profile)
        setHeaderTitle(PROFILE_TITLE);
    }

    const findingfollower = (current:any) => {
        if(userdata[0].followlist.includes(current)){
            setisfollow(true);
        }
    }
    const followPeople = async (follow:boolean) : Promise <void> => {
        try{
            const firebase = firestore().collection('Users');      
            let myfollowlist = {...userdata[0]};
            let intrpeople_increment = currentProfile.follower 
            
            console.log('follwer', myfollowlist.following)
            if(isfollow){
                intrpeople_increment -= 1 
                myfollowlist.following -= 1

                const deletelist = myfollowlist.followlist.filter(doc => doc !== currentProfile.id)
                myfollowlist.followlist = deletelist
            }else{
                intrpeople_increment += 1
                myfollowlist.following += 1
                myfollowlist.followlist.push(currentProfile.id)
                
            }

            setisfollow(!isfollow)
            setCurrentProfile({...currentProfile, follower : intrpeople_increment})
            dispatch(setUser([myfollowlist]))
            
            const userRef = await firebase.doc(currentProfile.id).update({follower : intrpeople_increment})
            const Myref = await firebase.doc(userdata[0].id).update({following : myfollowlist.following , followlist : myfollowlist.followlist})

        }catch(error){
            console.log("Failed to increment follow" , error);
        }
    
    }
    
    useEffect(() => {
        ValidateAccount();
        findingfollower();
    },[])

    useEffect(() => {
        setTimeout(() => {
          setIsLoading(false);
        },0)
    },[])

    return ( 
        <Box bg={theme.Bg.base} flex={1}>
            <Centernavigation
            title =  {HeaderTitle}
            transparent = {true}
            Contentfixed = {false}
            />
            <Box w = '100%' h = {MAX_HEIGHT} position={'absolute'}>
                <ParallaxBackground background={currentProfile?.bg_image} scrollY={scrollY}/>
            </Box>
           
            <Animated.FlatList
            data={[0]}
            keyExtractor={(item:any) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator = {false}
            onScroll={Animated.event([
                {
                    nativeEvent : {
                        contentOffset : {
                            y: scrollY
                        }
                    }
                }
            ],
            {
                useNativeDriver : true
            })}
            scrollEventThrottle={16}
            style ={{
                zIndex : 1 ,
                position : 'relative',
                marginTop : HEADER_HEIGHT_NARROWED,
                paddingTop : HEADER_HEIGHT_EXPANDED,
            }}
            renderItem={React.useCallback(
                ({ item, index }: any) => {
                    return (
                        currentProfile &&
                        <VStack flex={1}>
                            <Headersection 
                            currentProfile={currentProfile} 
                            isfollow = {isfollow}
                            isOwner = {isOwner} 
                            action = {followPeople}/>
                            <VStack bg={theme.Bg.base}>
                                <HStack pl={8} h={10} space={1} alignItems={'center'}>
                                    <Text fontWeight={'semibold'} color={theme.Text.base}>{currentProfile?.username}</Text>
                                    <Text fontWeight={'semibold'}  color={theme.Text.base}>Careers</Text>
                                </HStack>
                                <VStack mb={HEADER_HEIGHT_EXPANDED}>
                                    {isLoading ?
                                        <Center w='100%' h='100%' justifyContent={'flex-start'} mt={10}>
                                            <VStack w='100%' rounded="md">
                                                <VStack w='100%' flex={1} pb={1} alignItems={'center'}>
                                                    <Skeleton w='90%' h='150' rounded='md' startColor={theme.Bg.container} />
                                                    <Skeleton.Text lines={2} alignItems="flex-start" mt={-70} px="12" startColor={theme.Text.skelton} />
                                                    <Skeleton w='90%' h='150' rounded='md' mt={50} startColor={theme.Bg.container} />
                                                    <Skeleton.Text lines={2} alignItems="flex-start" mt={-70} px="12" startColor={theme.Text.skelton} />
                                                </VStack>
                                            </VStack>
                                        </Center> :
                                        <Careersection id = {currentProfile.id}/>}
                                </VStack>
                            </VStack>
                        </VStack>
                  )
                },[isLoading , isfollow])}
            >   
            </Animated.FlatList>
        </Box>
    )
}

export default Profile;