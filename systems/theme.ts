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
  Divider : {
    base : 'coolGray.700',
    tabbar : '#475569',
    stackbar : '#18181b',
  },
  Button: {
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
    container : 'coolGray.200',
    action : 'coolGray.200',
  },
  Text : {
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
  Divider : {
    base : 'coolGray.300',
    tabbar : '#e4e4e7',
    stackbar : '#d4d4d8',
  },
  Button: {
    base : 'coolGray.200',
    outline : 'coolGray.400',
    follow : { 
      base :'coolGray.800',
      focused : 'coolGray.700',
    },
  },
})