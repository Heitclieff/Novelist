import React, {useContext} from 'react'
import { ThemeWrapper } from '../../theme/Themeprovider';
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Customdrawer from '../../../features/content/creator/drawer/Customdrawer';

//@page
import Creatorcontent from '../../../features/content/creator';
import Projectsettings from '../../../features/content/creator/Projectsettings';
import Team from '../../../features/content/creator/teams';
import Commit from '../../../features/content/creator/commit';

const Drawer = createDrawerNavigator();

const Drawernavigator : React.FC = () => {
  const route = useRoute();
  const {id}:any = route.params;
  const theme:any = useContext(ThemeWrapper)

  return (
    <Drawer.Navigator 
    initialRouteName="Home" 
    drawerContent={props => <Customdrawer {...props}/>}
    screenOptions={{drawerActiveTintColor : theme.Text.tab.active, drawerInactiveTintColor : theme.Text.tab.inactive}}>
      <Drawer.Screen name="Dashboard" 
        component={Creatorcontent} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <MaterialIcon
              name='dashboard'
              size={15}
              color = {focused ? 'teal.600':'coolGray.300'}
              />
          )}}
      />

    <Drawer.Screen name="Teams" 
        component={Team} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <MaterialIcon
              name='dashboard'
              size={15}
              color = {focused ? 'teal.600':'coolGray.300'}
              />
          )}}
      />

      <Drawer.Screen name="Commit" 
          component={Commit} 
          initialParams={{id}}
          options={{headerShown : false , 
            drawerIcon : ({focused , size}) => (
              <MaterialIcon
                name='dashboard'
                size={15}
                color = {focused ? 'teal.600':'coolGray.300'}
                />
            )}}
        />

      <Drawer.Screen name="Project Settings" 
        component={Projectsettings} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <MaterialIcon
              name='dashboard'
              size={15}
              color = {focused ? 'teal.600':'coolGray.300'}
              />
          )}}
      />

    </Drawer.Navigator>
  )
}
export default Drawernavigator;