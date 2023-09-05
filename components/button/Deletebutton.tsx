import React , {useContext} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { 
HStack , 
IconButton , 
Icon } from 'native-base'

interface containerProps {}
const Deletebutton : React.FC <containerProps> = () => {
     const theme:any = useContext(ThemeWrapper);
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
               <AntdesignIcon
                    name='delete'
                    size={15}
                    color = {'coolGray.200'}
               />
          }/>

   </HStack>
  )
}

export default Deletebutton;