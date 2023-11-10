import React,{useContext , useEffect} from 'react'
import { 
Box, 
Divider, 
HStack ,
Button,
Text, 
VStack } from 'native-base';; 
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import NotifyItem from './components/NotifyItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import Deletebutton from '../../components/button/Deletebutton';
import { PermissionsAndroid , Platform, Alert } from 'react-native';

// @Firestore
import messaging from '@react-native-firebase/messaging';

const Notification : React.FC = () => {
    const theme:any = useContext(ThemeWrapper)

    const requestUserPermission = async () => {
      try{
        const authStatus = await messaging().requestPermission();
        let enabled = '' ;
  
        if(Platform.OS == 'ios'){
          enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        }else{
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
        }
        
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      }catch(error){
        console.log("failed to request user permission" , error);
      }
    }


    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe;
    }, []);

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
       <HStack mt = {5}>
            <Text pl = {5} color = {theme.Text.base}>Recently</Text>
            
       </HStack>
       <Button onPress ={requestUserPermission}>Test</Button>
          <FlatList>
            <VStack p = {4} flex = {1}>
                <SwipeListView 
                disableRightSwipe
                data={[0,1]}
                ItemSeparatorComponent={<Box h=  '2'/>}
                renderItem={(item:any , index:number) => (
                  <NotifyItem/>
                )}
                renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                leftOpenValue={60}
                rightOpenValue={-60}
              />
            </VStack>
          </FlatList>
      
       
    </Box>
  )
}

export default Notification;