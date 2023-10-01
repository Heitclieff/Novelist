import React, {useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack ,
Button , 
HStack ,
Text } from 'native-base'

interface containerProps {}
const Tagsection : React.FC  <containerProps> = ({tag}) => {
  
    const theme:any = useContext(ThemeWrapper)
    // console.log('tag',tag.tag)
  return (
    <VStack w= '100%' pl ={6} pt = {5} space = {1}>
        <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.base}>TAGS</Text>
        
        <HStack space = {2}>
            {tag && tag.map((tag, index) => (
              <Button
                key={index}
                rounded={'2xl'}
                size='xs'
                colorScheme={'gray'}
              >
                {tag}
              </Button>
            ))}
        </HStack>
    </VStack>
  )
}

export default Tagsection;