import Router from "./systems/Router";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import colorModeManager from "./systems/ColorModemanager";
import theme from "./systems/theme";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider colorModeManager={colorModeManager} theme={theme}>
          <Router/>
      </NativeBaseProvider>
    </NavigationContainer>
   
  );
}

