import React,{lazy , Suspense} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box } from 'native-base';
import { AppSkeleton } from '../../../components/skelton/app';

import Tabsnavigator from './Tabsnavigator';
import Drawernavigator from './Drawernavigator';

//@Navigate Pages
const Notification = lazy(() => import('../../../features/notification'));
const Search = lazy(() => import('../../../features/search'));
const Leaderboard = lazy(() => import('../../../features/leaderboard'));
const Profile = lazy(() => import('../../../features/profile'));
const Bookmarks = lazy(() => import('../../../features/bookmarks'));
const Editprofile = lazy(() => import('../../../features/profile/Editprofile'));
const EditChapter = lazy(() => import ('../../../features/creator/pages/editchapter'))
const Settings = lazy(() => import('../../../features/settings'));
const AccountSettings = lazy(() => import('../../../features/settings/account'));
const NotificationSettings = lazy(() => import('../../../features/settings/notification'));

const Template = lazy(() => import('../../../features/_template'));
const Editpage = lazy(() => import('../../../features/_template/editfield'));
const NovelContent = lazy(() => import('../../../features/reader'));
const Creatorcontent = lazy(() => import('../../../features/creator'));
const Createproject = lazy(() => import('../../../features/project/Createproject'));
const CreateChapter = lazy(() => import ('../../../features/creator/pages/createchapter'))
const Tag = lazy(() => import('../../../features/creator/pages/Tag'));
const Readcontent = lazy(() => import('../../../features/reader/content'));
const Loginpage = lazy(() => import('../../../features/validation/login'));
const Registerpage = lazy(() => import('../../../features/validation/register'));

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
            <Suspense fallback = {<AppSkeleton/>}>
              <NovelContent {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Login"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Loginpage {...props}/>
            </Suspense>
            }
          </Stack.Screen>


          <Stack.Screen 
          name = "Register"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Registerpage {...props}/>
            </Suspense>
            }
          </Stack.Screen>


          <Stack.Screen 
          name = "Notification"
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Notification {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Search"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Search {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "ProfileStack"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Profile {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Editprofile"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Editprofile {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Editchapter"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <EditChapter {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "EditPage"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Editpage {...props}/>
            </Suspense>
            }
          </Stack.Screen>
      
          <Stack.Screen 
          name = "Leaderboard"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Leaderboard {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Bookmarks"
          options={{headerShown : true}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Bookmarks {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Settings"
          options={{headerShown : true}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Settings {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "AccountSettings"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <AccountSettings {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "NotificationSettings"
          options={{headerShown : true , headerTitle : "Notification"}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <NotificationSettings {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Template"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Template {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "CreateProject"
          options={{headerShown : false }}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Createproject {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "CreateChapter"
          options={{headerShown : false, animation : 'slide_from_bottom'}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <CreateChapter {...props}/>
            </Suspense>
            }
          </Stack.Screen>


          <Stack.Screen 
          name = "CreatorContent"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Drawernavigator {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Readcontent"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Readcontent {...props}/>
            </Suspense>
            }
          </Stack.Screen>

          <Stack.Screen 
          name = "Tags"
          options={{headerShown : false}}
          >
            {(props:any) => 
            <Suspense fallback = {<AppSkeleton/>}>
              <Tag {...props}/>
            </Suspense>
            }
          </Stack.Screen>

    </Stack.Navigator>
  )
}


export default Stacknavigator;