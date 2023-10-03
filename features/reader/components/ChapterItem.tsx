import React,{useContext} from 'react'
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
    doc_id : string;
    title : string
    noveltitle : string
    content : string;
    timestamp : any;
}
const ChapterItem : React.FC <Fieldprops> = ({episode ,id, doc_id ,title, noveltitle,  timestamp , content}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

    const timezoneOffset = date.getTimezoneOffset();
    const formattedDate = date.toLocaleString();
  
  return (
    <Pressable onPress={() => navigation.navigate('Readcontent',{
      id,
      doc_id,
      title , 
      content,
      noveltitle})}>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return(
            <HStack w = '100%' space  ={2} pt = {3} pb = {3} bg={isPressed ? theme.Bg.containeraction : isHovered ? theme.Bg.containeractionaction  : theme.Bg.container} rounded= 'full'>
            <Box w = '15%' justifyContent={'center'} alignItems={'center'}>
                <Text color = {theme.Text.base} fontSize={'xl'} fontWeight={'semibold'}>{episode}</Text>       
            </Box>
        
            <VStack>
                <Text fontWeight={'medium'} color = {theme.Text.base}>{`${title}`}</Text>
                <Text color = {theme.Text.description}>Last updated {`${formattedDate}`}</Text>
            </VStack>      
        </HStack>
    )}
    }
    </Pressable>
  )
 
}


export default ChapterItem;