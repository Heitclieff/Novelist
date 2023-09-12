import React ,{useContext} from 'react'
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

import EntypoIcon from 'react-native-vector-icons/Entypo'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useNavigation } from '@react-navigation/native'

interface FiledProps {
    isDividerEnable : boolean,
    isChevronEnable : any ,
    justifyIcon : string,
    fontcolor : string,
    title :string,
    detail : any,
    icon :any,
    direction : never,
}

const Optionfield :React.FC <FiledProps> = ({
    isDividerEnable = true , 
    isChevronEnable =  true, 
    justifyIcon = 'center',
    fontcolor,
    title , 
    detail , 
    icon,
    direction , 
    }) => {
    
    const theme:any = useContext(ThemeWrapper)
    const navigation = useNavigation();

  return (
    <Pressable onPress={()=> navigation.navigate(direction)}>
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
            rounded= 'full'
            bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action : theme.Bg.container}
            >
                <HStack 
                w= '100%'
                h = '100%'
                justifyContent={'center'}
                alignItems={'center'}
                space = {2}
                >
                    {icon}
                    
                    <VStack justifyContent={'center'}  p = {1}  w = {'75%'} pl = {2}>
                        <Text color = {fontcolor ? fontcolor : theme.Text.base} fontSize='md' >{title ? title : 'Options title'}</Text>
                        {detail && <Text fontSize='xs' color = {theme.Text.description} >{detail}</Text>}
                    </VStack>
                    {isChevronEnable && 
                        <Box w = '10%' h = '100%' justifyContent={'center'}>
                            <EntypoIcon
                                name='chevron-right'
                                size= {30}
                            />
                        </Box>
                    }
                </HStack>
                {isDividerEnable && <Divider bg = {theme.Divider.base}/>}
            </VStack>
        )
    }}
    </Pressable>
   
  )
}

export default Optionfield;