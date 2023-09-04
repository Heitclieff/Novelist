import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabsnavigator from './Tabsnavigator';

interface navigatorProps {
    theme:any
}

const Stack = createNativeStackNavigator();

const Stacknavigator : React.FC <navigatorProps> = ({theme}) => {
  return (
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
            {(props:any) => <Tabsnavigator {...props} theme = {theme}/>}
          </Stack.Screen>
    </Stack.Navigator>
  )
}


export default Stacknavigator;