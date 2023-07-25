import React,{useEffect , useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import colorModeManager from "./systems/ColorModemanager";
import theme from "./systems/theme";
import { config } from "./systems/theme";
import store from "./systems/redux/store";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ThemeContext from "./systems/Theme/ThemeContext";


export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider colorModeManager={colorModeManager} theme={theme} config={config}>
        <Provider store=  {store}>
          <GestureHandlerRootView style = {{flex : 1}}>
            <ThemeContext/>
          </GestureHandlerRootView>
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

