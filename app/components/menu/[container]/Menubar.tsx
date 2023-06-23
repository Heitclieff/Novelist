import React,{FC , useState ,useEffect} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Switch,
Button,
Icon,
} from 'native-base'
import { useColorMode } from 'native-base'
import { Feather ,Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface MenubarProps {
  theme : any ,
  setTheme : any,
 }

const Menubar :React.FC <MenubarProps> = ({theme , setTheme}) => {
  const {colorMode , toggleColorMode} = useColorMode();
  const [isToggle , setisToggle] = useState(colorMode === 'dark' ? true : false);
  const [darkmode , setdarkmode]  = useState(theme ? theme === 'dark' ? true : false : false);

  const storeData =  async (item:any) : Promise<void> => {
    try {
      await AsyncStorage.setItem('theme' , item ? 'dark' : 'light')
    } catch(e){ 
      console.log(e)
    }
  }
  const getData = async () : Promise <any> => {
    try {
      const items = await AsyncStorage.getItem('theme');
      return items
    } catch(e){
      console.log(e)
    }
  }


  const toggleSwitch = async () => {
    storeData(!darkmode);
    setTheme(!darkmode)
    setdarkmode(!darkmode);
  }

  useEffect(() => {
      getData();
  },[])
  return (
    <HStack
    safeAreaTop = {12}
    justifyContent={'flex-end'}
    pr = {3}
    >   
    <HStack alignItems={'center'} space=  {1}>
        <Box>
          <Icon
            as={Ionicons}
            name= {theme === 'dark' ? 'moon' : 'sunny'}
            color={theme === 'dark' ? 'coolGray.200' : 'coolGray.700'}
            size={'sm'}
          ></Icon>
        </Box>
        <Switch
        isChecked = {darkmode}
        value = {darkmode}
        onToggle={toggleSwitch}
        size={'sm'}
        />
    </HStack>
       
    </HStack>
  )
}


export default Menubar;