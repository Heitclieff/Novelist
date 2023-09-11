import React, {useContext} from 'react'
import { ThemeWrapper } from '../../../../systems/theme/Themeprovider'
import { 
VStack ,
Button , 
HStack ,
Text } from 'native-base'

interface containerProps {}
const Tagsection : React.FC  <containerProps> = () => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <VStack w= '100%' pl ={6} pt = {5} space = {1}>
        <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.base}>TAGS</Text>
        <HStack space = {2}>
            <Button rounded={'2xl'} size = 'xs' colorScheme={'gray'}>Romantic</Button>
            <Button rounded={'2xl'} size = 'xs' colorScheme={'gray'}>Comendy</Button>
        </HStack>
    </VStack>
  )
}

export default Tagsection;