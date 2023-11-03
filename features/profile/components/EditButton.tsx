import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Button , 
Center , 
Text } from 'native-base'


interface ProfileButtonprops {
     theme : any,
     navigation : any
 }

const EditProfileButton : React.FC <ProfileButtonprops> = ({navigation}) => {
     const theme:any = useContext(ThemeWrapper);

     return(
         <Button
             h={8}
             variant={'outline'}
             rounded={'2xl'}
             borderColor={theme.Button.outline}
             colorScheme={'coolGray'}
             onPress={() => navigation.navigate('Editprofile')}
             size='xs'>
             <Center>
                 <Text fontSize={'11'} fontWeight={'semibold'} color = {theme.Text.base}>
                     Edit Profile
                 </Text>
             </Center>  
         </Button>
     )
 }

export default EditProfileButton;