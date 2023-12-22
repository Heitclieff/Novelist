import React, {useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
Modal,
FormControl,
Input,
Button,
Checkbox,
HStack,
Text,
} from 'native-base'
interface containerProps {
     isOpen : any
     onClose : any
     rating : any
     isselect : any
     selectRating : any
}
const Rating: React.FC <containerProps> = ({isOpen , onClose , isselect, selectRating,  rating})  =>{
     const theme:any = useContext(ThemeWrapper);
  return (
       <Modal isOpen={isOpen} onClose={() => onClose(false)}>
            <Modal.Content maxWidth="400px" bg = {theme.Bg.container}>
                 <Modal.CloseButton />
                 <Modal.Header 
                  bg = {theme.Bg.container} 
                  borderBottomWidth = {0} 
                  _text={{color : theme.Text.heading}}>Rating</Modal.Header>
                 <Modal.Body w=  '100%' >
                    {rating?.length > 0 &&
                         rating.map((item:any , index:number) => {
                              const isChecked = isselect && isselect.title === item.title
                              return(
                                   <Button 
                                   onPress={() => {selectRating(item); onClose(false)}}
                                   key = {index}
                                   justifyContent={'start'}
                                   bg = {theme.Bg.container} 
                                   _pressed={{bg : theme.Bg.action}}>
                                        <HStack width = "250px" pl = {1} pr = {4} justifyContent={'space-between'} alignItems={'center'}> 
                                             <Text color = {theme.Text.base}>{item.title}</Text>
                                            
                                             <Checkbox  
                                             isChecked = {isChecked} 
                                             accessibilityLabel="This is a dummy checkbox" 
                                             bg = {theme.Bg.base}
                                            
                                             borderColor={theme.Bg.action}
                                             value = "test" 
                                             size= 'sm'/>
                                        </HStack>
                                     
                                   </Button>
                              )
                         })
                    }
                 </Modal.Body>
            </Modal.Content>
       </Modal>
  )
}


export default Rating