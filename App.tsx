import React,{useEffect , useState} from "react";
import Router from "./systems/Router";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import colorModeManager from "./systems/ColorModemanager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "./systems/theme";

export default function App() {
  const [mode, setmode] = useState();

  const getTheme = async () : Promise <any> => {
    try {
      const items = await AsyncStorage.getItem('theme');
      setmode(items)
      return items
    } catch(e){
      console.log(e)
    }
  }

  const setTheme = (item:any) => {
      setmode(item ? 'dark' : 'light');
  }

  useEffect(() => {
    getTheme();
  }, [])
  return (
    <NavigationContainer>
      <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
          <Router theme = {mode} setTheme = {setTheme}/>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

