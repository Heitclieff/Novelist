import React,{useContext , useState} from 'react'
import {
VStack ,
HStack , 
Icon , 
Box ,
Text , 
Pressable  } from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import FeatherIcon from 'react-native-vector-icons/Feather'

//@Redux Toolkits
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../systems/redux/reducer'
import { Themedark , Themelight } from '../../../systems/theme/theme'
import { setTheme , saveThemetoStorage } from '../../../systems/redux/action'

interface containerProps {}
const DarkmodeButton : React.FC <containerProps> = () => {
     const theme:any = useContext(ThemeWrapper)
     const [darkmode , setdarkmode]  = useState(theme.themeMode === 'dark');
     const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();

     const toggleSwitch = async () => { 
          const selectedTheme = darkmode ? Themelight : Themedark;
          dispatch(setTheme(selectedTheme))
          dispatch(saveThemetoStorage(selectedTheme))
          setdarkmode(!darkmode);
      }

  return (
     <Pressable onPress={toggleSwitch}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
         return (
          <VStack
           w = '100%'
           h = {50}
           m = {0.3}
           rounded = 'md'
           bg= {isPressed ? 'coolGray.300' : isHovered ? 'coolGray.300' : theme.themeMode === 'dark' ? 'coolGray.300' : theme.Bg.base}
           >
               <HStack 
                w= '100%'
                h = '100%'
                pl = {5}
                justifyContent={'center'}
                alignItems={'center'}
                >
                     <Box 
                        w = {'15%'} 
                        h = '100%'
                        justifyContent={'center'}
                        alignItems={'center'}
                        >         
                            <FeatherIcon
                                name= {'moon'}
                                size={20}
                                color = "#171717"
                                />
                    </Box>
                    <Box w = '85%' pl = {2}>
                         <Text color = {"coolGray.800"} fontSize={'md'} fontWeight={theme.themeMode == 'dark' ? 'semibold': 'normal'} >Dark Mode</Text>
                    </Box>
                    
                </HStack>
          </VStack>
         )}}
     </Pressable>
  )
}

export default DarkmodeButton;