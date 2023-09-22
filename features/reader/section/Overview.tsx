import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack ,
Box ,
Text } from 'native-base'

interface containerProps {}

const Overviewsection : React.FC <containerProps> = ({overview}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <VStack w=  '100%' pl = {6} pt = {2} space = {2}>
    <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.base}>Overview</Text>
    <Box w = '90%'>
        <Text color = {theme.Text.base}>{`${overview}`}</Text>
    </Box>
</VStack>
  )
}

export default Overviewsection;