import React,{useContext} from 'react'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { VStack ,Box ,Text } from 'native-base'

interface containerProps {}

const OverviewSection : React.FC <containerProps> = () => {
    const theme:any = useContext(ThemeContext)
  return (
    <VStack w=  '100%' pl = {6} pt = {2} space = {2}>
    <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.base}>Overview</Text>
    <Box w = '90%'>
        <Text color = {theme.Text.base}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque enim ut dolorem rerum vel accusamus qui dolores modi ipsum commodi. Perspiciatis dolorum molestias voluptatibus commodi laudantium obcaecati nam nemo eligendi!</Text>
    </Box>
</VStack>
  )
}

export default OverviewSection;
