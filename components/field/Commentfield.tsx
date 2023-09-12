import React,{useContext , useState} from 'react'
import {
Box,
HStack, 
VStack,
Text, 
IconButton , 
Icon} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
// import * as Haptics from 'expo-haptics';

interface containerProps {}
const Commentfield : React.FC <containerProps> = () => {
    const theme:any = useContext(ThemeWrapper)
    const [isLiked , setisLiked] = useState<boolean>(false);
    const [LikeCount , setLikedCount] = useState<number>(0);

    const ChangLikeStatus = () => {
        let Like = 0
        setisLiked(!isLiked)
        if(!isLiked){
            Like = 1
        }
        setLikedCount(Like)
    }
  return (
    
    <HStack w = '100%' justifyContent={'center'}>
        <Box w = '13%' alignItems={'center'}>
            <Box w = '35' h = '35' bg = 'green.200' rounded = 'full'></Box>
        </Box>
        <VStack w  = '80%' space = {1}>
            <HStack justifyContent={'space-between'}>
                <VStack w = '90%' space = {0.5}>
                    <Text fontWeight={'medium'} color = {theme.Text.base}>Username</Text>
                    <Text color = {theme.Text.base}> Lorem ipsum dolor sit amet consectetur odit</Text>
                </VStack>
                <Box w = '10%' h = '100%' mt = {2}>
                    <IconButton
                    size='sm'
                    w='30'
                    h={30}
                    rounded={'full'}
                    // onPress={() => {ChangLikeStatus(); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                    icon={
                        <AntdesignIcon
                            size={10}
                            color={isLiked ? 'red.500' : theme.Icon.base}
                            name={isLiked ? 'heart' : 'hearto'} />}
                />
                </Box>
            </HStack>
        
            <HStack space = {3} alignItems={'center'}>
                <Text fontSize={'xs'} color = {theme.Text.description} fontWeight={'medium'}>{`${LikeCount} Like`}</Text>
                <Text fontSize={'xs'} color = {theme.Text.description} fontWeight={'medium'}>Reply</Text>
            </HStack>
        </VStack>
      
    </HStack>
  
  )
}

export default Commentfield;