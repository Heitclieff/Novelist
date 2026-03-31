import React, { useContext } from 'react'
import { 
Center, 
Alert ,
VStack , 
HStack , 
Text, 
Badge,
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
          <Badge
           rounded={'full'}
           variant={'outline'}
           colorScheme={'amber'}
          >TEAM FULL
          </Badge>
     </Center>
  )
}


export default CreatorAlert;