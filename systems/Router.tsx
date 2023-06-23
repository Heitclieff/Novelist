import React,{FC} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Themecolor } from './theme'

import { FontAwesome5, Ionicons , AntDesign ,MaterialIcons ,EvilIcons} from '@expo/vector-icons';
import { Icon } from 'native-base'
//Pages Tabs 
import Main from '../app/pages/Main'
import Category from '../app/pages/Category'
import Menu from '../app/pages/Menu'
import Library from '../app/pages/Library'
import Creater from '../app/pages/Creater'

// Pages Stack
import Settings from '../app/pages/[stack]/settings/Settings'

interface Router {
  theme : any
  setTheme : any
 }

const Tab =  createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Router : React.FC <Router> = ({theme , setTheme}) =>  {
  console.log("Router Props" ,theme)
  return (
    <Stack.Navigator screenOptions={{headerStyle : {
      
      backgroundColor : theme === 'dark' ? Themecolor.tabbar.dark : Themecolor.tabbar.light ,
    }, 
      headerTitleStyle : {color : theme === 'dark' ? 'white' :'black' } ,
      
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
        tabBarStyle : {backgroundColor : theme === 'dark' ? Themecolor.tabbar.dark : Themecolor.tabbar.light ,borderTopColor : theme === 'dark' ? Themecolor.tabbar.border.dark : Themecolor.tabbar.border.light} ,
        headerStyle : {backgroundColor : theme === 'dark' ? Themecolor.tabbar.dark : Themecolor.tabbar.light , shadowColor : theme === 'dark' ? '#18181b': '#d1d5db'},
        headerTitleStyle : {color : theme === 'dark' ? 'white' :'black'} ,
      }}>
        <Tab.Screen
        name = 'TabMain'
        options={{
          title : 'Home',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={FontAwesome5} name = "home" />)
          }}>
            {(props:any) => <Main {...props} theme =  {theme}/>}
          </Tab.Screen>
        <Tab.Screen
        name = 'TabCategory'
        options={{
          title : 'Category',
          headerShown: true,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={MaterialIcons} name = "category" />)
          }}>
            {(props:any) => <Category {...props} theme =  {theme}/>}
        </Tab.Screen>
        <Tab.Screen
        name = 'TabCreater'
        options={{
          title : 'Create',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={Ionicons} name = "create" />),
          }}>
             {(props:any) => <Creater {...props} theme =  {theme}/>}
        </Tab.Screen>
        <Tab.Screen
        name = 'TabLibrary'
        options={{
          title : 'Library',
          headerShown: true,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={Ionicons} name = "ios-library" />)
          }}>
          {(props:any) => <Library {...props} theme =  {theme}/>}
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
          {(props:any) => <Menu {...props} theme =  {theme} setTheme = {setTheme} />}
        </Tab.Screen>
      </Tab.Navigator>
      
    )
}

export default Router;
