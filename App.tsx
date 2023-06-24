import React,{useEffect , useState} from "react";
import Router from "./systems/Router";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import colorModeManager from "./systems/ColorModemanager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "./systems/theme";
import { Themedark , Themelight } from "./systems/theme";

export default function App() {
  const [mode, setmode] = useState();
  const [themeMode,  setThemeMode] = useState <any>({});
  const [themeLoaded , setThemeLoaded] = useState<boolean>(false)

  const getTheme = async () : Promise <any> => {
    try {
      const items = await AsyncStorage.getItem('theme');
      console.log("Global Theme" , items);
      return items;
      

    } catch(e){
      console.log(e)
    }
  }

  const initializeTheme = async () => {
    const items = await getTheme();
    if (items) {
      setThemeMode(items === 'dark' ? Themedark : Themelight);
      setThemeLoaded(true);
    }
  };

  const setTheme = (item:any) => {
      setThemeMode(item ? Themedark : Themelight)
  }

  useEffect(() => {
    initializeTheme();
  }, [])
  return (
    <NavigationContainer>
      <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
          {themeLoaded && <Router theme = {themeMode} setTheme = {setTheme}/>}
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

