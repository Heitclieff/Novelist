import React , {useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import OctIcon from 'react-native-vector-icons/Octicons'
import { 
Box , 
HStack ,
Text, 
Icon , 
IconButton, 
VStack , 
Divider} from 'native-base';

//@Components
import ChapterItem from './ChapterItem';

interface containerProps { 
    id : string| number
    handleCommentButton  : any
}

const MemorizedChapterItem = React.memo(ChapterItem)

const Chapterfield : React.FC <containerProps> = ({id ,handleCommentButton}) => {
    // console.log('chapfield',id)
    const theme:any = useContext(ThemeWrapper);
  return (
    <VStack space = {1} position={'relative'} >
        <Box w = '100%' h = {10}  justifyContent={'center'} >
            <HStack justifyContent={'space-between'}  pl = {6}  pr = {6} alignItems={'center'}>
                <Text color = {theme.Text.base} fontWeight={'semibold'}>Chapter</Text>
                <IconButton 
                        size = 'sm'
                        w = '30'
                        h = {30}
                        rounded={'full'}
                        onPress={handleCommentButton}
                        icon = {
                            <OctIcon 
                            size = {15}
                            color = {theme.Icon.base}
                            name = {'comment-discussion'}/>}
                />
            </HStack>
            <Divider mt = {2} bg = {theme.Divider.base}/>
        </Box>
        <VStack pt = {6}  pl = {4}  pr = {4}  space=  {2}>
         {id.map((item:any , key:number) => 
            <MemorizedChapterItem
                key = {key}
                p_id = {item.novelDoc}
                id = {item.chap_id}
                title = {item.title}
                date = {item.updateAt}
            />
         )}
        </VStack>
    </VStack>
  )
}

export default Chapterfield;