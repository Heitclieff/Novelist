import React,{useContext} from 'react'
import { VStack , HStack ,Text, IconButton ,Box, Icon } from 'native-base'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { AntDesign } from '@expo/vector-icons'

interface  containerProps {}
const EpisodeList_Edit : React.FC <containerProps> = ()=> {
     const theme:any = useContext(ThemeContext);
  return (
     <VStack pl = {5} pr= {5} pt = {5} space = {2}>
          <HStack justifyContent={'space-between'}>
          <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Chapter</Text>
          <IconButton 
                    size = 'md'
                    w = {7}
                    h = {7}
                    rounded={'full'}
                    icon = {
                    <Icon
                    as={AntDesign}
                    name='plus'
                    size={4}
                    color = {theme.Text.base}
                    ></Icon>
                    }
          />
          </HStack>

          <Box w = '100%' h = {70} bg = {theme.Bg.container} rounded={'md'}></Box>
          <Box w = '100%' h = {60} bg = {theme.Bg.container} rounded={'md'}></Box>
   </VStack>
  )
}

export default EpisodeList_Edit;