import React,{useContext , useState} from 'react'
import { 
Box , 
HStack, 
Text , 
VStack , 
Pressable} from 'native-base'
import { Image } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
interface containerProps {
     id : any,
     title : string ,
     onAction : any,
     onFocused : boolean,

}
const TagItem : React.FC <containerProps>= ({id ,title ,onAction , selectedTags = false , onFocused}) => {
     const theme:any = useContext(ThemeWrapper);
     const [isAction , setisAction] = useState(onFocused);

     const onTagsPress = () =>{
          if(selectedTags)return
          
          setisAction(!isAction);
          onAction(id , title);
     }
  return (
     <Pressable onPress = {onTagsPress}>
     {({
         isHovered,
         isFocused,
         isPressed
     }) => {
          return(
               <Box  p = {1} rounded={'full'} borderWidth={1} borderColor={'teal.600'} mb = {1} bg=  {isAction  ? "teal.600": null}>
                    <Text color = {isAction ? 'white' :theme.Text.description} fontSize={'xs'}>{title}</Text>
               </Box>
          )
     }}
     </Pressable>
  )
}

export default TagItem