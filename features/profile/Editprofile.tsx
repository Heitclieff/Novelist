import React,{useEffect , Suspense} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useContext } from 'react'
import {
Box,
VStack,
HStack,
Center,
Text,
Divider,
Input,
Pressable
 } from 'native-base'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from '../../components/layout/Flatlist/FlatList'

 //@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getuserData } from '../../systems/redux/action'

//@Components
const LazyAvatarfield  = React.lazy(() =>import('../../components/field/Avatarfield'));
import Editprofilenavigation from '../../components/navigation/Editprofilenavigation'
import Editfield from '../../components/field/Editfiled'
interface Pageprops {}

const MemorizedEditprofilenavigation = React.memo(Editprofilenavigation);
const MemorizedAvatarfield = React.memo(LazyAvatarfield);
const MemorizedEditfield = React.memo(Editfield);

const Editprofile : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)
  const navigation = useNavigation();
  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  const MenuOptions = [{
    title : 'Username' , 
    value : userdata[0].username,
  },
  {
    title : 'description',
    value : 'description',
    height : '20',
  },
  {
    title : 'Birthdate',
    value : '25 December 2002',
  },

  ]

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
      <MemorizedEditprofilenavigation/>
      <FlatList>
        <VStack flex = {1} mt = {1}  space = {2}> 
            <Box id = 'Picture-edit' h= {200} mb = {2} position={'relative'}>
              <Center>
                <Box w = '100%' h = {160} overflow={'hidden'}>
                    <Image 
                    style={{width : '100%' ,height : '100%'}}
                    source={{uri : userdata[0].background}}
                    />
                </Box> 
              </Center>
              <Box ml = {5} position={'absolute'} bottom={0}   w = '85' h = '85' zIndex={10}>
                  <MemorizedAvatarfield image = {userdata[0].image} size = '100%'/>
                </Box>
            </Box>
            
            <VStack >          
            <Divider bg = {theme.Divider.base}/>
                <Suspense  fallback = {<Box>Loading..</Box>}>       
                  {MenuOptions.map((items , key) => 
                    <VStack space = {1}  key=  {key}>
                      <MemorizedEditfield options = {items}/>
                      <Divider bg = {theme.Divider.base}/>
                    </VStack>
                  )}
                </Suspense>    
            </VStack>
            <Box pl = {6}>
            <Pressable onPress={() => navigation.navigate('AccountSettings')}>
              {({
              isHovered,
              isFocused,
              isPressed
            }) => {
              return(
                <Text color =  {isPressed ? 'blue.800' : isHovered ? 'blue.800' :'blue.500'}>
                  Account Settings
                </Text>
              )}}
              </Pressable>
            </Box>
        </VStack>
      </FlatList>
    </Box>
  )
}


export default Editprofile;