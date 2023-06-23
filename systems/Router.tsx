import React,{FC} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Themecolor } from './theme'
import { useColorMode } from 'native-base'

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

interface Router { }

const Tab =  createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const Router : React.FC <Router> = () =>  {
  const {colorMode} = useColorMode();
  return (
    <Stack.Navigator screenOptions={{headerStyle : {
      
      backgroundColor : colorMode === 'dark' ? Themecolor.tabbar.dark : Themecolor.tabbar.light ,
    }, 
      headerTitleStyle : {color : colorMode === 'dark' ? 'white' :'black' } ,
      
      }}>
        <Stack.Screen 
        name = "MainStack"
        component={TabsNavigation}
        options={{headerShown : false }}/>
          <Stack.Screen 
        name = "SettingsStack"
        component={Settings}
        options={{
          title : 'Settings',
          headerShown : true,
        }}
        />
    </Stack.Navigator>
  )
}

const TabsNavigation = () => {
    const {colorMode} = useColorMode();
    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle : {backgroundColor : colorMode === 'dark' ? Themecolor.tabbar.dark : Themecolor.tabbar.light ,borderTopColor : colorMode === 'dark' ? Themecolor.tabbar.border.dark : Themecolor.tabbar.border.light} ,
        headerStyle : {backgroundColor : colorMode === 'dark' ? Themecolor.tabbar.dark : Themecolor.tabbar.light , shadowColor : colorMode === 'dark' ? '#18181b': '#d1d5db'},
        headerTitleStyle : {color : colorMode === 'dark' ? 'white' :'black'} ,
      }}>
        <Tab.Screen
        name = 'TabMain'
        component= {Main}
        options={{
          title : 'Home',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={FontAwesome5} name = "home" />)
          }}
        />
        <Tab.Screen
        name = 'TabCategory'
        component={Category}
        options={{
          title : 'Category',
          headerShown: true,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={MaterialIcons} name = "category" />)
          }}
        />
        <Tab.Screen
        name = 'TabCreater'
        component={Creater}
        options={{
          title : 'Create',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={Ionicons} name = "create" />),
          
          }}
        />
        <Tab.Screen
        name = 'TabLibrary'
        component={Library}
        options={{
          title : 'Library',
          headerShown: true,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={Ionicons} name = "ios-library" />)
          }}
        />
         <Tab.Screen
        name = 'TabMenu'
        component={Menu}
        options={{
          title : 'Menu',
          headerShown: false,
          tabBarIcon :(({size ,color}) => 
          <Icon size = {size} color = {color} as ={EvilIcons} name = "user" />)
          }}
        />
      </Tab.Navigator>
      
    )
}

export default Router;
