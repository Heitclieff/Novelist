import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Button , 
Center , 
Text } from 'native-base'


interface ProfileButtonprops {
     theme : any,
     navigation : any
     isfollow : boolean,
     action : any
 }

const FollowButton : React.FC <ProfileButtonprops> = ({navigation , isfollow = true , action}) => {
     const theme:any = useContext(ThemeWrapper);

     return(
         <Button
             w = {24}
             variant={isfollow ? 'outline' : 'solid'}
             rounded={'2xl'}
             borderColor={theme.Button.outline}
             bg = {isfollow ? 'transparent' : theme.Button.follow.base}
             _pressed={{backgroundColor : theme.Button.follow.focused}}
             p = {1.5}
             onPress= {() => action(!isfollow)}
             size='xs'>
             <Center>
                 <Text fontSize={'11'} fontWeight={'semibold'} color = {isfollow ? theme.Text.base : theme.Text.container}>
                     {isfollow ?`following` : `follow`}
                 </Text>
             </Center>  
         </Button>
     )
 }

export default FollowButton;