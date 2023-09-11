import React,{useContext} from 'react'
import { 
Box,
HStack ,
Text, 
Pressable,
VStack} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

interface containerProps{
    data  :any,
    id : number | string
}
const Bookmarkfield : React.FC <containerProps> = ({data ,id}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate('Novelmain' ,{id})}>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return(
            <HStack w = '90%' h = {110} bg={isPressed ? theme.Bg.containeraction : isHovered ? theme.Bg.containeractionaction  : theme.Bg.container} rounded={'md'} overflow = 'hidden'>
            <Box w = '23%' h = '100%' bg = 'gray.200' overflow={'hidden'}>
                <Image style={{width : '100%' , height : '100%'}} source={{uri :data.images}}/>
    
            </Box>
            <VStack w = '77%' h = '100%' pl = {2} justifyContent={'center'}>
                <Text color = {theme.Text.base} numberOfLines={2} fontWeight={'semibold'}>{data.title}</Text>
                <HStack>
                    {data.creater && data.creater.map((items :any, key:number) => (
                        <Text key={key} color = {theme.Text.description} fontSize={'xs'}>{items.username}</Text>
                    ))}
                </HStack>
                <Text color = {theme.Text.base} fontSize={'xs'}>30/12/2023</Text>
            </VStack>
        </HStack>
        )
    }}
    </Pressable>

  )
}

export default Bookmarkfield;