import React , {useState} from 'react'
import { View, useWindowDimensions, StatusBar} from 'react-native'
import { Box ,Button ,Text, VStack, Center } from 'native-base'
import { TabView , SceneMap ,TabBar } from 'react-native-tab-view'
import Careerpage from './[pages]/Careerpage'
import Librarypage from './[pages]/Librarypage'
import { Flatlist } from '../../[global]/Flatlist'
import { Dimensions } from 'react-native'

const FirstRoute = () => 
<View style={{ flex: 1, backgroundColor: '#ff4081' }} >
      <Text>hello worlds</Text>
  </View>

const SecondRoute = () => <Center flex={1} my="4">
    This is Tab 2
  </Center>;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
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
interface Tabprops { 
}

const TabsControls : React.FC <Tabprops> = () => {
     const layout = useWindowDimensions();
     const [index , setIndex] = useState<number>(0);
     const [routes] = useState([
     {key  : 'first' , title : 'Careers'},
     {key  : 'second', title : "Library"},
     ])


  return (
          <TabView
            navigationState={{index, routes}}
            renderScene = {renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{width  : layout.height}}
            style={{marginTop: StatusBar.currentHeight,}}
        />
      
  )
}

export default TabsControls ;