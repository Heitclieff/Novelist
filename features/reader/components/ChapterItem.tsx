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
    title : string
}
const ChapterItem : React.FC <Fieldprops> = ({p_id ,id, title, date}) => {
    // console.log('chapterIterm p_id',p_id)
    // console.log('chapterIterm id',id)
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Readcontent',{p_id,title})}>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return(
            <HStack w = '100%' space  ={2} pt = {3} pb = {3} bg={isPressed ? theme.Bg.containeraction : isHovered ? theme.Bg.containeractionaction  : theme.Bg.container} rounded= 'full'>
            <Box w = '15%' justifyContent={'center'} alignItems={'center'}>
                <Text color = {theme.Text.base} fontSize={'xl'} fontWeight={'semibold'}>{id}</Text>       
            </Box>
        
            <VStack>
                <Text fontWeight={'medium'} color = {theme.Text.base}>{`${title}`}</Text>
                <Text color = {theme.Text.description}>Last updated {`${date}`}</Text>
            </VStack>      
        </HStack>
    )}
    }
    </Pressable>
  )
 
}


export default ChapterItem;