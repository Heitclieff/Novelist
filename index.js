/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry, LogBox} from 'react-native';
import App from './utils/App';
import{enableScreens} from 'react-native-screens'
import {name as appName} from './app.json'
import messaging from '@react-native-firebase/messaging';
import 'react-native-reanimated'
enableScreens();
LogBox.ignoreLogs(['Reanimated 2']);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  

AppRegistry.registerComponent(appName, () => App);
