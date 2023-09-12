import React , {useContext} from 'react'
import { 
HStack , 
IconButton , 
Icon } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'

interface containerProps {}
const Bookmarkbutton : React.FC <containerProps> = () => {
     const theme:any = useContext(ThemeWrapper);
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
               <IonIcon
               name='bookmark-outline'
               size={15}
               color = {theme.Icon.base}
               />
          }/>

   </HStack>
  )
}

export default Bookmarkbutton;