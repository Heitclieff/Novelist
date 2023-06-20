import React ,{FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Divider,
Icon,
IconButton,
Pressable
} from 'native-base'
import { Entypo } from '@expo/vector-icons'

interface FiledProps {
    isDividerEnable : boolean,
    title :string,
    OptionIcon : {
        type : any
        name : string
    };
}

const Optionfield :React.FC <FiledProps> = ({isDividerEnable = true , title , OptionIcon}) => {
  return (
    <Pressable >
    {({
        isHovered,
        isFocused,
        isPressed
    }) => {
        return (
            <VStack
            w = '100%'
            h = {60}
            m = {0.3}
            rounded = 'md'
            bg = {isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
            >
                <HStack 
                w= '100%'
                h = '100%'
                >
                    <Box 
                    w = '15%' 
                    h = '100%'
                    justifyContent={'center'}
                    alignItems={'center'}
                    >         
                        <Icon
                            as={OptionIcon ? OptionIcon.type : null}
                            name= {OptionIcon ? OptionIcon.name : ''}
                            size={'md'}
                            color = 'gray.700'
                           
                            />
                    </Box>
                    <Box justifyContent={'center'} p = {1}  w = '75%'>
                        <Text fontSize={'md'}>{title ? title : 'Options title'}</Text>
                    </Box>
                    <Box w = '10%'  h = '100%' justifyContent={'center'}>
                        <IconButton
                            icon={
                                <Icon
                                    as={Entypo}
                                    name='chevron-right'
                                    size={'xl'}
                                ></Icon>
                        } />
                    </Box>
                </HStack>
                {isDividerEnable && <Divider/>}
            </VStack>
        )
    }}
    </Pressable>
   
  )
}

export default Optionfield;
