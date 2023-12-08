import React,{useContext , useEffect , useState} from 'react'
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
import { useNavigation } from '@react-navigation/native';
import { setProjectContent, setUser } from '../../systems/redux/action';
import { InviteModal } from './components/modal/invite';


// @Redux tookits
import { useSelector, useDispatch } from 'react-redux';


// @Firestore
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { SpinnerItem } from '../../components/Spinner';

const MemorizedNotifyItem = React.memo(NotifyItem);

const Notification : React.FC = () => {
    const theme:any = useContext(ThemeWrapper)
    const SERVER_KEY = "AAAAiAY70h0:APA91bFE3hrzZ9Ev5yQCewRFQXz5nMAcvw1wG3KCm0NQZAlUTbxXxyj7pbtgvvuzB_ixHGGy7zyAyiQXkxa8lP8inUjKVDQU3M5EBZYsoytaEthtQcJM24JC8V5eOv7z1bupsRuWWudk";
    const [notificationlist , setNotificationList] = useState<string>('');
    const target_token = 'ekhM3loTT7qjTBkfEKGsGQ:APA91bGYU09C3u1bxWTUyk7HW8qC1kiLiFHpG_jv2jgW1VPZVhnM-ei7ztNfqacLbwdZMHzjA81FUEbrBLEHD1EaooXTZIqNi1yIQt0RbhrpobOlbjwZTJziPkEPmTO26XsXeSh0N_Hr'
    const useraccount = useSelector((state) => state.userData);
    const projectdocs = useSelector((state) => state.project);
    const dispatch = useDispatch();
    const useritem = useraccount[0];
    const firebase = firestore();
    const navigation = useNavigation();

    const [inviteShow ,setInviteShow] = useState<any>({status : false , data : {}});
    const [refreshing ,setRefreshing] = useState<boolean>(false);
    const [isLoading , setLoading] = useState<boolean>(true);

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

    const checkNotification = async (): Promise<void> => {
      if(useritem.notify <= 0){
        return
      }

      if(!useraccount?.length > 0){
        console.log("Not found any User data")
        return
      }

      try{
        const getusers = firestore().collection('Users').doc(useritem.id);
        
        await getusers.update({notify : 0})        
        dispatch(setUser([{notify : 0  ,...useritem}]))
        console.log("Reset Notification success")
      }catch(error){
        console.log("failed to Check Notification" ,error)
      }
    }

    const removeNotification = async (id:string) => {
      try{

        if(!id){
          console.log("Failed : Not found Notification id.");
          return
        }
  
        const getuser = firebase.collection('Users').doc(useritem.id);
        const getnotification = getuser.collection('Notification').doc(id);
  
        const docRef = await getnotification.delete();
        setNotificationList((prev) => prev.filter(item => item.id !== id));
        console.log("remove success")
      }catch(error){
        console.log("failed to delete notification" ,error)
      }   
    };
  
    const getNotification = async () : Promise<void> => {
      if(!useraccount){
        return
      }
      try{
        const getuser = firebase.collection('Users').doc(useritem.id);
        const getnotification = await getuser.collection('Notification').orderBy('date','desc').get();
        const notificationdocs = getnotification.docs.map((doc) =>({id : doc.id , ...doc.data()}));

        setNotificationList(notificationdocs);
        setLoading(false);
      }catch(error){
        console.log("Failed to get notification task" , error)
      }
    }


    const Acceptinvitation = async (data:any) => {
      setInviteShow({status : false});
      if(!data){
        console.log("Not found any data with argument");
        return
      }

      try{  
        if(!useritem.project.includes(data.project)){
          const getuser = firebase.collection('Users').doc(useritem.id);
          const getproject = firebase.collection("Novels").doc(data.project);
          const getcreator = getproject.collection('Creator').where('userDoc' ,'==', useritem.id)

          const snapshot = await getcreator.get();
  
          if(snapshot.empty){
            console.log('Not found any invitation from project');
            return
          }
         
          const creatordoc = snapshot.docs[0];
          const creatordata = creatordoc.data();
        
          const updatedProject = [...useritem.project]
          updatedProject.push(data.project);
  
          await creatordoc.ref.set({...creatordata , pending : false});
          await getuser.update({project : updatedProject})       
          dispatch(setUser([{...useritem , project : updatedProject }]))
        }

        navigation.navigate('CreatorContent',{id : data.project})
        console.log("Add Project success.")
      }catch(error){
        console.log("Failed to joining project with id" ,error)
      }
    }

    useEffect(() => {
      getNotification();
    },[refreshing])

    useEffect(() =>{ 
      checkNotification();
    } , [])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
       <HStack mt = {5} justifyContent={'space-between'} pl = {5} pr = {5}>
            <Text color = {theme.Text.base}>Recently</Text>
            {useritem && 
              useritem.notify > 0 &&
                <VStack minW = {5} minH = {5} p = {0.6} alignItems={'center'}  justifyItems={'center'} rounded = "full"  bg=  'red.500'>
                  <Text color = {'gray.100'} fontSize={'xs'} fontWeight={'medium'} rounded = "full" >{useritem?.notify}</Text>
               </VStack>
            }
       </HStack>
      <HStack space = {2} justifyContent={'center'}>
      </HStack>
      
          <FlatList refreshing = {refreshing} setRefreshing={setRefreshing}>
            {isLoading ?
              <SpinnerItem/>
              :
              <VStack p = {4} flex = {1}>
              {notificationlist.length > 0 &&    
              
                    <SwipeListView 
                    disableRightSwipe
                    data={notificationlist}
                    // ItemSeparatorComponent={<Box  h=  '2'/>}
                    renderItem={(item:any , index:number) => (
                      <MemorizedNotifyItem
                        key = {item.item.id}
                        data = {item.item}
                        setInviteShow = {setInviteShow}
                      />
                    )}
                    renderHiddenItem={ (data, rowMap) => (<Deletebutton key={data.item.id} action = {removeNotification} id = {data.item.id}/>)}
                    leftOpenValue={60}
                    rightOpenValue={-60}
                  />
                  }
              </VStack>
          }
           
          </FlatList>
       <InviteModal inviteShow ={inviteShow} setInviteShow = {setInviteShow} Accept = {Acceptinvitation}/>
    </Box>
  )
}

export default Notification;