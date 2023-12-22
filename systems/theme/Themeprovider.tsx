import { createContext , useState , useEffect } from "react";
import { Box } from "native-base";
import { StatusBar } from "react-native";

//Redux functions.
import { useDispatch , useSelector } from "react-redux";
import { loadThemefromStorage } from "../redux/action";
import { AnyAction } from "redux";
import { RootState } from "../redux/reducer";
import { ThunkDispatch } from "redux-thunk";

interface Provider {
    theme : any,
    children : any,
 }
interface ThemeContext {
    children:any
 }

const ThemeWrapper = createContext(undefined);

const ThemeProvider :React.FC <Provider> = ({theme ,children}) => {
    return(
        <ThemeWrapper.Provider value = {theme}>
            {children}
        </ThemeWrapper.Provider>
    )
}
export {ThemeProvider , ThemeWrapper};

const ThemeBigprovider : React.FC <ThemeContext> = ({children}) => {
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const theme = useSelector((state:RootState) => state.theme)
    const isReduxLoaded = useSelector((state:RootState) => state.isthemeLoaded);
  
    useEffect(() => {
        dispatch(loadThemefromStorage());
    } , [dispatch ,theme])

  return (
   <ThemeProvider theme = {theme}>
    <Box flex= {1} position={'relative'}> 
      <StatusBar translucent backgroundColor={'transparent'} barStyle={theme.themeMode == 'dark' ?'light-content' : 'dark-content'}/>
      <Box flex= {1}>
        {isReduxLoaded &&  children}
      </Box>   
    </Box>
   </ThemeProvider>
  )
}

export {ThemeBigprovider};


