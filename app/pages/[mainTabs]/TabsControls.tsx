import React , {useState} from 'react'
import { View, useWindowDimensions,} from 'react-native'
import { Box ,Button ,Text, VStack } from 'native-base'
import { TabView , SceneMap ,TabBar } from 'react-native-tab-view'
import Firstpages from './[page]/Firstpages'
import Topnovelpages from './[page]/Topnovelpages'
import Hotnovelpages from './[page]/Hotnovelpages'
import Allnovelpages from './[page]/Allnovelpages'

const renderScene = SceneMap({
     first: Firstpages,
     second: Topnovelpages,
     third : Hotnovelpages,
     forth : Allnovelpages,
   });

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

export default function TabsControls() {
     const layout = useWindowDimensions();
     const [index , setIndex] = useState<number>(0);
     const [routes] = useState([
     {key  : 'first' , title : 'Home'},
     {key  : 'second', title : "Top Novels"},
     {key  : 'third',  title : "Hot Novels"},
     {key  : 'forth',  title : "All Novels"},
     ])

  return (
     <TabView
            navigationState={{index, routes}}
            renderScene = {renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width  :layout.width}}
            
     />
  )
}
