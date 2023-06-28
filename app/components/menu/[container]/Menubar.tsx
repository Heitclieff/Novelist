import React,{FC , useState ,useEffect} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Switch,
Button,
Icon,
} from 'native-base'
import { Feather ,Ionicons } from '@expo/vector-icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

import { setTheme , saveThemetoStorage  } from '../../../../systems/redux/action'
import { Themedark , Themelight } from '../../../../systems/theme'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../systems/redux/reducer'
import { AnyAction } from 'redux'

interface MenubarProps {
 }

const Menubar :React.FC <MenubarProps> = () => {
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
    <HStack
    safeAreaTop = {12}
    justifyContent={'flex-end'}
    pr = {3}
    >   
    <HStack alignItems={'center'} space=  {1}>
        <Box>
          <Icon
            as={Ionicons}
            name= {theme.themeMode === 'dark' ? 'moon' : 'sunny'}
            color={theme.Icon.base}
            size={'sm'}
          ></Icon>
        </Box>
        <Switch
        isChecked = {darkmode}
        value = {darkmode}
        onToggle={toggleSwitch}
        size={'sm'}
        />
    </HStack>
       
    </HStack>
  )
}


export default Menubar;