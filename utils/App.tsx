import React, {useEffect}from 'react'
import Mainprovider from '../systems/wrapper/Mainprovider'
import SplashScreen from 'react-native-splash-screen'



export default function App(){
  useEffect(() => {
    console.log("Render Splash Screen.")
    setTimeout(() => {
      SplashScreen.hide();
    }, 0)
  }, [])
  
  return <Mainprovider/>

}
