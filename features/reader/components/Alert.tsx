import React,{useContext} from "react";
import {
     Stack,
     Alert,
     HStack,
     VStack,
     Text,
     IconButton,
     CloseIcon,
} from "native-base";
import { StatusDialog } from "../assets/AlertDialog";
interface containerProps {
     status: any
     theme:any
     successText: string
     failedText : string
}

const AlertItem: React.FC<containerProps> = ({ status ,successText , failedText }) => {

     return (
     <Stack space={3} w="100%" maxW="200" >
          <Alert w="100%"  p = {2}  rounded = "full" bg = {'teal.600'} _text = {{color : 'gray.100'}}>
               {status == "success" ? successText: failedText}
          </Alert>
     </Stack>
     )
}


export default AlertItem