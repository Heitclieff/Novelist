import React,{useEffect , Suspense , useContext} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
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
import { FlatList } from '../../components/layout/Flatlist/FlatList'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getuserData } from '../../systems/redux/action'
import { MenuOptions } from './assets/config'

interface Pageprops {}

const NotificationSettings : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  useEffect(() => {
    if(!isReduxLoaded) dispatch(getuserData());
  },[dispatch , isReduxLoaded])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
      <FlatList>
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
      </FlatList>
      
    </Box>
  )
}

export default NotificationSettings;