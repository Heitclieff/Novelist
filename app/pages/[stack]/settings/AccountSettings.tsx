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


const AccountSettings : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeContext);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  const MenuOptions = [{
    title : 'Username' , 
    value : userdata[0].username,
  },
  {
    title : 'Phone',
    value : '+66959521138',
  },
  {
    title : 'Email',
    value : userdata[0].email,
  },
  {
     title : 'Password',
     value : userdata[0].email,
   },
  ]

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
      <Edittingbar title= 'Account' rightButtonEnable = {false}/>
      <Flatlist>
        <VStack flex = {1} mt = {1}  space = {3}> 
            <VStack >          
               <Suspense  fallback = {<Box>Loading..</Box>}>       
               {MenuOptions.map((items , key) => 
               <VStack space = {1}  key=  {key}>
                    <LazyEditoptionfield  
                    inputColor = {theme.Text.description}
                    inputStyle = {'space-between'} 
                    options = {items}/>
               </VStack>
               )}
               </Suspense>    
            </VStack>
            <Box p = {5}>
               <Button size={'sm'} rounded={'full'}  variant={'outline'} borderColor={'red.500'}>
                    <Text color={'red.500'} fontSize={'xs'}>Log out</Text>        
               </Button>
            </Box>
        </VStack>
      </Flatlist>
      
    </Box>
  )
}


export default AccountSettings;