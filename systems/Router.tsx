import React,{FC ,lazy, Suspense , useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FontAwesome5, Ionicons , AntDesign ,MaterialIcons ,EvilIcons, Feather} from '@expo/vector-icons';
import { Box, Icon, IconButton , Button , Text} from 'native-base'
import { View } from 'react-native';
import { useContext } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeContext } from './Theme/ThemeProvider';
//Pages Tabs 
const Main = lazy(() => import('../app/pages/Main'));
const Category = lazy(() => import('../app/pages/Category'));
const Menu = lazy(() => import('../app/pages/Menu'));
const Library = lazy(() => import('../app/pages/Library'));
const Creater = lazy(() => import('../app/pages/Creater'));

// Pages Stack
import Settings from '../app/pages/[stack]/settings/Settings'
import Customdrawer from '../app/pages/[workspaceTabs]/Customdrawer';
const LazyProfile = lazy(() => import('../app/pages/[stack]/Profile/Profile'));
const LazyEditProfile = lazy(() => import('../app/pages/[stack]/Profile/Editprofile'));
const LazyNovelContent = lazy(() => import('../app/pages/[stack]/Novel/[pages]/NovelContent'));
const LazyCreatorcontent = lazy(() => import('../app/pages/[workspaceTabs]/Creatorcontent'))
const LazyNotification = lazy(() => import('../app/pages/[stack]/Novel/[pages]/Notification'));
const LazyLeaderboard = lazy(() => import('../app/pages/[stack]/leaderboard/Leaderboard'));
const LazyBookmarks = lazy(() => import('../app/pages/[stack]/Bookmarks/Bookmarks'))
const LazySearchpage = lazy(() => import('../app/pages/[stack]/[global]/Searchpage'))
const LazyEdittingtemplete = lazy(() => import('../app/pages/[stack]/Profile/[ProfileTabs]/[pages]/Edittingtemplete'))
const LazyAccountSettings = lazy(() => import('../app/pages/[stack]/settings/AccountSettings'))
const LazyNotificationSettings = lazy(() => import('../app/pages/[stack]/settings/NotificationSettings'))
const LazyItemlistTemplete = lazy(() => import('../app/pages/[stack]/[global]/ItemlistTemplete'))
const LazyCreateProject = lazy(() => import('../app/pages/[workspaceTabs]/CreateProject'))
const LazyTagpage = lazy(() => import('../app/pages/[workspaceTabs]/[pages]/Tagpage'))
const LazyNovelReadContent = lazy(() => import('../app/pages/[stack]/Novel/[pages]/NovelReadContent'))
// Page Drawer
const LazyTeam = lazy(() => import('../app/pages/[workspaceTabs]/[pages]/Team'))
const LazyCommit= lazy(() => import('../app/pages/[workspaceTabs]/[pages]/Commit'))
const LazyChapter= lazy(() => import('../app/pages/[workspaceTabs]/[pages]/Chapter'))
const LazyProjectsettings= lazy(() => import('../app/pages/[workspaceTabs]/[pages]/Projectsettings'))

interface Router {

}

const Tab =  createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Drawer =  createDrawerNavigator();

