import React,{FC ,lazy, Suspense , useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome5, Ionicons , AntDesign ,MaterialIcons ,EvilIcons} from '@expo/vector-icons';
import { Box, Icon, IconButton , Button , Text} from 'native-base'
import { useContext } from 'react';
import { ThemeContext } from './Theme/ThemeProvider';
//Pages Tabs 
const Main = lazy(() => import('../app/pages/Main'));
const Category = lazy(() => import('../app/pages/Category'));
const Menu = lazy(() => import('../app/pages/Menu'));
const Library = lazy(() => import('../app/pages/Library'));
const Creater = lazy(() => import('../app/pages/Creater'));

// Pages Stack
import Settings from '../app/pages/[stack]/settings/Settings'
const LazyProfile = lazy(() => import('../app/pages/[stack]/Profile/Profile'));
const LazyEditProfile = lazy(() => import('../app/pages/[stack]/Profile/Editprofile'));
const LazyNovelContent = lazy(() => import('../app/pages/[stack]/Novel/[pages]/NovelContent'));

const LazyNotification = lazy(() => import('../app/pages/[stack]/Novel/[pages]/Notification'));
const LazyLeaderboard = lazy(() => import('../app/pages/[stack]/leaderboard/Leaderboard'));

import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
interface Router {

}

const Tab =  createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Router : React.FC <Router> = () =>  {
  const theme:any = useContext(ThemeContext)
  const navigation = useNavigation();

  return (theme && 
    <Stack.Navigator screenOptions={{headerStyle : {
      backgroundColor : theme.Bg.tabbar,
      }, 
      headerTitleStyle : {color : theme.Text.tabbar} ,
      animation : 'slide_from_left'
      }}>
        <Stack.Screen 
        name = "MainStack"
        options={{headerShown : false }}>
          {(props:any) => <TabsNavigation {...props} theme = {theme}/>}
        </Stack.Screen>
        <Stack.Screen 
        name = "SettingsStack"
        component = {Settings}
        options={{
          title : 'Settings',
          headerShown : true,
        }}/>
        <Stack.Screen 
        name = "ProfileStack"
        options={{
          title : 'Profile',
          headerShown :false,
          headerLeft : (props) => (
            <IconButton
            ml = {2}
            {...props}
            icon={
              <Icon
                  as={Entypo}
                  name='chevron-left'
                  size={'xl'}
                  color = {theme.Icon.back}
              ></Icon>
            }
            w = '5'
            h = '5'
            onPress={() => {
              navigation.goBack();
            }}/>
          )
        }}>
          {(props:any) => 
          <Suspense fallback ={<Box>Loading...</Box>}>
            <LazyProfile {...props}/>
          </Suspense>
          }
        </Stack.Screen>
        <Stack.Screen
          name = 'Editprofile'
          options={{
            title :'Edit Profile',
            headerShown : true,       
            headerLeft : (props) => (
              <Text 
              ml = {2} 
              fontSize={'md'}
              fontWeight={'medium'}
              color = {theme.Text.heading}
              {...props}
              onPress={() => {
                navigation.goBack();
              }}>Cancel</Text>
            )
          }}>
            {(props:any) => 
              <Suspense fallback = {<Box>Loading..</Box>}>
                <LazyEditProfile {...props}/>
              </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          name = "Novelmain"
          options={{
            headerShown : false ,
            }}>
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyNovelContent {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          name = "Notification">
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyNotification {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          options={({route}) =>({
            headerBackTitleVisible:false,
            headerTitle : false,
            headerTransparent:true,
            headerTintColor : '#fff',
            headerStyle : {backgroundColor : 'transparent'}
          })}
          name = "Leaderboard">
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyLeaderboard {...props}/>
            </Suspense>
            }
          </Stack.Screen>
    </Stack.Navigator>
  )
}

interface Tabprops { 
  theme : any;
}

const TabsNavigation: React.FC <Tabprops> = ({theme}) => {

    return (
        <Tab.Navigator screenOptions={{
          tabBarStyle : {backgroundColor : theme.Bg.tabbar ,borderTopColor : theme.Divider.tabbar} ,
          headerStyle : {backgroundColor : theme.Bg.tabbar , shadowColor : theme.Divider.stackbar},
          headerTitleStyle : {color : theme.Text.tabbar} ,
          
        }}
        >
          <Tab.Screen
          name = 'TabMain'
          options={{
            title : 'Home',
            headerShown: false,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color ,focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={FontAwesome5} name = "home" />)
            
            }}>
              {(props:any) => (
                <Suspense fallback={<Box>Loading...</Box>}>
                  <Main {...props}/>
                </Suspense> 
              )}
            </Tab.Screen>
          <Tab.Screen
          name = 'TabCategory'
          options={{
            title : 'Category',
            headerShown: true,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color , focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={MaterialIcons} name = "category" />)
            }}>
              {(props:any) => ( 
              <Suspense fallback={<Box>Loading...</Box>}> 
                <Category {...props}/>
              </Suspense>)}
          </Tab.Screen>
          <Tab.Screen
          name = 'TabCreater'
          options={{
            title : 'Create',
            headerShown: false,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color ,focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={Ionicons} name = "create" />),
            }}>
              {(props:any) => (
              <Suspense fallback={<Box>Loading...</Box>}>
                <Creater {...props}/>
              </Suspense>
              ) }
          </Tab.Screen>
          <Tab.Screen
          name = 'TabLibrary'
          options={{
            title : 'Library',
            headerShown: true,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color , focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={Ionicons} name = "ios-library" />)
            }}>
            {(props:any) => (
            <Suspense fallback={<Box>Loading...</Box>}>
              <Library {...props}/>
            </Suspense>)
            }
          </Tab.Screen>
          <Tab.Screen
          name = 'TabMenu'
          options={{
            title : 'Menu',
            headerShown: false,
            
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color , focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={EvilIcons} name = "user" />)
            }}
          >
            {(props:any) => (
              <Suspense fallback={<Box>Loading...</Box>}>
                <Menu {...props}/>
              </Suspense>
            )}
          </Tab.Screen>
      </Tab.Navigator>
    )
}

export default Router;
