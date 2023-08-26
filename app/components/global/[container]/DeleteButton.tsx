import React , {useContext} from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { HStack , IconButton , Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
interface containerProps {}
const DeleteButton : React.FC <containerProps> = () => {
     const theme:any = useContext(ThemeContext);
  return (
     <HStack  
     flex = {1} 
     m = {1}  
     space = {1} 
     flexDirection={'row'} 
     alignItems={'center'} 
     justifyContent={'flex-end'} 
     rounded={'full'} 
     overflow={'hidden'}>

          <IconButton 
          bg = {'rose.600'}
          colorScheme={'rose'}
          size = 'md'
          w = {50}
          h = {50}    
          rounded={'full'}
          icon = {
               <Icon
               as={AntDesign}
               name='delete'
               size={4}
               color = {theme.Text.base}
               ></Icon>
          }/>

   </HStack>
  )
}

export default DeleteButton;
