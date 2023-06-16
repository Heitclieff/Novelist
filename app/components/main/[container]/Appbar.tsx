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
     
interface AppbarProps {}

const Appbar : React.FC <AppbarProps> = () => {
  return (
     <VStack 
     safeAreaTop = {12}
     w = '100%'
     
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
                    >Nobelist</Text>
               </VStack>
               <HStack 
               pr = {5}
               space={1}
               >
                    <Button
                    rounded={'full'}
                    w = '35px'
                    h = '35px'
                    bg=  'gray.200'
                    _hover={{bg :'gray.300'}}
                    _pressed={{backgroundColor :'gray.300'}}

                    >
                         <Icon 
                         as = {AntDesign}
                         name = 'search1'
                         color={'gray.700'}
                         />
                     
                    </Button>
                    <Button
                    rounded={'full'}
                    w = '35px'
                    h = '35px'
                    bg = 'coolGray.200'
                    _hover={{bg :'gray.300'}}
                    _pressed={{backgroundColor :'gray.300'}}
                    >
                         <Icon 
                         as = {Ionicons}
                         name = {'notifications'}
                         color={'gray.700'}
                         />
                    </Button>
               </HStack>
          </HStack>
          
          <Divider bg ={'gray.100'}/>
     </VStack>
  )
}

export default Appbar;
