import React,{useContext , useState} from 'react'
import { Pressable } from 'native-base'
import { VStack , HStack , Icon , Box ,Text } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { Feather } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'
import { Themedark , Themelight } from '../../../../systems/theme'
import { setTheme , saveThemetoStorage  } from '../../../../systems/redux/action'

interface containerProps {}
const DarkmodeButton : React.FC <containerProps> = () => {
     const theme:any = useContext(ThemeContext)
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
           h = {60}
           m = {0.3}
           bg= {isPressed ? 'coolGray.300' : isHovered ? 'coolGray.300' : 'coolGray.200'}
           rounded={'full'}>
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
                            <Icon
                                as={Feather}
                                name= {'moon'}
                                size={'md'}
                                color = {theme.Text.between}
                                />
                    </Box>
                    <Box w = '85%' pl = {2}>
                         <Text color = {theme.Text.between} fontSize={'md'} fontWeight={theme.themeMode == 'dark' ? 'semibold': 'normal'} >Dark Mode</Text>
                    </Box>
                    
                </HStack>
          </VStack>
         )}}
     </Pressable>
  )
}

export default DarkmodeButton;