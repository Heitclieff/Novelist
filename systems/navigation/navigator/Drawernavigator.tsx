import React, {useContext} from 'react'
import { ThemeWrapper } from '../../theme/Themeprovider';
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

//@page
import Creatorcontent from '../../../features/content/creator';
import Projectsettings from '../../../features/content/creator/Projectsettings';
import Team from '../../../features/content/creator/teams';
import Commit from '../../../features/content/creator/commit';
import Chapter from '../../../features/content/creator/chapter';

//@Icons
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Customdrawer from '../../../features/content/creator/drawer/Customdrawer';
import FeatherIcon from 'react-native-vector-icons/Feather'
import IonIcon from 'react-native-vector-icons/Ionicons'

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
              color = {focused ? theme.Icon.drawer : theme.Icon.base}
              />
          )}}
      />

    <Drawer.Screen name="Commit" 
          component={Commit} 
          initialParams={{id}}
          options={{headerShown : false , 
            drawerIcon : ({focused , size}) => (
              <FeatherIcon
                name='git-commit'
                size={15}
                color = {focused ? theme.Icon.drawer : theme.Icon.base}
                />
            )}}
      />


      <Drawer.Screen name="Chapters" 
          component={Chapter} 
          initialParams={{id}}
          options={{headerShown : false , 
            drawerIcon : ({focused , size}) => (
              <EntypoIcon
                name='list'
                size={15}
                color = {focused ? theme.Icon.drawer : theme.Icon.base}
                />
            )}}
        />
      

    <Drawer.Screen name="Teams" 
        component={Team} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <IonIcon
              name='people'
              size={15}
              color = {focused ? theme.Icon.drawer : theme.Icon.base}
              />
          )}}
      />

      <Drawer.Screen name="Project Settings" 
        component={Projectsettings} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <AntdesignIcon
              name='setting'
              size={15}
              color = {focused ? theme.Icon.drawer : theme.Icon.base}
              />
          )}}
      />

    </Drawer.Navigator>
  )
}
export default Drawernavigator;