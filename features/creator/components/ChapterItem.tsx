import React,{useContext , useEffect, useState} from 'react'
import { 
Box, 
HStack , 
Text, 
Pressable,
VStack } from 'native-base'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'

// @Firestore
import database from '@react-native-firebase/database';

interface containerProps {
     data : any
}
const ChapterItem : React.FC <containerProps> = ({data ,doc_id}) => {
     const theme:any = useContext(ThemeWrapper)
     const navigation  = useNavigation();
     const [timeago ,settimeago] = useState('');
     const [during ,setDuring] = useState(false);
   
     const getTimeAgo = (timestamp:any) => {
          const currentDate = new Date();
          const timestampDate = new Date(timestamp);
          const timeDifference = currentDate - timestampDate;
          const secondsDifference = Math.floor(timeDifference / 1000);

          if (secondsDifference < 60) {
               return `Updated ${secondsDifference} second${secondsDifference !== 1 ? 's' : ''} ago`;
             } else if (secondsDifference < 3600) {
               const minutesDifference = Math.floor(secondsDifference / 60);
               return `Updated ${minutesDifference} minute${minutesDifference !== 1 ? 's' : ''} ago`;
             } else if (secondsDifference < 86400) {
               const hoursDifference = Math.floor(secondsDifference / 3600);
               return `Updated ${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
             } else {
               const daysDifference = Math.floor(secondsDifference / 86400);
               return `Updated ${daysDifference} day${daysDifference !== 1 ? 's' : ''} ago`;
          }
     }

     
    const fetchingDuringTask = () => {
          try{
               const reference = database()
               .ref(`/task/${doc_id}/${data.id}`)
        
               const recivedReference = (snapshot:any) => {    
                    if(!snapshot.exists){
                         return false
                    }
                    setDuring(snapshot.val())
               };
               reference.on('value' , recivedReference);

               return () => {
                    reference.off('value' , recivedReference);
               }
          }catch(error){
               console.log("ERROR: Failed to fetching Chat data" ,error)
          }
     }

     useEffect(() => {
          const date = new Date(data.updateAt.seconds * 1000 + data.updateAt.nanoseconds / 1000000);
          const time = getTimeAgo(date);
          settimeago(time);
     },[data])

     
    useEffect(() => {
          const unsubscribe =  fetchingDuringTask();

          if(!unsubscribe){
               console.log("ERROR : Not founds any Project id in Comment list");
               return
          }
          return () => {
          unsubscribe();
          }
     }, [])
     
     
  return (
     <Pressable isDisabled = {data?.commits || during?.during} onPress={() => navigation.navigate('Readcontent',{
          id : data.id,
          chap_id : data.chap_id,
          doc_id: doc_id,
          title: data.title , 
          content: data.content,
          editable : true,
          createdBy : data.createdBy,
          data : data,
          status : data.status,
          commitable : data.commits,
          })}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
    <HStack w=  '100%' p = {3} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.container} rounded={'full'}>
          <Box w = '20%'  justifyContent={'center'} alignItems={'center'}>
               <Text color={theme.Text.base} fontWeight={'semibold'} fontSize={'xl'}>{data.chap_id}</Text>
          </Box>
          <VStack w = '80%'  justifyContent={'center'} space = {1}> 
               <Text color={theme.Text.base} fontWeight={'semibold'}>{data.title}</Text>

               {during?.during ? 
                    <Text  color={theme.Text.description} fontSize={'xs'}>Someone has Edit this Chapter right now.</Text>
               :
                    data?.commits ?
                         <Text  color={theme.Text.description} fontSize={'xs'}>Wating for leader to Aprroved</Text>
                    :
                    <HStack space = {1} alignItems={'center'}>
                    <Box w= {4} h = {4} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
                         <FastImage
                         id = 'Profile-Image'
                         style={{width : '100%' ,height :'100%'}}
                         resizeMode={FastImage.resizeMode.cover}
                         source={{
                              uri : data.updatedimg  , 
                              priority : FastImage.priority.normal
                            }}
                         />
                    </Box>
                         <Text  color={theme.Text.base} fontSize={'xs'}>{timeago}</Text>
                    </HStack>
               }
          </VStack>
    </HStack>
     )
     }}
     </Pressable>
  )
}

export default ChapterItem;