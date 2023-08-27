import React,{useContext , useState} from 'react'
import { useRoute } from '@react-navigation/native'
import { Box, VStack , Text, Input} from 'native-base'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import Edittingbar from '../../../../../components/[stack]/Profile/[container]/Edittingbar'
interface Pageprops {

}
const Edittingtemplete : React.FC <Pageprops> =() => {
     const route = useRoute()
     const {options}:any = route.params  

     const theme:any = useContext(ThemeContext)
     const [input ,setInput] = useState<string>(options.value)
  
  return (
    <Box flex = {1} bg = {theme.Bg.base}>
          <Edittingbar title ={options.title}/>
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
export default Edittingtemplete;