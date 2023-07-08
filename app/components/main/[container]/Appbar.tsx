import React, {FC} from 'react'
import {
HStack,
VStack,
Box,
Text,
Divider,
Button,
Icon
} from 'native-base'
import { AntDesign,FontAwesome , Ionicons} from '@expo/vector-icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native'

interface AppbarProps {

}

const Appbar : React.FC <AppbarProps> = () => {
     const theme:any = useContext(ThemeContext);
     const navigation = useNavigation();
  return (
     <VStack 
     safeAreaTop = {12}
     w = '100%'
     bg  = {theme.Bg.base}
     justifyContent={'flex-end'}
     >
          <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          >
               <VStack
                    pl = {5}
               >
                    <Text 
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    color = {theme.Text.heading}
                    >Nobelist</Text>
               </VStack>
               <HStack 
               pr = {5}
               space={1}
               >
                    <Button
                    rounded={'full'}
                    w = {35}
                    h = {35}
                    bg= {theme.Button.base}
                    _hover={{bg :'gray.300'}}
                    _pressed={{backgroundColor :'gray.300'}}

                    >
                         <Icon 
                         as = {AntDesign}
                         name = 'search1'
                         color={theme.Icon.heading}
                         />
                     
                    </Button>
                    <Button
                    rounded={'full'}
                    w = {35}
                    h = {35}
                    bg = {theme.Button.base}
                    _hover={{bg :'gray.300'}}
                    _pressed={{backgroundColor :'gray.300'}}
                    onPress={() => navigation.navigate('Notification')}
                    >
                         <Icon 
                         as = {Ionicons}
                         name = {'notifications'}
                         color={theme.Icon.heading}
                         
                         />
                    </Button>
               </HStack>
          </HStack>

     </VStack>
  )
}

export default Appbar;
