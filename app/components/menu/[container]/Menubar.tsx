import React,{FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Switch
} from 'native-base'
import { useColorMode } from 'native-base'
import { useState } from 'react'

interface MenubarProps {
 }

const Menubar :React.FC <MenubarProps> = () => {
  const {colorMode , toggleColorMode} = useColorMode();
  const [isToggle , setisToggle] = useState(colorMode === 'dark' ? true : false);

  console.log(colorMode)
  const toggleSwitch = () => {
    toggleColorMode();
    setisToggle(!isToggle)
  }
  return (
    <HStack
    safeAreaTop = {12}
    justifyContent={'flex-end'}
    pr = {5}
    >   
    <Box >
        <Switch
        isChecked = {isToggle}
        value = {isToggle}
        onToggle={toggleSwitch}
        size={'sm'}
        />
    </Box>
       
    </HStack>
  )
}


export default Menubar;