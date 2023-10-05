import React, {useContext , useEffect , useState , lazy , Suspense} from 'react'
import { ThemeWrapper } from '../../theme/Themeprovider';
import { useRoute } from '@react-navigation/native';
import { Box } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
//@page

const Creatorcontent = lazy(() => import('../../../features/creator'));
const Projectsettings = lazy(() => import('../../../features/creator/pages/Projectsettings'));
const Team = lazy(() => import('../../../features/creator/pages/teams'));
const Commit = lazy(() => import('../../../features/creator/pages/commit'));
const Chapter = lazy(() => import('../../../features/creator/pages/chapter'));

//@Icons
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Customdrawer from '../../../features/creator/drawer/Customdrawer';
import FeatherIcon from 'react-native-vector-icons/Feather'
import IonIcon from 'react-native-vector-icons/Ionicons'

const Drawer = createDrawerNavigator();

const Drawernavigator : React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {id}:any = route.params;
  const theme:any = useContext(ThemeWrapper)
  const [projectdocument , setProjectdocument] = useState<{}>({});
  const [chapterdocs , setChapterdocs] = useState<{}>({});
  const [snapshotcontent ,setSnapshotcontent] = useState<[]>([]);
  const [isLoading ,setisLoading] = useState(true)
  const [ischapter , setisChapter] = useState(true)

  const getProjectcontent = async () : Promise<void> => {
    try {
      const snapshotcontent = await firestore().collection('Novels').doc(id);
      const snapshotproject =  await snapshotcontent.get()
      const projectdocs = snapshotproject.data();
  
      setProjectdocument(projectdocs);
      setSnapshotcontent(snapshotcontent)

      setisLoading(false)

    }catch(error){
      console.error('Error fetching document:', error);
    }
  }


  useEffect(() => {
    getProjectcontent();
  },[id])

  return (
    !isLoading && 
      <Drawer.Navigator 
      initialRouteName="Home" 
      drawerContent={props => <Customdrawer {...props}/>}
      screenOptions={{drawerActiveTintColor : theme.Text.tab.active, drawerInactiveTintColor : theme.Text.tab.inactive}}>

          <Drawer.Screen name="Dashboard" 
            component={Creatorcontent} 
            initialParams={{projectdocument  ,snapshotcontent , id}}
            options={{headerShown : false , 
            drawerIcon : ({focused , size}) => (
              <MaterialIcon
                name='dashboard'
                size={15}
                color = {focused ? theme.Icon.drawer : theme.Icon.base}
                />
            )}}
          />

          <Drawer.Screen name="Chapters" 
            component={Chapter} 
            initialParams={{}}
            options={{headerShown : false , 
            drawerIcon : ({focused , size}) => (
              <EntypoIcon
                name='list'
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