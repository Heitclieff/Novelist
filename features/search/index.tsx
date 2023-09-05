import React,{useContext} from 'react'
import { 
VStack,
HStack ,
Box ,
Text, 
Input , 
Icon,
Pressable} from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { useNavigation } from '@react-navigation/native';
import { FlatList } from '../../components/layout/Flatlist/FlatList';

const Searchpage : React.FC =() => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();

  return (
     <VStack flex = {1} bg=  {theme.Bg.base}>
          <HStack pl = {6} pr = {6} pt = {3} safeAreaTop space = {2}>
                  <Input
                  w = '85%'
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<Icon as = {<EvilIcon name='search'/>} size = {5} mr = {2}/>}
                  placeholder='Search'
                  />
               <Pressable flex = {1} justifyContent={'center'} alignItems={'center'} onPress={()=> navigation.goBack()}> 
                    {({
                    isHovered,
                    isFocused,
                    isPressed
                    }) => {
                         return(   
                         <Box>
                              <Text fontWeight={'semibold'} color={isPressed ? theme.Text.description : isHovered ? theme.Text.description : theme.Text.base}>Cancel</Text>
                         </Box>
                         )
                         }}
               </Pressable>
          </HStack> 
          <FlatList flex = {1}>

          </FlatList>
     </VStack>
  )
}

export default Searchpage;