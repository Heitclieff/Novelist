import React,{useContext , useEffect , useState} from 'react'
import { 
Box , 
HStack, 
Text , 
VStack , 
Pressable,
Badge,
Stack,
Divider,
Flex} from 'native-base'
import { Image } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

interface containerProps {
     data : any
     doc_id : string
     projecttitle : string
}

const CommitItem : React.FC <containerProps>= ({data , doc_id , projecttitle}) => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();

     const [timeago ,settimeago] = useState('');

     console.log("Project Title" , projecttitle)
     const teams = useSelector((state) => state.teams);
     const profile = teams?.teams.find((member) => member.id == data.commit_by)

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

     
     useEffect(() => {
          const date = new Date(data?.commit_date.seconds * 1000 + data?.commit_date.nanoseconds / 1000000);
          const time = getTimeAgo(date);
          settimeago(time);
     },[data])
     
   
  return (
     <Pressable onPress = {() => navigation.navigate('Readcontent',{
          commit_id : data.commit_id,
          id : data.id,
          chap_id : data.chap_id,
          doc_id: doc_id,
          title: data.title,
          noveltitle : projecttitle, 
          editable : false,
          commitable : true,
     })}
     >
     {({ 
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
               <Stack pl = {1.5} bg=  "amber.500" rounded = 'sm' >
                    <VStack p ={3}  bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : 'rgba(23, 22, 19 , 1)'} space = {1} alignItems = 'flex-start'  justifyContent={'center'}>
                         <VStack >
                              <Badge  colorScheme="amber" variant={'outline'} rounded={'full'}>{"EP." +  data.chap_id}</Badge>
                         </VStack>
                         <Box>
                              <Text color = {theme.Text.base} numberOfLines={1} fontWeight={'semibold'}>{data.title}</Text>
                         </Box>
                         <HStack space = {2} mt = {1}>
                              <Box w = {5} h=  {5} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
                                   <Image
                                   id = 'Profile-image'
                                   style ={{width : '100%' , height : '100%'}}
                                   source={{uri :profile?.pf_image}}
                                   />
                              </Box>
                              <HStack space = {1}>
                                   <Text fontSize={'xs'} color = {theme.Text.description} fontWeight={'medium'}>{`${profile?.username}`}</Text> 
                                   <Text fontSize={'xs'} color = {theme.Text.description}>{timeago}</Text> 
                              </HStack>
                         
                         </HStack>
                    </VStack>
                    <Divider bg=  {theme.Divider.base}/>
               </Stack>
          )
     }}
     </Pressable>
  )
}

export default CommitItem