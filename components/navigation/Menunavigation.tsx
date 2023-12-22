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

import FeatherIcon from 'react-native-vector-icons/Feather'
import IoniconsIcon from 'react-native-vector-icons/Ionicons'

import { useContext } from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'

//Redux Tools
import { setTheme , saveThemetoStorage } from '../../systems/redux/action'
import { Themedark , Themelight } from '../../systems/theme/theme'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../systems/redux/reducer'
import { AnyAction } from 'redux'

interface MenubarProps {
 }

const Menunavigation :React.FC <MenubarProps> = () => {
  const theme:any = useContext(ThemeWrapper);
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
          <IoniconsIcon
            name= {theme.themeMode === 'dark' ? 'moon' : 'sunny'}
            color={theme.Icon.base}
            fontSize = {16}
          />
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

export default Menunavigation;