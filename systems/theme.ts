import { ColorMode, extendTheme } from "native-base";
import { useColorMode } from "native-base";

export const config = {
  dependencies: {
    // For Expo projects (Bare or managed workflow)
    "linear-gradient": require("expo-linear-gradient").LinearGradient,
    // For non expo projects
    // 'linear-gradient': require('react-native-linear-gradient').default,
  },
};



const theme = extendTheme({
    components: {
      Heading: {
        // Can pass also function, giving you access theming tools
        baseStyle: ({colorMode}:any) => {
          return {
            color: colorMode === 'dark' ? 'gray.200' : 'gray.800',
            fontWeight: 'bold',
          };
        },
      },
      Text : {
        baseStyle : ({colorMode}:any) => {
            return{
                color: colorMode === 'dark' ? 'gray.200' : 'black',
                fontWeight: 'normal',
            }
                
        }
      },
      
    },
});

export default theme;


export const Themedark = ({
  themeMode : 'dark',
  Bg : {
    tabbar : '#171717',
    header : '#171717',
    base : 'trueGray.900',
    container : 'trueGray.800',
    comment : '#262626',
    action : 'trueGray.700',
    containeraction : 'trueGray.700',
  },
  Text : {
    placeholder : '#a3a3a3',
    between : 'coolGray.800',
    action : 'coolGray.700',
    heading : 'coolGray.200',
    base : 'coolGray.300',
    skelton : 'coolGray.600',
    tab : {
      active : '#0891b2',
      inactive :'#d1d5db'
    },
    tabbar : 'white',
    bottomtab : {
      focused : '#0891b2' ,
      base : '#d1d5db',
    },
    description : 'coolGray.400'
  },
  Icon : {
    base : 'coolGray.300',
    bottomtab : {
      focused : '#0891b2' ,
      base : '#d1d5db',
    },
    heading : 'lightText',
    back : 'coolGray.300',
  },
  Indicator : {
    base : '#e5e7eb'
  },
  Divider : {
    base : 'trueGray.800',
    comment : '#404040',
    tabbar : '#262626',
    stackbar : '#18181b',
  },
  Button: {
    backbutton : 'white',
    heading : 'coolGray.300',
    base : 'coolGray.700',
    outline : 'coolGray.500',
    follow : { 
      base :'coolGray.200',
      focused : 'coolGray.300',
    },
  },
})

export const Themelight = ({
  themeMode : 'light',
  Bg : {
    tabbar : 'white',
    base : 'coolGray.100',
    header : '#f3f4f6',
    comment : '#f5f5f5',
    container : 'coolGray.200',
    action : 'coolGray.200',
    containeraction : 'coolGray.300',
  },
  Text : {
    placeholder : '#a3a3a3',
    between : 'coolGray.700',
    action : 'coolGray.400',
    heading : 'coolGray.800',
    skelton : 'coolGray.300',
    tab : {
      active :'#0891b2',
      inactive : '#374151'
    },
    tabbar : 'black',
    bottomtab : {
      focused : '#0891b2' ,
      base : '#4b5563',
    },
    base : 'coolGray.700',
    description : 'coolGray.500'
  },
  Icon : {
    base : 'coolGray.600',
    bottomtab : {
      focused : '#0891b2' ,
      base : '#4b5563',
    },
    heading : 'coolGray.800',
    back : 'black',
  },
  Indicator : {
    base : '#1f2937'
  },
  Divider : {
    base : 'trueGray.200',
    tabbar : '#e4e4e7',
    stackbar : '#e4e4e7',
  },
  Button: {
    backbutton : '#0d9488',
    heading : 'coolGray.800',
    base : 'coolGray.200',
    comment : 'coolGray.200',
    outline : 'coolGray.400',
    follow : { 
      base :'coolGray.800',
      focused : 'coolGray.700',
    },
  },
})