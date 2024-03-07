import React,{useContext , useEffect, useState} from 'react'
import { 
Box, 
HStack , 
Text, 
Pressable,
VStack,
Divider,
Spinner,
Badge,
} from 'native-base'
import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { SwipeListView } from 'react-native-swipe-list-view'
import Deletebutton from '../../../components/button/Deletebutton'
// @Firestore
import database from '@react-native-firebase/database';

interface containerProps {
     data : any
     doc_id : string
     chapterTitle :string
     isDisable : boolean
     action : any
}
const ChapterItem : React.FC <containerProps> = ({data ,doc_id , isDisable ,action , chapterTitle}) => {
     const theme:any = useContext(ThemeWrapper)
     const navigation  = useNavigation();
     const [timeago ,settimeago] = useState('');
     const [during ,setDuring] = useState<{}>(false);
   
     const onRowDidOpen = rowKey => {
          console.log('This row opened', rowKey);
     };

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


     const renderItem = () => {
          return(
               <Pressable isDisabled = {data?.commits || during?.during} onPress={() => navigation.navigate('Readcontent',{
                    id : data.id,
                    chap_id : data.chap_id,
                    doc_id: doc_id,
                    title: data.title , 
                    content: data.content,
                    noveltitle : chapterTitle,
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
                    <HStack  w = '100%' pt = {2} space  ={2} bg = {theme.Bg.base}>
                         <VStack w = '100%'  pl = {1}  justifyContent={'center'} bg = {data.commits ? 'amber.400' : null} rounded =  'md'> 
                              <HStack  pl = {2} pr=  {1} pb = {2}  justifyContent = 'space-between' alignItems = 'center' bg={isPressed ? theme.Bg.containeraction : isHovered ? theme.Bg.containeraction : theme.Bg.base}>
                              <VStack space = {2} opacity = {during?.during || data.commits ? 0.5 : 1} >
                                   <HStack space = {1}>
                                        <Badge
                                             colorScheme={data.status ?  'amber' : 'teal'}
                                             rounded = 'full'
                                             variant={'outline'}
                                             >
                                             {"EP." + data.chap_id}
                                        </Badge>
                                        <Text color={theme.Text.base} fontWeight={'semibold'}>{data.title}</Text>
                                   </HStack>
                                   <HStack space = {1} alignItems={'center'} pl = {1}>
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
                                   </VStack>
                                   {during?.during ?
                                    <HStack  w = "90px"  space = {0.5} justifyContent = 'center' alignItems={'center'} borderWidth = {1} borderColor = {'tertiary.500'} rounded={'full'}>
                                        <Spinner color = 'tertiary.500' accessibilityLabel="Loading posts" size=  {12} />
                                        <Text  color= 'tertiary.500' fontSize={'xs'}>In Progress</Text>
                                    </HStack>
          
                                    :
                                    data?.commits &&
                                        <HStack  w = "100px" space = {0.5} justifyContent = 'center' alignItems={'center'} borderWidth = {1} borderColor = {'amber.500'} rounded={'full'}>
                                              <Spinner color = 'amber.500' accessibilityLabel="Loading posts" size=  {12} />
                                             <Text  color= 'amber.500' fontSize={'xs'}>on Publishing</Text>
                                        </HStack>
                                   }    
                              </HStack>
                              <Divider bg = {theme.Divider.base}/>
                         </VStack>
                    </HStack>
               )
               }}
               </Pressable>
          )
     }
     
     
     console.log(isDisable)
  return (
     <SwipeListView
       disableLeftSwipe = {isDisable || during?.during}
       data={[0]}
       ItemSeparatorComponent={<Box h='2' />}
       previewRowKey={data.id}
       previewOpenValue={-40}
       previewOpenDelay={3000} 
       renderItem={renderItem}
       renderHiddenItem={() => (<Deletebutton id = {data.id} title = {data.title} action = {action}/>)}
       onRowDidOpen={() => onRowDidOpen(data.id)}
       rightOpenValue={-60}
     />
  )
}

export default ChapterItem;