import React, {useEffect} from 'react'
import { ThemeProvider } from './ThemeProvider'
import Router from '../Router'

import { useDispatch ,useSelector } from 'react-redux'
import { RootState } from '../redux/reducer'
import { AnyAction } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { loadThemefromStorage } from '../redux/action'
import { Box } from 'native-base'

interface ThemeContext { }

const ThemeContext : React.FC <ThemeContext> = () => {
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const theme = useSelector((state:RootState) => state.theme)
    const isReduxLoaded = useSelector((state:RootState) => state.isthemeLoaded);
  
    useEffect(() => {
        if(!isReduxLoaded) dispatch(loadThemefromStorage());
    } , [dispatch ,theme])

  return (
   <ThemeProvider theme = {theme}>
        {isReduxLoaded &&  <Router />}
   </ThemeProvider>
  )
}

export default ThemeContext 

