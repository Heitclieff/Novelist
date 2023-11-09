import React,{useContext} from 'react'
import { 
Box, 
HStack,
VStack ,
Text,
Pressable,
Divider } from 'native-base'
import { Image } from 'react-native';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native';

interface containerProps {
    index: number
    item : any
}
const LeaderItem : React.FC <containerProps> = ({index, item}) => {
    const theme:any = useContext(ThemeWrapper);
    const navigation = useNavigation();

    return (
        <Pressable onPress=  {() => navigation.navigate('ProfileStack', {profile : {pf_image : item.image , bg_image : item.image ,...item}})}>
        {({
            isHovered,
            isFocused,
            isPressed
        }) => {
            return(

            
        <VStack w="96%" p = {3} bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action  : theme.Bg.container}  alignItems="center" justifyContent="center" rounded="full">
        <HStack alignItems="center">
            <Box w = '10%'>
            <Text fontSize="lg" fontWeight="semibold" color={theme.Text.base}>
                {index}
            </Text>
            </Box>
            <Box w="15%" alignItems="center">
            <Box w="50" h="50" bg="gray.200" rounded="full">
                {!item ? (
                <Text style={{ width: 50, height: 50, borderRadius: 25 }}></Text>
                ) : (
                <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                )}
            </Box>
            </Box>
            <HStack w="70%" space={3} pl={3} justifyContent="space-between" pr={5}>
            <Text color={theme.Text.base} fontSize="md" fontWeight="normal">
                {!item ? 'Default Username' : item.username}
            </Text>
            <Text color={theme.Text.base} fontSize="md" fontWeight="semibold">
                {!item ? '0' : item.score}
            </Text>
            </HStack>
        </HStack>
        </VStack>
    )}}
    </Pressable>
    );
}

export default LeaderItem;