import React,{useContext} from 'react'
import { 
HStack, 
Box, 
VStack, 
Text , 
Divider , 
Pressable} from 'native-base'
import { ThemeWrapper } from '../../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface Fieldprops {
    id : number,
    p_id : number | string
}
const ChapterItem : React.FC <Fieldprops> = ({p_id ,id}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Readcontent',{p_id})}>
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
                <Text fontWeight={'medium'} color = {theme.Text.base}>Chapter Name</Text>
                <Text color = {theme.Text.description}>Last updated</Text>
            </VStack>      
        </HStack>
    )}
    }
    </Pressable>
  )
 
}


export default ChapterItem;