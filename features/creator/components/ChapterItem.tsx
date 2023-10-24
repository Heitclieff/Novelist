import React,{useContext} from 'react'
import { 
Box, 
HStack , 
Text, 
Pressable,
VStack } from 'native-base'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'

interface containerProps {
     data : any
}
const ChapterItem : React.FC <containerProps> = ({data ,doc_id}) => {
     const theme:any = useContext(ThemeWrapper)
     const navigation  = useNavigation();

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

     const date = new Date(data.updateAt.seconds * 1000 + data.updateAt.nanoseconds / 1000000);
     const timeago = getTimeAgo(date);

     
  return (
     <Pressable onPress={() => navigation.navigate('Readcontent',{
          id : data.id,
          doc_id: doc_id,
          title: data.title , 
          content: data.content,
          editable : true,
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
               <HStack space = {1} alignItems={'center'}>
                    <Box w= {4} h = {4} bg = 'gray.200' rounded={'full'} overflow={'hidden'}>
                         <Image
                         id = 'Profile-Image'
                         style={{width : '100%' ,height :'100%' , objectFit : 'cover'}}
                         source={{uri :data.updatedimg}}
                         />
                    </Box>
                    <Text  color={theme.Text.base} fontSize={'xs'}>{timeago}</Text>
               </HStack>
               
          </VStack>
    </HStack>
     )
     }}
     </Pressable>
  )
}

export default ChapterItem;