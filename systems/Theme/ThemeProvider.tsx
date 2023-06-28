import { createContext , useState } from "react";

interface Provider {
    theme : any,
    children : any,
 }

const ThemeContext = createContext(undefined);

const ThemeProvider :React.FC <Provider> = ({theme ,children}) => {
    return(
        <ThemeContext.Provider value = {theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider , ThemeContext}