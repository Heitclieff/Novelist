/**
 * @format
 */
import { useEffect } from 'react';
import 'react-native-gesture-handler'
import {AppRegistry, LogBox} from 'react-native';
import App from './utils/App';
import{enableScreens} from 'react-native-screens'
import {name as appName} from './app.json'
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import 'react-native-reanimated'


enableScreens();
LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(appName, () => App);

