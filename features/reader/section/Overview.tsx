import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack ,
Box ,
Text } from 'native-base'

interface containerProps {
  overview : string
}

const Overviewsection : React.FC <containerProps> = ({overview}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <VStack  ml = {3} p  ={2} mt = {2} mr = {3}  pt = {2} space = {2}  rounded={'md'}>
    <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.heading}>Overview</Text>
    <Box w = '100%'>
        <Text color = {theme.Text.base}>{`${overview}`}</Text>
    </Box>
</VStack>
  )
}

export default Overviewsection;