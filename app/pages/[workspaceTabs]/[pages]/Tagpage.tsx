import React,{useContext} from 'react'
import { Box , VStack , Text , Input, HStack} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import Edittingbar from '../../../components/[stack]/Profile/[container]/Edittingbar'
import { Flatlist } from '../../[stack]/[global]/Flatlist'
import { Categorydata } from '../../../../assets/VisualCollectionsdata'

interface Pageprops {}
const Tagpage: React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeContext);
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Edittingbar title = 'Tags' rightButtonEnable = {false}/>
          <Flatlist>
               <VStack flex=  {1} p = {5} space = {5}>
                    <VStack space = {2}>
                         <Text color = {theme.Text.base} fontWeight={'semibold'}>
                              Selected Tags
                         </Text>
                         <Box rounded={'full'} h={'10'} bg={theme.Bg.container} borderWidth={0}>
                         
                         </Box>
                    </VStack>
                    <HStack w = '100%' overflow={'hidden'} space = {2} flexWrap={'wrap'}>
                         {Categorydata.map((item:any , index:number) =>{
                              return(
                                   <Box key=  {index} p = {1} rounded={'full'} borderWidth={1} borderColor={'teal.600'} mb = {1}>
                                        <Text color = {theme.Text.description} fontSize={'xs'}>{item.title}</Text>
                                   </Box>
                              )
                         })}
                        
                    </HStack>
                 
               </VStack>
          </Flatlist>
        
     </VStack>
  )
}
export default Tagpage;
