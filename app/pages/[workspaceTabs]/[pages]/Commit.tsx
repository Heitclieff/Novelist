import React,{useContext} from 'react'
import { Box , VStack ,HStack , Icon , Text} from 'native-base';
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider';
import Commitbar from '../../../components/creater/[container]/Commitbar';
import CommitContainer from '../../../components/creater/[container]/CommitContainer';
import { teamsdata } from '../../../../assets/VisualCollectionsdata';
import { Flatlist } from '../../[stack]/[global]/Flatlist';
import { Select } from "native-base";

interface Pageprops {}
const Commit : React.FC <Pageprops> =  () => {
     const theme:any = useContext(ThemeContext)
     const Commitlist = [{
          title : "Fixed Episode 1 Drama scene.",
          chapter : 1 , 
          from : teamsdata[0]
     },{
          title : "Fixed Episode 2 miss word.",
          chapter : 2 , 
          from : teamsdata[1]
     },
     {
          title : "Fixed Episode 3 Fixed All of W in Episode.",
          chapter : 3 , 
          from : teamsdata[2]
     }

]
  return (
   <VStack flex = {1} bg = {theme.Bg.base}>
     <Commitbar/>
     
     <VStack pl ={6} pt = {5} pr = {6} flex= {1}>
          <Box w = '100%' h= {8}>
               <Select h={'100%'} borderColor={theme.Divider.base} bg = {theme.Bg.container} color={theme.Text.base}>
               <Select.Item label="All" value="ux" />
                    <Select.Item label="Chapter 1" value="ux" />
                    <Select.Item label="Chapter 2" value="web" />
                    <Select.Item label="Chapter 3" value="cross" />
               </Select>
          </Box>
          <Flatlist>
               <VStack mt = {5} space = {3}>
                    {Commitlist.map((item:any , index:number) =>
                         <CommitContainer key = {index} data=  {item}/>
                    )}
                   
               </VStack>
              
          </Flatlist>
     </VStack>
    
   </VStack>
  )
}

export default Commit;