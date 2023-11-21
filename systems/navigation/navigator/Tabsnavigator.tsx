import React,{
  Suspense, 
  lazy
} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Box , Icon } from 'native-base';
import { AppSkeleton } from '../../../components/skelton/app';
import FontAwesomeIcon  from 'react-native-vector-icons/FontAwesome5'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
//@Pages
const Index = lazy(() => import('../../../pages/Index'));
const Category = lazy(() => import('../../../pages/Category'));
const Creator = lazy(() => import('../../../pages/Creator'));
const Library = lazy(() => import('../../../features/library'));
const Menu = lazy(() => import('../../../pages/Menu'));
const Tab = createBottomTabNavigator();

interface navigatorProps {
  theme:any
}
const Tabsnavigator : React.FC <navigatorProps> = ({theme}) => {
  return (
    <Tab.Navigator screenOptions={{
      tabBarStyle : {backgroundColor : theme.Bg.tabbar ,borderTopColor : theme.Divider.tabbar} ,
      headerStyle : {backgroundColor : theme.Bg.tabbar , shadowColor : theme.Divider.stackbar},
      headerTitleStyle : {color : theme.Text.tabbar} ,
      lazy : true,
    }}
    >
      <Tab.Screen
        name = 'Index'
        options={{
          
          title : 'Home',
          headerShown: false,
          tabBarActiveTintColor : theme.Text.bottomtab.focused,
          tabBarInactiveTintColor: theme.Text.bottomtab.base,
          tabBarIcon :(({size ,color ,focused}) => 
            <FontAwesomeIcon 
              size = {size} 
              color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} 
              name = "home" />)
          }}
      >
         {(props:any) => (
                <Suspense fallback={<AppSkeleton/>}>
                  <Index {...props}/>
                </Suspense> 
          )}
      </Tab.Screen>

      <Tab.Screen
        name = 'Category'
        options={{
          title : 'Category',
          headerShown: true,
          
          tabBarActiveTintColor : theme.Text.bottomtab.focused,
          tabBarInactiveTintColor: theme.Text.bottomtab.base,
          tabBarIcon :(({size ,color , focused}) => 
          <MaterialIcon 
          size = {size} 
          color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base}  
          name = "category" />)
          }}
      >
        {(props:any) => (
          <Suspense fallback={<AppSkeleton/>}>
            <Category {...props}/>
          </Suspense>
        )}
      </Tab.Screen>

      <Tab.Screen
        name = 'Creator'
        options={{
          title : 'Create',
          headerShown: false,
          
          tabBarActiveTintColor : theme.Text.bottomtab.focused,
          tabBarInactiveTintColor: theme.Text.bottomtab.base,
          tabBarIcon :(({size ,color , focused}) => 
          <IonIcon 
          size = {size} 
          color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base}  
          name = "create" />)
          }}
      >
        {(props:any) => (
          <Suspense fallback={<AppSkeleton/>}>
            <Creator {...props}/>
          </Suspense>
        )}
      </Tab.Screen>

      <Tab.Screen
        name = 'Library'
        options={{
          title : 'Library',
          headerShown: false,
          
          tabBarActiveTintColor : theme.Text.bottomtab.focused,
          tabBarInactiveTintColor: theme.Text.bottomtab.base,
          tabBarIcon :(({size ,color , focused}) => 
          <IonIcon 
          size = {size} 
          color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base}  
          name = "library" />)
          }}
      >
        {(props:any) => (
          <Suspense fallback={<AppSkeleton/>}>
            <Library {...props}/>
          </Suspense>
        )}
      </Tab.Screen>

      <Tab.Screen
        name = 'Menu'
        options={{
          title : 'Menu',
          headerShown: false,
          
          tabBarActiveTintColor : theme.Text.bottomtab.focused,
          tabBarInactiveTintColor: theme.Text.bottomtab.base,
          tabBarIcon :(({size ,color , focused}) => 
          <EvilIcon 
          size = {size} 
          color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base}  
          name = "user" />)
          }}
      >
        {(props:any) => (
          <Suspense fallback={<AppSkeleton/>}>
            <Menu {...props}/>
          </Suspense>
        )}
      </Tab.Screen>

    </Tab.Navigator>
  )
}
export default Tabsnavigator;