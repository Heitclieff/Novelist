import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { VStack ,Button , HStack ,Text } from 'native-base'

interface containerProps {}
const TagsSection : React.FC  <containerProps> = () => {
    const theme:any = useContext(ThemeContext)
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

export default TagsSection;