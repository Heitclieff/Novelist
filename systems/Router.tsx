import React,{FC ,lazy, Suspense} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Themecolor } from './theme'

import { FontAwesome5, Ionicons , AntDesign ,MaterialIcons ,EvilIcons} from '@expo/vector-icons';
import { Box, Icon } from 'native-base'
//Pages Tabs 
const Main = lazy(() => import('../app/pages/Main'));
const Category = lazy(() => import('../app/pages/Category'));
const Menu = lazy(() => import('../app/pages/Menu'));
const Library = lazy(() => import('../app/pages/Library'));
const Creater = lazy(() => import('../app/pages/Creater'));

// Pages Stack
import Settings from '../app/pages/[stack]/settings/Settings'

interface Router {
  theme : any
  setTheme : any
 }

const Tab =  createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Router : React.FC <Router> = ({theme , setTheme}) =>  {
  console.log("Router Props" ,theme.Bg)

  return (
    <Stack.Navigator screenOptions={{headerStyle : {
      backgroundColor : theme.Bg.tabbar,
    }, 
      headerTitleStyle : {color : theme.Text.tabbar} ,
      }}>
        <Stack.Screen 
        name = "MainStack"
        options={{headerShown : false }}>
          {(props:any) => <TabsNavigation {...props} theme = {theme} setTheme={setTheme}/>}
        </Stack.Screen>
        <Stack.Screen 
        name = "SettingsStack"
        options={{
          title : 'Settings',
          headerShown : true,
        }}
        >
          {(props:any) => <Settings {...props} theme = {theme} setTheme = {setTheme}/>}
        </Stack.Screen>
    </Stack.Navigator>
  )
}


interface Tabprops { 
  theme : any;
  setTheme : any
}
const TabsNavigation: React.FC <Tabprops> = ({theme , setTheme}) => {
    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle : {backgroundColor : theme.Bg.tabbar ,borderTopColor : theme.Divider.tabbar} ,
        headerStyle : {backgroundColor : theme.Bg.tabbar , shadowColor : theme.Divider.stackbar},
        headerTitleStyle : {color : theme.Text.tabbar} ,
      }}>
        <Tab.Screen
        name = 'TabMain'
        options={{
          title : 'Home',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={FontAwesome5} name = "home" />)
          }}>
            {(props:any) => (
              <Suspense fallback={<Box>Loading...</Box>}>
                <Main {...props} theme =  {theme}/>
              </Suspense> 
            )}
          </Tab.Screen>
        <Tab.Screen
        name = 'TabCategory'
        options={{
          title : 'Category',
          headerShown: true,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={MaterialIcons} name = "category" />)
          }}>
            {(props:any) => ( 
            <Suspense fallback={<Box>Loading...</Box>}> 
              <Category {...props} theme =  {theme}/>
            </Suspense>)}
        </Tab.Screen>
        <Tab.Screen
        name = 'TabCreater'
        options={{
          title : 'Create',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={Ionicons} name = "create" />),
          }}>
             {(props:any) => (
             <Suspense fallback={<Box>Loading...</Box>}>
              <Creater {...props} theme =  {theme}/>
            </Suspense>
             ) }
        </Tab.Screen>
        <Tab.Screen
        name = 'TabLibrary'
        options={{
          title : 'Library',
          headerShown: true,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={Ionicons} name = "ios-library" />)
          }}>
          {(props:any) => (
          <Suspense fallback={<Box>Loading...</Box>}>
            <Library {...props} theme =  {theme}/>
          </Suspense>)
          }
        </Tab.Screen>
         <Tab.Screen
        name = 'TabMenu'
        options={{
          title : 'Menu',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={EvilIcons} name = "user" />)
          }}
        >
          {(props:any) => (
            <Suspense fallback={<Box>Loading...</Box>}>
              <Menu {...props} theme =  {theme} setTheme = {setTheme} />
            </Suspense>
          )}
        </Tab.Screen>
      </Tab.Navigator>
      
    )
}

export default Router;
