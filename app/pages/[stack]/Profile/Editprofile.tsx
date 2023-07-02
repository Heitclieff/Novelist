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
Input,
 } from 'native-base'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getuserData } from '../../../../systems/redux/action'

//Import pages and components
const LazyProfilebackground  = React.lazy(() =>import('../../../components/[stack]/Profile/[container]/Profilebackground'));
const LazyAvatarfield  = React.lazy(() =>import('../../../components/[stack]/Profile/[container]/Avatarfield'));
const LazyEditoptionfield = React.lazy(() => import ('../../../components/global/[container]/Editoptionfiled'))

interface Pageprops {}

const MemorizeProfilebackground = React.memo(LazyProfilebackground)
const MemorizeAvatarfield = React.memo(LazyAvatarfield)


const Editprofile : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeContext);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  const MenuOptions = [{
    title : 'Username' , 
    value : userdata[0].username,
    height : '10',
  },
  {
    title : 'description',
    value : 'description',
    height : '20',
  },
  {
    title : 'Birthdate',
    value : '25 December 2002',
    height : '10',
  },

  ]

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
      <VStack safeArea space = {2}> 
          <Box id = 'Picture-edit' h = '220' position={'relative'}>
            <Center>
              <MemorizeProfilebackground background = {userdata[0].background}/>
            </Center>
            <Box pl = {6} position = 'absolute' bottom = {0} >
              <MemorizeAvatarfield image = {userdata[0].image}/>
            </Box>
          </Box>
          <Divider bg = {theme.Divider.base}/>
          <VStack mt = {2}>          
              <Suspense  fallback = {<Box>Loading..</Box>}>       
                {MenuOptions.map((items , key) => 
                  <VStack space = {1}  key=  {key}>
                    <LazyEditoptionfield options = {items}/>
                    <Divider mb = {1} bg = {theme.Divider.base}/>
                  </VStack>
                )}
              </Suspense>    
          </VStack>
          <Box pl = {6}>
            <Text color = 'blue.500'>Account Settings</Text>
          </Box>

      </VStack>
    </Box>
  )
}


export default Editprofile;