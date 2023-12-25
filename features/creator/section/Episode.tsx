import React,{useContext, useState , useEffect} from 'react'
import { 
VStack , 
HStack ,
Text, 
IconButton ,
Box, 
Center,
Icon, 
Stack} from 'native-base'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useNavigation } from '@react-navigation/native'

// @Redux toolkits
import { useSelector , useDispatch } from 'react-redux'

//@Components
import Deletebutton from '../../../components/button/Deletebutton'
import ChapterItem from '../components/ChapterItem'

const MemorizedChapterItem = React.memo(ChapterItem);

interface  containerProps {
   doc_id : string;
}
const EpisodeSection : React.FC <containerProps> = ({doc_id})=> {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const chapterdocs = useSelector((state) => state.content);

     const [saperatedChapter , setSaperatedChapter] = useState([]);

     const saperatedChapterWithdraft = () => {
         const filterchapter = chapterdocs.content?.filter((doc) => doc.status !== true);

         setSaperatedChapter(filterchapter);
      }

      useEffect(() => {
         saperatedChapterWithdraft();
      } , [doc_id])
  return (
     <VStack pl = {5} pr= {5} pt = {5} space = {2}>
         <Stack pl = {1.5} bg = "teal.500" rounded = "sm" overflow ='hidden'>
            <HStack justifyContent={'space-between'} pl = {2}  bg=  {theme.Bg.container} alignItems={'center'} >
               <Text color = {theme.Text.heading} fontSize={'sm'} fontWeight={'semibold'}>All Episodes ({saperatedChapter?.length})</Text>
               <IconButton 
                        onPress={() => navigation.navigate('Episodes')}
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
         </Stack>
        {saperatedChapter?.length > 0 ?
           <SwipeListView
              disableRightSwipe
              disableLeftSwipe={true}
              data={saperatedChapter}
              ItemSeparatorComponent={<Box h='2' />}
              renderItem={(item: any, index: number) => {
                 return (

                    <ChapterItem
                       key={item.id}
                       data={item.item}
                       doc_id={doc_id}
                    />
                 )
              }}
               
        renderHiddenItem={(data, rowMap) => {
           return (
              <Deletebutton />
           )
        }}
        leftOpenValue={60}
        rightOpenValue={-60}
         />
      :
      
      <Center mt = {5}>
         <Text color = {theme.Text.description}>Not founds any Episodes.</Text>
      </Center>
      }
   </VStack>
  )
}

export default EpisodeSection;