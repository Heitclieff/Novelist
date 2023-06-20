import React,{FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Switch
} from 'native-base'

interface MenubarProps { }

const Menubar :React.FC <MenubarProps> = () => {
  return (
    <HStack
    safeAreaTop = {12}
    justifyContent={'flex-end'}
    pr = {5}
    >   
    <Box >
        <Switch
        size={'sm'}
        />
    </Box>
       
    </HStack>
  )
}


export default Menubar;