const Router : React.FC <Router> = () =>  {
  const theme:any = useContext(ThemeContext)
  const navigation = useNavigation();

  return (theme && 
    <Stack.Navigator screenOptions={{headerStyle : {
      backgroundColor : theme.Bg.tabbar,
      }, 
      headerTitleStyle : {color : theme.Text.tabbar} ,
      animation : 'slide_from_left'
      , headerTintColor : theme.Button.backbutton}
      }>
        <Stack.Screen 
        name = "MainStack"
        options={{headerShown : false }}>
          {(props:any) => <TabsNavigation {...props} theme = {theme}/>}
        </Stack.Screen>
        <Stack.Screen 
        name = "SettingsStack"
        component = {Settings}
        options={{
          title : 'Settings',
          headerShown : true,
        }}/>
        <Stack.Screen 
        name = "ProfileStack"
        options={{
          title : 'Profile',
          headerShown :false,
          headerLeft : (props) => (
            <IconButton
            ml = {2}
            {...props}
            icon={
              <Icon
                  as={Entypo}
                  name='chevron-left'
                  size={'xl'}
                  color = {theme.Icon.back}
              ></Icon>
            }
            w = '5'
            h = '5'
            onPress={() => {
              navigation.goBack();
            }}/>
          )
        }}>
          {(props:any) => 
          <Suspense fallback ={<Box>Loading...</Box>}>
            <LazyProfile {...props}/>
          </Suspense>
          }
        </Stack.Screen>
        <Stack.Screen
          name='Editprofile'
          options={{
            title: 'Edit Profile',
            headerShown: false,
            
          }}>
          {(props: any) => (
            <Suspense fallback={<Box>Loading..</Box>}>
              <LazyEditProfile {...props} />
            </Suspense>
          )}
        </Stack.Screen>
          <Stack.Screen 
          name = "Novelmain"
          options={{
            headerShown : false ,
            }}>
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyNovelContent {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          name = "Notification"

          >
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyNotification {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          options={({route}) =>({
            headerBackTitleVisible:false,
            headerTitle : false,
            headerTransparent:true,
            headerTintColor : '#fff',
            headerStyle : {backgroundColor : 'transparent'}
          })}
          name = "Leaderboard">
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyLeaderboard {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          name = "Bookmarks">
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazyBookmarks {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          <Stack.Screen 
          name = "Creatorcontent"
          options={{
            headerShown : false ,
          }}>
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <DrawerNavigation {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          
          <Stack.Screen 
          name = "Search"
          options={{
            headerShown : false ,
          }}>
            {(props:any) => 
            <Suspense fallback = {<Box>Loading..</Box>}>
              <LazySearchpage {...props}/>
            </Suspense>
            }
          </Stack.Screen>
          
          <Stack.Screen
            name='Edittingtemplete'
            options={{
              title: 'Editting templete',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyEdittingtemplete {...props} />
              </Suspense>
            )}
          </Stack.Screen>

          <Stack.Screen
            name='AccountSettings'
            options={{
              title: 'AccountSettings',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyAccountSettings {...props} />
              </Suspense>
            )}
          </Stack.Screen>

          <Stack.Screen
            name='NotificationSettings'
            options={{
              title: 'NotificationSettings',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyNotificationSettings {...props} />
              </Suspense>
            )}
          </Stack.Screen>

          <Stack.Screen
            name='ItemlistTemplete'
            options={{
              title: 'ItemlistTemplete',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyItemlistTemplete {...props} />
              </Suspense>
            )}
          </Stack.Screen>

          <Stack.Screen
            name='CreateProject'
            options={{
              title: 'CreateProject',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyCreateProject {...props} />
              </Suspense>
            )}
          </Stack.Screen>

          <Stack.Screen
            name='Tags'
            options={{
              title: 'Tags',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyTagpage {...props} />
              </Suspense>
            )}
          </Stack.Screen>
          
          <Stack.Screen
            name='NovelReadContent'
            options={{
              title: 'NovelReadContent',
              headerShown: false,
              
            }}>
            {(props: any) => (
              <Suspense fallback={<Box>Loading..</Box>}>
                <LazyNovelReadContent {...props} />
              </Suspense>
            )}
          </Stack.Screen>





    </Stack.Navigator>
  )
}

interface Tabprops { 
  theme : any;
}

const TabsNavigation: React.FC <Tabprops> = ({theme}) => {

    return (
        <Tab.Navigator screenOptions={{
          tabBarStyle : {backgroundColor : theme.Bg.tabbar ,borderTopColor : theme.Divider.tabbar} ,
          headerStyle : {backgroundColor : theme.Bg.tabbar , shadowColor : theme.Divider.stackbar},
          headerTitleStyle : {color : theme.Text.tabbar} ,
          
        }}
        >
          <Tab.Screen
          name = 'TabMain'
          options={{
            title : 'Home',
            headerShown: false,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color ,focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={FontAwesome5} name = "home" />)
            
            }}>
              {(props:any) => (
                <Suspense fallback={<Box>Loading...</Box>}>
                  <Main {...props}/>
                </Suspense> 
              )}
            </Tab.Screen>
          <Tab.Screen
          name = 'TabCategory'
          options={{
            title : 'Category',
            headerShown: true,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color , focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={MaterialIcons} name = "category" />)
            }}>
              {(props:any) => ( 
              <Suspense fallback={<Box>Loading...</Box>}> 
                <Category {...props}/>
              </Suspense>)}
          </Tab.Screen>
          <Tab.Screen
          name = 'TabCreater'
          options={{
            title : 'Create',
            headerShown: false,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color ,focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={Ionicons} name = "create" />),
            }}>
              {(props:any) => (
              <Suspense fallback={<Box>Loading...</Box>}>
                <Creater {...props}/>
              </Suspense>
              ) }
          </Tab.Screen>
          <Tab.Screen
          name = 'TabLibrary'
          options={{
            title : 'Library',
            headerShown: false,
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color , focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={Ionicons} name = "ios-library" />)
            }}>
            {(props:any) => (
            <Suspense fallback={<Box>Loading...</Box>}>
              <Library {...props}/>
            </Suspense>)
            }
          </Tab.Screen>
          <Tab.Screen
          name = 'TabMenu'
          options={{
            title : 'Menu',
            headerShown: false,
            
            tabBarActiveTintColor : theme.Text.bottomtab.focused,
            tabBarInactiveTintColor: theme.Text.bottomtab.base,
            tabBarIcon :(({size ,color , focused}) => 
            <Icon size = {size} color = {focused ? theme.Icon.bottomtab.focused : theme.Icon.bottomtab.base} as ={EvilIcons} name = "user" />)
            }}
          >
            {(props:any) => (
              <Suspense fallback={<Box>Loading...</Box>}>
                <Menu {...props}/>
              </Suspense>
            )}
          </Tab.Screen>

          
      </Tab.Navigator>
    )
}

interface DrawerProps {

}

const DrawerNavigation : React.FC <DrawerProps> = () => {
  const route = useRoute();
  const {id}:any = route.params;
  const theme:any = useContext(ThemeContext)

  //change data fetching here.
  return(
    <Drawer.Navigator 
    initialRouteName="Home" 
    drawerContent={props => <Customdrawer {...props}/>}
    screenOptions={{drawerActiveTintColor : theme.Text.tab.active, drawerInactiveTintColor : theme.Text.tab.inactive}}>
      <Drawer.Screen name="Dashboard" 
        component={LazyCreatorcontent} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
            <Icon
              as={MaterialIcons}
              name='dashboard'
              size={4}
              color = {focused ? 'teal.600':'coolGray.300'}
              />
        )}} />
      
      <Drawer.Screen name="Chapters" 
        component={LazyChapter} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
          <Icon
            as={Entypo}
            name='list'
            size={4}
            color = {focused ? 'teal.600':'coolGray.300'}
            />
          )}} />

      <Drawer.Screen name="Commit" 
        component={LazyCommit} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
          <Icon
            as={Feather}
            name='git-commit'
            size={4}
            color = {focused ? 'teal.600':'coolGray.300'}
            />
          )}} />
      

      <Drawer.Screen name="Teams" 
        component={LazyTeam} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
          <Icon
            as={Ionicons}
            name='people'
            size={4}
            color = {focused ? 'teal.600':'coolGray.300'}
            />
          )}} />
       
 
      <Drawer.Screen name="Project Settings" 
        component={LazyProjectsettings} 
        initialParams={{id}}
        options={{headerShown : false , 
          drawerIcon : ({focused , size}) => (
          <Icon
            as={AntDesign}
            name='setting'
            size={4}
            color = {focused ? 'teal.600':'coolGray.300'}
            />
          )}} />
    </Drawer.Navigator>
  )
}


export default Router;

