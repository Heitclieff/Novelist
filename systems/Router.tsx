import React,{FC} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { FontAwesome5, Ionicons , AntDesign ,MaterialIcons} from '@expo/vector-icons';
import { Icon } from 'native-base'
//Pages 
import Main from '../app/pages/Main'
import Category from '../app/pages/Category'

interface Router { }

const Tab =  createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Router : React.FC <Router> = () =>  {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
          <Stack.Navigator>
              <Stack.Screen 
              name = "MainStack"
              component={TabsNavigation}
              options={{headerShown : false}}
              />
          </Stack.Navigator>

      </NativeBaseProvider>
    </NavigationContainer>
  
  )
}

const TabsNavigation = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
        name = 'TabMain'
        component={Main}
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
      </Tab.Navigator>
    )
}

export default Router;
