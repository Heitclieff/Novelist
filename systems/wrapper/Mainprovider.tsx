import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeBigprovider } from "../theme/Themeprovider";
import Router from "../navigation/Router";
//Redux functions.
import store from "../redux/store";
import { Provider } from "react-redux";

const Mainprovider : React.FC = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Provider store=  {store}>
            <GestureHandlerRootView style = {{flex : 1}}>
              <BottomSheetModalProvider>
                <ThemeBigprovider>
                  <Router/>
                </ThemeBigprovider> 
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </Provider>
      </NativeBaseProvider>
    </NavigationContainer>  
  );
}

export default Mainprovider;