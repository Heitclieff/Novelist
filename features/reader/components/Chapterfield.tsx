import React , {useContext , useEffect, useState} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import OctIcon from 'react-native-vector-icons/Octicons'
import FontAwesome5Icon  from 'react-native-vector-icons/FontAwesome5'
import { 
Box , 
HStack ,
Text, 
Icon , 
IconButton, 
VStack , 
Divider ,
PresenceTransition,
Stack
} from 'native-base';

//@Components
import ChapterItem from './ChapterItem';

interface containerProps { 
    noveltitle : string,
    data : any;
    doc_id : string;
    chapterdata : any
    handleCommentButton  : any
    comment_status : boolean
}

const MemorizedChapterItem = React.memo(ChapterItem)

const Chapterfield : React.FC <containerProps> = ({noveltitle ,comment_status,chapterdata, doc_id}) => {
    const theme:any = useContext(ThemeWrapper);

    const chapterlist = [...chapterdata]
    const [reverseOrder ,setReverseOrder] = useState(false);
    const reversedChapterList = reverseOrder ? [...chapterlist].reverse() : chapterlist;

  return (
    <VStack space = {1} position={'relative'} >
        <Box w = '100%' h = {10}  justifyContent={'center'} >
            <Stack mr = {5} ml = {5} bg = 'teal.500' rounded = 'sm' pl = {1.5} overflow = 'hidden'>
                <HStack justifyContent={'space-between'} p = {0.5} pl = {2} alignItems={'center'} bg = {theme.Bg.container}>
                    <Text 
                    fontSize={'sm'} 
                    color = {theme.Text.heading}
                    fontWeight={'semibold'}>
                        All Episodes ({chapterdata?.length})
                    </Text>
                    <IconButton 
                        isDisabled = {!comment_status}
                        size = 'sm'
                        w = "30px"
                        h = "30px"
                        rounded={'full'}
                        onPress= {() => setReverseOrder(!reverseOrder)}
                        icon = {
                            <FontAwesome5Icon 
                            size = {14}
                            color = {theme.Icon.base}
                            name = {'sort'}
                            />
                        }
                    />    
                </HStack>
            </Stack>
        </Box>
        
        <VStack  pl = {4}  pr = {4}  space=  {2}>
            {
            reversedChapterList?.map((document:any ,key:number) => {
                    return (
                        <MemorizedChapterItem
                        key={key}
                        id={document.id}
                        doc_id = {doc_id}
                        episode ={document.chap_id}
                        data = {document}
                        noveltitle = {noveltitle}
                        content = {document.content}
                        title={document.title}
                        timestamp ={document.updateAt}
                        />
                    )
            })}
        </VStack>
        
    </VStack>
  )
}

export default Chapterfield;