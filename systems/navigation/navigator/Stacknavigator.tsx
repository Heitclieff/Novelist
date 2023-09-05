import React,{lazy , Suspense} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box } from 'native-base';
//@Navigate Pages
import Tabsnavigator from './Tabsnavigator';
const NovelContent = lazy(() => import('../../../features/content'));
const Notification = lazy(() => import('../../../features/notification'));
const Search = lazy(() => import('../../../features/search'));
interface navigatorProps {
    theme:any
}

const Stack = createNativeStackNavigator();

const Stacknavigator : React.FC <navigatorProps> = ({theme}) => {
  return (
    <Stack.Navigator  screenOptions={{headerStyle : {
        backgroundColor : theme.Bg.tabbar,
        }, 
        headerBackTitle : 'Back',
        headerTitleStyle : {color : theme.Text.tabbar} ,
        animation : 'slide_from_left'
        , headerTintColor : theme.Button.backbutton}
        }>
          <Stack.Screen 
          name = "MainStack"
          options={{headerShown : false }}>
            {(props:any) => <Tabsnavigator {...props} theme = {theme}/>}
          </Stack.Screen>

          <Stack.Screen 
          name = "Novelmain"
          options={{
            headerShown : false,
            }}>
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <NovelContent {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Notification"
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Notification {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Search"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Search {...props}/>
            </Suspense>
            }
          </Stack.Screen>



    </Stack.Navigator>
  )
}


export default Stacknavigator;