import React,{useContext , useState , useEffect} from 'react'
import { 
HStack, 
Box, 
VStack, 
Text , 
Divider , 
Pressable} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface Fieldprops {
    id : number,
    data : any
    doc_id : string;
    title : string
    episode : string
    noveltitle : string
}
const ChapterItem : React.FC <Fieldprops> = ({episode ,id, doc_id, data ,title, noveltitle}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
    const [timeago ,settimeago] = useState('');

    const date = new Date(data.updateAt.seconds * 1000 + data.updateAt.nanoseconds / 1000000);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours(); 
    const minutes = date.getMinutes(); 
    const seconds = date.getSeconds(); 

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${displayMinutes} ${ampm}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;


  return (
    <Pressable onPress={() => navigation.navigate('Readcontent',{
      id : id,
      doc_id : doc_id,
      chap_id : data.chap_id,
      title , 
      data : data,
      noveltitle,
      editable:false,
      })}>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return(
          <VStack pl = {2} space = {2} pr = {3}>
            <HStack w = '100%' space  ={2} pt = {2} pb = {1} bg={isPressed ? 'rgba(255, 191, 0, 0.4)' : isHovered ? theme.Bg.containeraction : 'transparent'}>
                <VStack >
                    <Text fontWeight={'semibold'} color = {isPressed ? theme.Text.heading : theme.Text.base}>{`Ep ${episode} ${title}`}</Text>
                    <Text color = {isPressed ? theme.Text.heading : theme.Text.description} fontSize={'xs'}>{`${formattedDateTime}`}</Text>
                </VStack>
            
            </HStack>
            <Divider bg = {theme.Divider.comment}/>
          </VStack>
    )}
    }
    </Pressable>
  )
 
}


export default ChapterItem;