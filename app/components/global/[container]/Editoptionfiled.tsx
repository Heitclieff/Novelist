import React from 'react'
import { 
Box,
HStack,
Text,
Input,
VStack,
Divider
} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'

interface containerProps {
    options  : any
    height : number
 }

const Editoptionfiled : React.FC <containerProps> = ({options}) => {
    const theme:any = useContext(ThemeContext);
  return (
      <Box justifyContent ={options.height ? 'flex-start' : 'center'}  h = {options.height ? options.height : '10'}>
        <HStack  pl={6} alignItems={'center'} pt = {1}>
            <Box w = '20%' >
                <Text
                fontWeight={'semibold'}
                color = {theme.Text.base}
                >{options.title}</Text>
            </Box>
                <Input
                    w='40'
                    variant={'unstyled'}
                    color='blue.500'
                    fontSize={'sm'}
                    value={options.value} />
        </HStack>
      </Box>
  )
}

export default Editoptionfiled;
