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
import { Animated , Dimensions, RefreshControl } from 'react-native'
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
import sendNotification from '../../services/notificationService'
import { SpinnerItem } from '../../components/Spinner'

interface StackProps {
    Profiledata : any
}

const ParallaxBackground  = React.lazy(() =>import('./components/Background'));

const Profile : React.FC <StackProps> = ({Profiledata = []}) => {
    const theme:any = useContext(ThemeWrapper)

  
    const [isOwner, setisOwner] = useState<boolean>(false);
    const [isfollow ,setisfollow] = useState<boolean>(false);
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [isBtnLoading ,setBtnLoading] = useState<boolean>(false);
    const [careersAmout ,setCareersAmount] = useState<number>(0);
    const [HeaderTitle , setHeaderTitle] =  useState<string>('');
    const [currentProfile , setCurrentProfile] = useState<any>();
    const [refreshing  , setRefreshing] = useState<boolean>(false);

    const route = useRoute();
    const navigation = useNavigation();
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

    const profileRoute = route.params?.profile;
    const Screenheight = Dimensions.get('window').height
    const userdata = useSelector((state:any) => state.userData)
    const useritem = userdata[0];
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )
 
    const scrollY = useRef(new Animated.Value(0)).current;
    const MAX_HEIGHT  = Screenheight / 3.5;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 2.5; 

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
        setBtnLoading(true);
        try{
            if(!profileRoute){
                console.log("ERROR : Failed to following because cannot founds this account");
                return
            }

            const firebase = firestore().collection('Users');     
            const targetDoc = firebase.doc(currentProfile.id);
            const myDoc = firebase.doc(userdata[0].id);
            

            let myfollowlist = {...userdata[0]};
            let intrpeople_increment = currentProfile.follower 
            let increment  = 1
            if(isfollow){
                intrpeople_increment -= 1 
                myfollowlist.following -= 1
                increment  = -1
                
                const deletelist = myfollowlist.followlist.filter(doc => doc !== currentProfile.id)
                myfollowlist.followlist = deletelist
              
            }else{
                intrpeople_increment += 1
                myfollowlist.following += 1
                myfollowlist.followlist.push(currentProfile.id)
            }
                   
            await targetDoc.update({follower : firestore.FieldValue.increment(increment)});
            await myDoc.update({following : firestore.FieldValue.increment(increment) , followlist  : myfollowlist.followlist });
            setisfollow(!isfollow)
            setCurrentProfile({...currentProfile, follower : intrpeople_increment})

            dispatch(setUser([{...myfollowlist}]))
            // Notification
            if(!isfollow){
                if(profileRoute.message_token){
                    sendNotification({
                        token : profileRoute.message_token,
                        target : profileRoute.id,
                        body :`${userdata?.[0].username} start following you`,
                        icon : userdata?.[0].pf_image,
                        type : "follow",
                        project : "profile",
                        id : userdata?.[0].id,
                    });
                }else{
                    console.log("ERROR : Failed to send Notification because target doesn't have message token.")
                }
            }
            

        }catch(error){
            console.log("Failed to increment follow" , error);
        }
    
        setBtnLoading(false);
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);


    useEffect(() => {
        ValidateAccount();
    },[refreshing ])


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
            refreshControl={
                <RefreshControl 
                refreshing = {refreshing} 
                onRefresh={onRefresh}
                tintColor={'white'}
                />
            }
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
                            careersAmout = {careersAmout}
                            isfollow = {isfollow}
                            isLoading = {isBtnLoading}
                            isOwner = {isOwner} 
                            action = {followPeople}/>
                            <VStack bg={theme.Bg.base}>
    
                                <HStack pl={8} h={10} space={1} alignItems={'center'}>
                                    <Text fontWeight={'semibold'}  color={theme.Text.base}>{currentProfile?.username}</Text>
                                    <Text fontWeight={'semibold'}  color={theme.Text.base}>Careers</Text>
                                </HStack>
                                
                                <VStack mb={HEADER_HEIGHT_EXPANDED}>
                                    <Careersection id = {currentProfile.id} setCareerAmout = {setCareersAmount}/>
                                </VStack>
                            </VStack>
                        </VStack>
                  )
                },[isLoading, isBtnLoading , isfollow , careersAmout , currentProfile])}
            >   
         
            </Animated.FlatList>
        </Box>
    )
}

export default Profile;