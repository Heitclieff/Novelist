import React from 'react'
import { Box , HStack ,Text, Icon , IconButton, VStack , Divider} from 'native-base';
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider';
import { useContext } from 'react';
import { Octicons } from '@expo/vector-icons';
import Chapterfield from './Chapterfield';
import CommentModal from '../../../../global/[modal]/CommentModal';

interface containerProps { 
    handleCommentButton  : any
}

const EpisodeList : React.FC <containerProps> = ({handleCommentButton}) => {
    const theme:any = useContext(ThemeContext);
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
                            <Icon 
                            size = 'md'
                            as = {Octicons} 
                            color = {theme.Icon.base}
                            name = {'comment-discussion'}/>}
                />
            </HStack>
            <Divider mt = {2} bg = {theme.Divider.base}/>
        </Box>
        <VStack pt = {6}  pl = {4}  pr = {4}  space=  {2}>
         {[0,0,0,0].map((item:any , key:number) => 
            <Chapterfield
                key = {key}
                id = {key + 1}
            />
         )}
        </VStack>
    </VStack>
  )
}

export default EpisodeList;