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
import FastImage from 'react-native-fast-image'

interface containerProps{
    data  :any,
    id : number | string
}
const Bookmarkfield : React.FC <containerProps> = ({data ,id}) => {
    // console.log('bookmark field',data, id)
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();

    const date = new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000);

    const timezoneOffset = date.getTimezoneOffset();
    const formattedDate = date.toLocaleString();
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
                <FastImage
                  style={{width : '100%', height : '100%' }}
                  source={{
                    uri : data.image  , 
                    priority : FastImage.priority.normal,
                  }}
                  alt = "images"
                  resizeMode={FastImage.resizeMode.cover}
                />
            </Box>
            <VStack w = '77%' h = '100%' pl = {2} justifyContent={'center'}>
                <Text color = {theme.Text.base} numberOfLines={2} fontWeight={'semibold'}>{data.title}</Text>
                <HStack>
                    {data.creator && data.creator.map((items :any, key:number) => (
                        <Text key={key} color = {theme.Text.description} fontSize={'xs'}>{items.username}</Text>
                    ))}
                </HStack>
                <Text color = {theme.Text.base} fontSize={'xs'}>{formattedDate}</Text>
            </VStack>
        </HStack>
        )
    }}
    </Pressable>

  )
}

export default Bookmarkfield;