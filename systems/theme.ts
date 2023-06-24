import { ColorMode, extendTheme } from "native-base";
import { useColorMode } from "native-base";


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



export const Themecolor = ({
    tabbar : {
      light : '#f9fafb',
      dark : '#1f2937',
      border : {
        light: 'white',
        dark : '#475569',
      }
    },

    bg : {
        light : 'coolGray.100',
        dark : 'coolGray.800'
    },
    boxbg : {
      light : "coolGray.100",
      dark : 'coolGray.700'
    },
    bgPress : {
        light : 'coolGray.200',
        dark : 'coolGray.700',
    },
    infotext : {
        light : 'coolGray.700',
        dark : 'coolGray.300'
    },
    collection : {
      viewtext : {
        dark : 'coolGray.400',
        light : 'coolGray.500'
      },
      Filedtitle : {
        dark : 'gray.200',
        light: 'gray.800',
      }
    },
    icon : {
      library :  {
        light : 'coolGray.600',
        dark : 'coolGray.300',
      },
      global : {
        light : 'coolGray.600',
        dark : 'coolGray.300',
      },
      Addicon : {
        light : "coolGray.700",
        dark : 'lightText',
      }
    },
    
})


export const Themedark = ({
  themeMode : 'dark',
  Bg : {
    tabbar : '#1f2937',
    base : 'coolGray.800',
    container : 'coolGray.700',
    action : 'coolGray.700',
  },
  Text : {
    heading : 'coolGray.200',
    base : 'coolGray.300',
    tabbar : 'white',
    description : 'coolGray.400'
  },
  Icon : {
    base : 'coolGray.300',
    heading : 'lightText'
  },
  Divider : {
    base : 'coolGray.700',
    tabbar : '#475569',
    stackbar : '#18181b',
  },
  Button: {
    base : 'coolGray.700',
  },
})

export const Themelight = ({
  themeMode : 'light',
  Bg : {
    tabbar : 'white',
    base : 'coolGray.100',
    container : 'coolGray.200',
    action : 'coolGray.200',
  },
  Text : {
    heading : 'coolGray.800',
    tabbar : 'black',
    base : 'coolGray.700',
    description : 'coolGray.500'
  },
  Icon : {
    base : 'coolGray.600',
    heading : 'coolGray.800'
  },
  Divider : {
    base : 'coolGray.300',
    tabbar : '#e4e4e7',
    stackbar : '#d4d4d8',
  },
  Button: {
    base : 'coolGray.200',
  },
})