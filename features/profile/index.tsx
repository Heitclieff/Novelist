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

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { getuserData } from '../../systems/redux/action'

//@Components && Sections;
import Headersection from './section/Headersection'
import Centernavigation from '../../components/navigation/Centernavigation'
import Careersection from './section/Careersection'
interface StackProps {
    Profiledata : any
}

const ParallaxBackground  = React.lazy(() =>import('./components/Background'));

const Profile : React.FC <StackProps> = ({Profiledata = []}) => {
    const theme:any = useContext(ThemeWrapper)
    const [canEdit, setcanEdit] = useState<boolean>(false);
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [HeaderTitle , setHeaderTitle] =  useState<string>('');

    const navigation = useNavigation();
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    
    const Screenheight = Dimensions.get('window').height
    const userdata = useSelector((state:any) => state.userData)
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )
    const [currentProfile , setCurrentProfile] = useState<any>(userdata[0]);
    
        
    const scrollY = useRef(new Animated.Value(0)).current;
    const MAX_HEIGHT  = Screenheight / 3.5;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 2.5; 

    useEffect(() => {
        dispatch(getuserData());
        console.log('profile',userdata[0].bg_image)
    } , [dispatch , isReduxLoaded])

    const ValidatePiorityAccount = () => {
        if(Profiledata.length === 0 || !Profiledata){      
            setcanEdit(true);
            return currentProfile
        }
        if(userdata[0].username !== 'Heitclieff'){ //validate If not User Account it's view spectetor mode.
            setCurrentProfile(Profiledata[0]);
            return userdata[0]
        }
    }

    const SetProfileHeaderTitle = () => {
        const account = ValidatePiorityAccount();
        setHeaderTitle(account.username)
    }

    useEffect(() => {
        SetProfileHeaderTitle();
    } , []);

    useEffect(() => {
        setIsLoading(true);
  
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
                <ParallaxBackground background={currentProfile.bg_image} scrollY={scrollY}/>
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
                    <VStack flex = {1}>
                        <Headersection currentProfile={currentProfile}/>
                    <VStack bg = {theme.Bg.base}>                    
                        <HStack pl = {8} h = {10} space=  {1} alignItems={'center'}>
                            <Text fontWeight={'semibold'} color = {theme.Text.base}>{currentProfile.username}</Text>
                            <Text color = {theme.Text.base}>Careers</Text>
                        </HStack>
                        <VStack mb = {HEADER_HEIGHT_EXPANDED}>
                            {isLoading ? 
                            <Center w = '100%' h= '100%' justifyContent={'flex-start'} mt = {10}>
                            <VStack  w = '100%'rounded="md">
                                <VStack w = '100%' flex=  {1}  pb = {1} alignItems={'center'}>
                                    <Skeleton w = '90%' h = '150' rounded = 'md' startColor= {theme.Bg.container}/>
                                    <Skeleton.Text  lines={2} alignItems="flex-start" mt = {-70}  px="12" startColor= {theme.Text.skelton}/>
                                    <Skeleton w = '90%' h = '150' rounded = 'md'  mt = {50} startColor= {theme.Bg.container}/>
                                    <Skeleton.Text lines={2} alignItems="flex-start" mt = {-70}  px="12" startColor= {theme.Text.skelton}/>
                                </VStack>    
                                </VStack>
                            </Center> : 
                            <Careersection/> }
                        </VStack>
                        </VStack>
                    </VStack>
                  )
                },[isLoading])}
            >   
            </Animated.FlatList>
        </Box>
    )
}

export default Profile;