import React , {useState} from 'react'
import { View, useWindowDimensions,} from 'react-native'
import { Box ,Button ,Text, VStack } from 'native-base'
import { TabView , SceneMap ,TabBar } from 'react-native-tab-view'
import Firstpages from './[page]/Firstpages'
import Topnovelpages from './[page]/Topnovelpages'
import Hotnovelpages from './[page]/Hotnovelpages'
import Allnovelpages from './[page]/Allnovelpages'


const renderScene = (theme: string) => ({ route }: { route: Route }) => {
     switch (route.key) {
     case 'first':
          return <Firstpages theme={theme} />;
     case 'second':
          return <Topnovelpages theme={theme} />;
     case 'third':
          return <Hotnovelpages theme={theme} />;
     case 'fourth':
          return <Allnovelpages theme={theme} />;
       default:
         return null;
     }
 };
const renderTabBar = (props:any) => (
<Box w = '100%' display=  'flex' flexDir={'row'} justifyContent={'center'} >
     <TabBar        
          {...props}
          indicatorStyle={{ backgroundColor: '#0f766e' }}
          style={{ backgroundColor:  null , width : '90%'}}
          labelStyle = {{color : 'black' ,fontSize : 10}}
     />
</Box>

);

interface Tabprops { 
     theme : any
}

const TabsControls : React.FC <Tabprops> = ({theme}) => {
     const layout = useWindowDimensions();
     const [index , setIndex] = useState<number>(0);
     const [routes] = useState([
     {key  : 'first' , title : 'Home'},
     {key  : 'second', title : "Top Novels"},
     {key  : 'third',  title : "Hot Novels"},
     {key  : 'fourth',  title : "All Novels"},
     ])

     const renderSceneWithTheme = renderScene(theme)
  return (
     <TabView
            navigationState={{index, routes}}
            renderScene = {renderSceneWithTheme}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width  :layout.width}}
            
     />
  )
}

export default TabsControls;