import React , {useContext , useEffect, useState} from 'react'
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
    noveltitle : string,
    data : any;
    doc_id : string;
    handleCommentButton  : any
    comment_status : boolean
}

const MemorizedChapterItem = React.memo(ChapterItem)

const Chapterfield : React.FC <containerProps> = ({noveltitle ,comment_status,chapterdata,doc_id, handleCommentButton}) => {
    const theme:any = useContext(ThemeWrapper);
   
  return (
    <VStack space = {1} position={'relative'} >
        <Box w = '100%' h = {10}  justifyContent={'center'} >
            <HStack justifyContent={'space-between'}  pl = {6}  pr = {6} alignItems={'center'}>
                <Text fontSize={'md'} color = {theme.Text.heading} fontWeight={'semibold'}>Chapter</Text>
                <IconButton 
                        isDisabled = {!comment_status}
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
            {chapterdata.map((document:any ,key:number) => {
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