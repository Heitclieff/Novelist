import React , {useContext} from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { HStack , IconButton , Icon } from 'native-base'
import { AntDesign , Ionicons } from '@expo/vector-icons'
interface containerProps {}
const BookmarkRemoveButton : React.FC <containerProps> = () => {
     const theme:any = useContext(ThemeContext);
  return (
     <HStack  
     flex = {1} 
     m = {1}  
     space = {1} 
     p = {5}
     flexDirection={'row'} 
     alignItems={'center'} 
     justifyContent={'flex-end'} 
     rounded={'md'} 
     overflow={'hidden'}>

          <IconButton 
          bg = {'amber.500'}
          colorScheme={'rose'}
          size = 'md'
          w = {50}
          h = {50}    
          rounded={'md'}
          icon = {
               <Icon
               as={Ionicons}
               name='bookmark-outline'
               size={4}
               color = {'coolGray.200'}
               ></Icon>
          }/>

   </HStack>
  )
}

export default BookmarkRemoveButton;
