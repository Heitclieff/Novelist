import React,{useContext} from 'react'
import { 
Box , 
VStack ,
Text , 
Input, 
HStack} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Categorydata } from '../../../assets/content/VisualCollectionsdata'

//@Components
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import Centernavigation from '../../../components/navigation/Centernavigation'

interface Pageprops {}

const Memorizednavigation = React.memo(Centernavigation);

const Tag: React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
             <Memorizednavigation title = "Tags" />
          <FlatList>
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
          </FlatList>
        
     </VStack>
  )
}
export default Tag;