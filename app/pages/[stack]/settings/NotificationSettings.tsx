import React,{useEffect , Suspense} from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'
import {
Box,
VStack,
HStack,
Center,
Text,
Divider,
Button,
Input,
Switch,
 } from 'native-base'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getuserData } from '../../../../systems/redux/action'
import { Image } from 'expo-image'
import { Flatlist } from '../[global]/Flatlist'
//Import pages and components
const LazyProfilebackground  = React.lazy(() =>import('../../../components/[stack]/Profile/[container]/Profilebackground'));
const LazyAvatarfield  = React.lazy(() =>import('../../../components/[stack]/Profile/[container]/Avatarfield'));
const LazyEditoptionfield = React.lazy(() => import ('../../../components/global/[container]/Editoptionfiled'))
import EditProfilebar from '../../../components/[stack]/Profile/[container]/EditProfilebar'
import Edittingbar from '../../../components/[stack]/Profile/[container]/Edittingbar'
interface Pageprops {}

const MemorizeProfilebackground = React.memo(LazyProfilebackground)
const MemorizeAvatarfield = React.memo(LazyAvatarfield)


const NotificationSettings : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeContext);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  const MenuOptions = [{
    title : 'Notification' , 
    description : 'Notification on your device when something has update.',
  },
  ]

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
      <Edittingbar title= 'Notification' rightButtonEnable = {false}/>
      <Flatlist>
        <VStack flex = {1} mt = {1}  space = {3}> 
            <VStack >          
               <Suspense  fallback = {<Box>Loading..</Box>}>       
               {MenuOptions.map((items , key) => 
                    <VStack space = {3}  key=  {key} p = {4} pl = {7}>
                          <HStack w = '100%' justifyContent={'space-between'} alignItems={'center'}>
                              <Text fontWeight={'semibold'} fontSize={'md'} color = {theme.Text.base}>{items.title}</Text>
                              <Switch defaultIsChecked size={'sm'}/>
                         </HStack> 
                         <Text color = {theme.Text.description}>{items.description}</Text>
                    </VStack>
               )}
               </Suspense>    
            </VStack>
        </VStack>
      </Flatlist>
      
    </Box>
  )
}


export default NotificationSettings;