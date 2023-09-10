import React,{lazy , Suspense} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box } from 'native-base';
//@Navigate Pages
import Tabsnavigator from './Tabsnavigator';
const NovelContent = lazy(() => import('../../../features/content'));
const Notification = lazy(() => import('../../../features/notification'));
const Search = lazy(() => import('../../../features/search'));
const Leaderboard = lazy(() => import('../../../features/leaderboard'));
const Profile = lazy(() => import('../../../features/profile'));
const Bookmarks = lazy(() => import('../../../features/bookmarks'));
const Editprofile = lazy(() => import('../../../features/profile/Editprofile'));
const Settings = lazy(() => import('../../../features/settings'));
const AccountSettings = lazy(() => import('../../../features/settings/account'));
const NotificationSettings = lazy(() => import('../../../features/settings/notification'));
const Template = lazy(() => import('../../../features/_template'));
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

          <Stack.Screen 
          name = "ProfileStack"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Profile {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Editprofile"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Editprofile {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Leaderboard"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Leaderboard {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Bookmarks"
          options={{headerShown : true}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Bookmarks {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Settings"
          options={{headerShown : true}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Settings {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "AccountSettings"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <AccountSettings {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "NotificationSettings"
          options={{headerShown : true , headerTitle : "Notification"}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <NotificationSettings {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Template"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <Template {...props}/>
            </Suspense>
            }
          </Stack.Screen>
    </Stack.Navigator>
  )
}


export default Stacknavigator;