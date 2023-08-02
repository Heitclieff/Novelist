import React,{useContext} from 'react'
import { Box,HStack ,Text, VStack} from 'native-base'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { Image } from 'expo-image'

interface containerProps{
    data  :any,
}
const Bookmarkfields : React.FC <containerProps> = ({data}) => {
    const theme:any = useContext(ThemeContext)
  return (
   <HStack w = '90%' h = {110} bg = {theme.Bg.container} rounded={'md'} overflow = 'hidden'>
        <Box w = '23%' h = '100%' bg = 'green.200' overflow={'hidden'}>
            <Image style={{width : '100%' , height : '100%'}} source={data.images}/>

        </Box>
        <VStack w = '77%' h = '100%' pl = {2} justifyContent={'center'}>
            <Text color = {theme.Text.base} numberOfLines={2} fontWeight={'semibold'}>{data.title}</Text>
            <HStack>
                {data.creater && data.creater.map((items :any, key:number) => (
                    <Text color = {theme.Text.description} fontSize={'xs'}>{items.username}</Text>
                ))}
            </HStack>
            <Text color = {theme.Text.base} fontSize={'xs'}>30/12/2023</Text>
        </VStack>
    </HStack>
  )
}

export default Bookmarkfields;