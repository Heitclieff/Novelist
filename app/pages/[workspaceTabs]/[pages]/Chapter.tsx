import React,{useContext} from 'react'
import { Box , VStack ,HStack,Input , Icon , Text } from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import Chapterbar from '../../../components/creater/[container]/Chapterbar'
import { EvilIcons } from '@expo/vector-icons'
import { Flatlist } from '../../[stack]/[global]/Flatlist'
import Chaptercontainer from '../../../components/creater/[container]/Chaptercontainer'
import { teamsdata } from '../../../../assets/VisualCollectionsdata'

interface Pageprops {}
const Chapter : React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeContext)
  return (
     <VStack flex=  {1} bg=  {theme.Bg.base}>
          <Chapterbar/>
          <Box flex = {1}>
          <Flatlist>
            <Box w= '100%' mt = {2}>
              <Box pl = {6} pr = {6}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<Icon as = {<EvilIcons name='search'/>} size = {5} mr = {2}/>}
                  placeholder='Seacrh your Chapter name'
                  />
              </Box> 
            </Box> 
               <VStack space = {2} m ={5} mt = {6}>
                    <VStack mb = {4} space = {2}>
                         <Chaptercontainer data = {teamsdata[0]}/>
                         <Chaptercontainer data = {teamsdata[0]}/>
                         
                    </VStack>
               </VStack>
            </Flatlist>
        </Box>
     </VStack>
  
  )
}

export default Chapter;