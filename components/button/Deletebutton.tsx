import React , {useContext} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { Alert } from 'react-native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { 
HStack , 
IconButton , 
Icon } from 'native-base'

interface containerProps {
     action : any
     id : string
     doc_id : string
     title : string
}
const Deletebutton : React.FC <containerProps> = ({action , id ,doc_id , title }) => {
     const theme:any = useContext(ThemeWrapper);

     const SavingAlertDailog = () => 
     Alert.alert('Remove', `you want to remove ${title} ?`, [
          {
               text: 'Cancel',
               style: 'cancel',
          },
          {text: 'Confirm', onPress: () => action(id,doc_id)},
          
          ]);

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
          onPress={SavingAlertDailog}
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
                    color = {theme.Icon.static}
               />
          }/>

   </HStack>
  )
}

export default Deletebutton;