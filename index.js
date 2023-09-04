/**
 * @format
 */
import 'react-native-gesture-handler'
import {AppRegistry, LogBox} from 'react-native';
import App from './utils/App';
import{enableScreens} from 'react-native-screens'
import {name as appName} from './app.json'

import 'react-native-reanimated'
enableScreens();
LogBox.ignoreLogs(['Reanimated 2']);

AppRegistry.registerComponent(appName, () => App);
