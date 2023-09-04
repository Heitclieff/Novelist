import React,{useContext} from 'react'
import { ThemeWrapper } from '../theme/Themeprovider'
import { useNavigation } from '@react-navigation/native';
import { Box } from 'native-base';
import Stacknavigator from './navigator/Stacknavigator';
interface Routerprops {}

const Router : React.FC <Routerprops> = () =>  {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
  return (
    <Stacknavigator theme = {theme}/>
  )
}

export default Router;