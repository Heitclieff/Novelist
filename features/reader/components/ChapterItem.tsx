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
    p_id : number | string
    data : any
    doc_id : string;
    title : string
    episode : string
    noveltitle : string
    content : string;
    timestamp : any;
}
const ChapterItem : React.FC <Fieldprops> = ({episode ,id, doc_id, data ,title, noveltitle,  timestamp , content}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
    const [timeago ,settimeago] = useState('');

    const date = new Date(data.updateAt.seconds * 1000 + data.updateAt.nanoseconds / 1000000);

      const day = date.getDate(); // วันที่ (1-31)
      const month = date.getMonth() + 1; // เดือน (0-11) เพิ่ม 1 เพื่อแปลงเป็นเดือนจริง (1-12)
      const year = date.getFullYear(); // ปี (ค.ศ.)
      const hours = date.getHours(); // ชั่วโมง (0-23)
      const minutes = date.getMinutes(); // นาที (0-59)
      const seconds = date.getSeconds(); // วินาที (0-59)

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
            <HStack w = '100%' space  ={2} pt = {2} pb = {1}  bg={isPressed ? theme.Bg.containeraction : isHovered ? theme.Bg.containeraction  : 'transparent'}>
                <VStack >
                    <Text fontWeight={'semibold'} color = {theme.Text.base}>{`Ep ${episode} ${title}`}</Text>
                    <Text color = {theme.Text.description} fontSize={'xs'}>{`${formattedDateTime}`}</Text>
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