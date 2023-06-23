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