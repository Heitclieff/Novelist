import React, {useEffect} from 'react'
import notifee from '@notifee/react-native';
import { AppState } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../systems/redux/action';

interface Hookprops {
  userdata : any
}

interface Taskprops {
  title : string
  type : string
  image : string
  project : string
  date : any,
  user_id? : string
}

const messagingHooks : React.FC <Hookprops> = (userdata : any) => {
  const db = firestore();
  const dispatch : any = useDispatch();

  const onDisplayNotification = async (notification:any) => {
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
     id: 'default',
     name: 'Default Channel',
   });

    await notifee.displayNotification({
      title: 'Nobelist',
      body: notification.title,
      android: {
        channelId,
        largeIcon: notification.image,
        smallIcon: 'ic_small_icon', // optional, defaults to 'ic_launcher'.
        color: '#000000',
        pressAction: {
          id: 'default',
        },
      },

      ios: {
        attachments: [
          {
            url: 'local-image.png',
            thumbnailHidden: true,
          },
          {
            url: 'notification.image',
          },
        ],
      },
    });
 }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage : any)=> {
      console.log('A new FCM message arrived!');
  
      if(AppState.currentState === "active"){
        onDisplayNotification({
          title : remoteMessage.data?.title,
          image : remoteMessage.data?.icon
        });

        if(!userdata?.length > 0) {
          console.log("messaging : Not found any users to send notification.")
          return

        }

        const useritem : any = userdata[0];
        const id_list = [remoteMessage.data?.target];

        const getuser = db.collection('Users').doc(remoteMessage.data?.target);
        const getNotification = getuser.collection('Notification');
        const timestamp = firestore.FieldValue.serverTimestamp();
        
        await getuser.update({notify : firestore.FieldValue.increment(1)})
        const Notify_task : Taskprops  = {
          title : remoteMessage.data?.title,
          date:  timestamp,
          type : remoteMessage.data?.type,
          image : remoteMessage.data?.icon,
          project : remoteMessage.data?.project
        }
        
        if(remoteMessage.data?.type === 'follow'){
          Notify_task['user_id'] = remoteMessage.data?.id;
        }

        const Notification_insert : any = await getNotification.add(Notify_task);

        dispatch(setUser([{notify : useritem.notify += 1  ,...useritem}]))
        console.log("Success To add notification" ,Notification_insert.id);   
      }
    });
  
    return unsubscribe;
  }, [userdata]);

  return null
}

const setupMessageToken = async (uid:string) => {
  try{
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
  
    await firestore().collection('Users').doc(uid).update({message_token : token});
  }catch(error){
    console.log('failed to get Token from device' , error)
  }    
}


export {messagingHooks , setupMessageToken};