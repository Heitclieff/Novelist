import React , {useEffect, useState ,useCallback , Suspense, useMemo , useRef} from 'react'
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

import Animated from 'react-native-reanimated'
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { getuserData } from '../../../../systems/redux/action'

import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

//Component && Layouts;
import Tabcontrols from './[ProfileTabs]/Tabcontrols'
import ProfileHeader from '../../../components/[stack]/Profile/[container]/ProfileHeader'
import Navigationbar from '../../../components/[stack]/Profile/Navigationbar'
import Careerpage from './[ProfileTabs]/[pages]/Careerpage'
import { Header, HeaderTitle } from '@react-navigation/elements'

interface StackProps {
    Profiledata : any
}

const LazyProfilebackground  = React.lazy(() =>import('../../../components/[stack]/Profile/[container]/Profilebackground'));


const Profile : React.FC <StackProps> = ({Profiledata = []}) => {
    const theme:any = useContext(ThemeContext)
    const [canEdit, setcanEdit] = useState<boolean>(false);
    const [isLoading , setIsLoading] = useState<boolean>(true);
    const [HeaderTitle , setHeaderTitle] =  useState<string>('');

    const navigation = useNavigation();
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    
    const userdata = useSelector((state:any) => state.userData)
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )
    const [currentProfile , setCurrentProfile] = useState<any>(userdata[0]);
    
        
    const scrollY = useRef(new Animated.Value(0)).current;
    const MAX_HEIGHT  = 250;
    const HEADER_HEIGHT_NARROWED = 90;
    const HEADER_HEIGHT_EXPANDED = 100; 

    useEffect(() => {
        dispatch(getuserData());
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
            <Navigationbar
            Title =  {HeaderTitle}
            />
            <Box w = '100%' h = {MAX_HEIGHT} position={'absolute'}>
                <LazyProfilebackground background={currentProfile.background} scrollY={scrollY}/>
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
                    <VStack flex = {1} bg = {theme.Bg.base}>
                    <ProfileHeader currentProfile={currentProfile}/>
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
                                <Skeleton.Text  lines={2} alignItems="start" mt = {-70}  px="12" startColor= {theme.Text.skelton}/>
                                <Skeleton w = '90%' h = '150' rounded = 'md'  mt = {50} startColor= {theme.Bg.container}/>
                                <Skeleton.Text lines={2} alignItems="start" mt = {-70}  px="12" startColor= {theme.Text.skelton}/>
                            </VStack>    
                            </VStack>
                        </Center> : 
                        <Careerpage/> }

                    {/* <Box w  = '100%' h = '100%' bg = {theme.Bg.base} justifyContent={'center'} alignItems={'center'}>
                        <Text color = {theme.Text.description}>Nothing Career.</Text>
                    </Box> */}
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
