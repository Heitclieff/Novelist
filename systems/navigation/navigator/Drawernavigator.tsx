import React, {useContext , useEffect , useState , lazy , Suspense} from 'react'
import { ThemeWrapper } from '../../theme/Themeprovider';
import { useRoute } from '@react-navigation/native';
import { Box } from 'native-base';
import { CreatorSkeleton } from '../../../components/skelton/creator';
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


//@Redux Toolkits
import { setProjectDocument, setRating } from '../../redux/action';
import { useSelector , useDispatch } from 'react-redux';
const Drawer = createDrawerNavigator();

const Drawernavigator : React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const userdata = useSelector((state) => state.userData)
  const projectdocument = useSelector((state) => state.docs)
  const rating =  useSelector((state) => state.rates);

  const {id}:any = route.params;
  const theme:any = useContext(ThemeWrapper)
  const [projectDocument , setProjectdocument] = useState<{}>({});
  const [chapterdocs , setChapterdocs] = useState<{}>({});
  const [snapshotcontent ,setSnapshotcontent] = useState<[]>([]);
  const [isLoading ,setisLoading] = useState(true)
  const [refreshing , setRefreshing] = useState<boolean>(false);
  const [isupdated , setisUpdated] = useState(false)
  
  const getProjectcontent = async () : Promise<void> => {
    try {
        const snapshotcontent = await firestore().collection('Novels').doc(id);
        const snapshotproject =  await snapshotcontent.get()
        const projectdocs = snapshotproject.data();
  
        const memberdocs = await getProjectmember(snapshotcontent)

        let Ratingdocs = projectdocs.rating

        if(typeof(Ratingdocs) !== 'string'){
          const getRates = await projectdocs?.rating.get();
          Ratingdocs = getRates.data();
        }
        
        const projectkey = {...projectdocs , rating : Ratingdocs , creators : memberdocs}
  
        setProjectdocument(projectkey);
        setSnapshotcontent(snapshotcontent)
  
        dispatch(setProjectDocument({docs :projectkey , id : id}));
      
        setRefreshing(false);
        setisLoading(false)
    }catch(error){
      console.error('Error fetching document:', error);
    }
  }

  const fetchingRates = async () : Promise <void> => {
    const getrates =  await firestore().collection('Rates').get();
    const ratesdocs = getrates.docs.map((doc) =>({id : doc.id,  ...doc.data()}))
    dispatch(setRating({rates : ratesdocs}))
  }

  const getProjectmember = async (snapshotcontent:any) : Promise<void> => {
    try {
      const snapshotmember = await snapshotcontent.collection('Creator').get();
      const memberdocs = snapshotmember.docs.map(doc =>({doc_id : doc.id , ...doc.data()}))

      return memberdocs;
    }catch(error) {
      console.error('Error fetching Member:', error);
    }
  }
  useEffect(() => {
    const shouldRefresh = refreshing ||  projectdocument.id !== id;

    if (shouldRefresh) {
       getProjectcontent();
    }else {
      setisLoading(false)
    }
  
  },[id , refreshing])
  

  if(isLoading) return(
    <CreatorSkeleton/>
  )
  return (
      <Drawer.Navigator 
      initialRouteName="Home" 
      drawerContent={props => <Customdrawer {...props}/>}
      screenOptions={{drawerActiveTintColor : theme.Text.tab.active, drawerInactiveTintColor : theme.Text.tab.inactive}}>

          <Drawer.Screen name="Dashboard" 
            component={Creatorcontent} 
            initialParams={{projectdocument:  projectdocument.docs  ,snapshotcontent , id , isupdated , mainrefresh : setRefreshing}}
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
      {projectdocument.docs?.multiproject &&
          <>
                <Drawer.Screen name="Commit" 
                component={Commit} 
                initialParams={{snapshotcontent , id}}
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
              initialParams={{projectdocument : projectdocument.docs}}
              options={{headerShown : false , 
                drawerIcon : ({focused , size}) => (
                  <IonIcon
                    name='people'
                    size={15}
                    color = {focused ? theme.Icon.drawer : theme.Icon.base}
                    />
                )}}
            />
          </>
      }
    {projectdocument.docs?.owner === userdata?.[0].id  &&
        <Drawer.Screen name="Project Settings" 
        component={Projectsettings} 
        initialParams={{projectdocument : projectdocument.docs, id }}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <AntdesignIcon
              name='setting'
              size={15}
              color = {focused ? theme.Icon.drawer : theme.Icon.base}
              />
          )}}
      />
    }
      

    </Drawer.Navigator>
  )
}
export default Drawernavigator;