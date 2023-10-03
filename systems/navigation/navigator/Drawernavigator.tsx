import React, {useContext , useEffect , useState} from 'react'
import { ThemeWrapper } from '../../theme/Themeprovider';
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

//@page
import Creatorcontent from '../../../features/creator';
import Projectsettings from '../../../features/creator/pages/Projectsettings';
import Team from '../../../features/creator/pages/teams';
import Commit from '../../../features/creator/pages/commit';
import Chapter from '../../../features/creator/pages/chapter';

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
  const {id}:any = route.params;
  const theme:any = useContext(ThemeWrapper)
  const [projectdocument , setProjectdocument] = useState<{}>({});
  const [chapterdocument , setChapterdocument] = useState<{}>({});
  const [isLoading ,setisLoading] = useState(true)
  const [ischapter , setisChapter] = useState(true)

  const getProjectcontent = async () : Promise<void> => {
    try {
      const snapshotcontent = await firestore().collection('Novels').doc(id);
      const snapshotproject =  await snapshotcontent.get()
      const projectdocs = snapshotproject.data();
  
      setProjectdocument(projectdocs);
      
      const snapshotchapter = await snapshotcontent.collection('Chapters').orderBy('updateAt' , 'desc').get();
      const chapterdocs = snapshotchapter.docs.map(doc => ({id : doc.id , ...doc.data()}));

      setChapterdocument(chapterdocs)
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
        initialParams={{projectdocument , chapterdocument}}
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
          initialParams={{chapterdocument}}
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