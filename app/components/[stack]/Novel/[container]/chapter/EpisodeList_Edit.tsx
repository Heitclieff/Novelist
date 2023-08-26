import React,{useContext} from 'react'
import { VStack , HStack ,Text, IconButton ,Box, Icon } from 'native-base'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { AntDesign } from '@expo/vector-icons'
import DeleteButton from '../../../../global/[container]/DeleteButton'
import { SwipeListView } from 'react-native-swipe-list-view'
import Chaptercontainer from '../../../../creater/[container]/Chaptercontainer'
import { teamsdata } from '../../../../../../assets/VisualCollectionsdata'
import { useNavigation } from '@react-navigation/native'

interface  containerProps {}
const EpisodeList_Edit : React.FC <containerProps> = ()=> {
     const theme:any = useContext(ThemeContext);
     const navigation = useNavigation();
  return (
     <VStack pl = {5} pr= {5} pt = {5} space = {2}>
          <HStack justifyContent={'space-between'}>
          <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Chapter</Text>
          <IconButton 
                    onPress={() => navigation.navigate('Chapters')}
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
         <SwipeListView 
            disableRightSwipe
            data={[0,1]}
            ItemSeparatorComponent={<Box h=  '2'/>}
            renderItem={(item:any , index:number) => (
               <Chaptercontainer data = {teamsdata[0]}/>
            )}
            renderHiddenItem={ (data, rowMap) => (<DeleteButton/>)}
            leftOpenValue={60}
            rightOpenValue={-60}
         />
   </VStack>
  )
}

export default EpisodeList_Edit;