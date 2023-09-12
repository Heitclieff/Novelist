import React,{useContext} from 'react'
import { 
VStack , 
HStack ,
Text, 
IconButton ,
Box, 
Icon } from 'native-base'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { ThemeWrapper } from '../../../../systems/theme/Themeprovider'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useNavigation } from '@react-navigation/native'
import { teamsdata } from '../../assets/config'

//@Components
import Deletebutton from '../../../../components/button/Deletebutton'
import ChapterItem from '../components/ChapterItem'

const MemorizedChapterItem = React.memo(ChapterItem);

interface  containerProps {}
const EpisodeSection : React.FC <containerProps> = ()=> {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
  return (
     <VStack pl = {5} pr= {5} pt = {5} space = {2}>
          <HStack justifyContent={'space-between'}>
          <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Chapter</Text>
          <IconButton 
                    onPress={() => navigation.navigate('Chapters')}
                    size = 'md'
                    rounded={'full'}
                    icon = {
                    <AntdesignIcon
                    name='plus'
                    size={15}
                    color = {theme.Icon.base}
                    />
                    }
          />
          </HStack>
         <SwipeListView 
            disableRightSwipe
            data={[0,1]}
            ItemSeparatorComponent={<Box h=  '2'/>}
            renderItem={(item:any , index:number) => (
               <MemorizedChapterItem data = {teamsdata[0]}/>
            )}
            renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
            leftOpenValue={60}
            rightOpenValue={-60}
         />
   </VStack>
  )
}

export default EpisodeSection;