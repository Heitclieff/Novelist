import React,{useContext , useState} from 'react'
import { useRoute } from '@react-navigation/native'
import { Box, VStack , Text, Input} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import Centernavigation from '../../components/navigation/Centernavigation'
interface Pageprops {

}
const Editfield : React.FC <Pageprops> =() => {
     const route = useRoute()
     const {options}:any = route.params  

     const theme:any = useContext(ThemeWrapper);
     const [input ,setInput] = useState<string>(options.value)
  
  return (
    <Box flex = {1} bg = {theme.Bg.base}>
          <Centernavigation title ={options.title} />
          <VStack p ={4} space = {2}>
               <Text pl = {2} color={theme.Text.description} fontSize={'xs'} fontWeight={'semibold'}>{options.title}</Text>
               <Input
               color={theme.Text.base}
               height={8}
               borderWidth={1}
               rounded={'full'}
               bg = {theme.Bg.container}
               borderColor={theme.Bg.container}
               value= {input}
               />
          </VStack>
     </Box>
  )
}
export default Editfield;