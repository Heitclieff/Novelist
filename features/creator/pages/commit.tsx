import React,{useContext} from 'react'
import { 
Box , 
VStack ,
HStack , 
Icon , 
Text , 
Select} from 'native-base';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { FlatList } from '../../../components/layout/Flatlist/FlatList';
import { Commitlist } from '../assets/config';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
//@Components
import Elementnavigation from '../../../components/navigation/Elementnavigation';
import CommitItem from '../components/CommitItem';
interface Pageprops {}

const Memorizednavigation = React.memo(Elementnavigation);
const MemorizedCommitItem = React.memo(CommitItem);

const Commit : React.FC <Pageprops> =  () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();

  return (
   <VStack flex = {1} bg = {theme.Bg.base}>
        <Memorizednavigation title = "Commits" 
            rightElement={[{icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
        />
     <VStack pl ={6} pt = {5} pr = {6} flex= {1}>
          <Box w = '100%' h= {8}>
               <Select h={'100%'} borderColor={theme.Divider.base} bg = {theme.Bg.container} color={theme.Text.base}>
               <Select.Item label="All" value="ux" />
                    <Select.Item label="Chapter 1" value="ux" />
                    <Select.Item label="Chapter 2" value="web" />
                    <Select.Item label="Chapter 3" value="cross" />
               </Select>
          </Box>
          <FlatList>
               <VStack mt = {5} space = {3}>
                    {Commitlist.map((item:any , index:number) =>
                         <MemorizedCommitItem key = {index} data=  {item}/>
                    )}
                   
               </VStack>
              
          </FlatList>
     </VStack>
    
   </VStack>
  )
}

export default Commit;