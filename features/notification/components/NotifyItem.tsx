import React, {useContext , useState , useEffect} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Box, 
HStack,
Text, 
VStack , 
Icon,  
Pressable,
IconButton } from 'native-base'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { InviteModal } from './modal/invite'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

// @Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface containerProps {
    data : any
    setInviteShow : any
}

const NotifyItem : React.FC <containerProps> = ({data ,setInviteShow }) => {
    const theme:any = useContext(ThemeWrapper)
    const userdata = useSelector((state) => state.userData);
    const navigation = useNavigation();

    const [timeago ,settimeago] = useState('');
    const saperatedNotificationtype = async () => {

        if(!userdata?.length > 0){
          console.log("Not found any user data")
          return
        }

        console.log(data.project)
        if(data.type === 'invite'){
          if(!userdata[0].project?.includes(data.project)){
            setInviteShow({
              status : true,
              data : data
            });
            return
          } 
          navigation.navigate('CreatorContent',{id : data.project})
        } 
        
        if(data.type === 'notify'){
          navigation.navigate('CreatorContent',{id : data.project})
        }

        if(data.type === 'follow'){
          try{
            const getusers =  await firestore().collection("Users").doc(data.id).get()
            const usersdoc = getusers.data();

            if(usersdoc){
              usersdoc['id'] = data.id;
              navigation.navigate('ProfileStack', {profile : usersdoc})
            }
          }catch(error){
            console.log("ERROR: Faied to connect useraccount to profile",error)
          }
        
          
        }
    }

    const getTimeAgo = (timestamp:any) => {
         const currentDate = new Date();
         const timestampDate = new Date(timestamp);
         const timeDifference = currentDate - timestampDate;
         const secondsDifference = Math.floor(timeDifference / 1000);

         if (secondsDifference < 60) {
              return `${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
            } else if (secondsDifference < 3600) {
              const minutesDifference = Math.floor(secondsDifference / 60);
              return `${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
            } else if (secondsDifference < 86400) {
              const hoursDifference = Math.floor(secondsDifference / 3600);
              return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
            } else {
              const daysDifference = Math.floor(secondsDifference / 86400);
              return `${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
         }
    }

    useEffect(() => {
         const date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);
         const time = getTimeAgo(date);
         settimeago(time);
    },[data])
    
  return (
    <Pressable onPress ={saperatedNotificationtype}>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return (
          <HStack w='100%' h={70} mt={2} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.container} rounded={'full'} justifyContent={'center'}>
            <Box w='20%' h='100%' justifyContent={'center'} alignItems={'center'}>
              <Box w='50' h='50' overflow={'hidden'} rounded="full">
                <FastImage
                  style={{width : '100%', height : '100%' }}
                  source={{
                    uri : data.image  , 
                    priority : FastImage.priority.normal,
                    cache: FastImage.cacheControl.cacheOnly
                  }}
                  alt = "images"
                  resizeMode={FastImage.resizeMode.cover}
                />
              </Box>
            </Box>
            <VStack w='80%' justifyContent={'center'}>
              <HStack w='100%' space={1}>
                <Text color={theme.Text.base} >{data.title}</Text>
              </HStack>
              <Text color={theme.Text.description} fontSize={'xs'}>{timeago}</Text>
            </VStack>
          </HStack>
        )
      }}
  
    </Pressable>
  )
}

export default NotifyItem;