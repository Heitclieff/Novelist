import React, { useContext } from 'react'
import { 
Center, 
Alert ,
VStack , 
HStack , 
Text, 
IconButton , 
Box ,
Icon,
WarningTwoIcon,
CloseIcon } from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'

interface containerProps {}

const CreatorAlert : React.FC <containerProps>  = () => {
     const theme:any = useContext(ThemeWrapper);

  return (
     <Center>
          <VStack   pl = {3} pr = {3}>
          <HStack  justifyContent="space-between">
               <HStack  alignItems="center" space= {2}>
               <WarningTwoIcon color = {'yellow.600'} size=  'xs'/>
               <Text fontSize="xs" fontWeight="normal" color = {theme.Text.base}>
                    Teams sizes was full.
               </Text>
               </HStack>
          </HStack>
          </VStack>
     </Center>
  )
}


export default CreatorAlert;