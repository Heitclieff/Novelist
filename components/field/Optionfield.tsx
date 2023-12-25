import React ,{useContext} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Divider,
Icon,
Stack,
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
    colorScheme = false,
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
            <Stack 
            h = {60}
            pl = { colorScheme ? 1.5 : 0}
            rounded = 'xs'
            bg ={'teal.500'} 
            >
                <VStack   
                bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action : theme.Bg.base}
                h = {60}
                >
                    <HStack 
                    w= '100%'
                    h = '100%'
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    pl = {5}
                    pr = {1}
                    space = {2}
                    >
                        {icon}
                        
                        <VStack justifyContent={'center'}  p = {1}  w = {'80%'} pl = {2}>
                            <Text color = {fontcolor ? fontcolor : theme.Text.base} fontSize='md' >{title ? title : 'Options title'}</Text>
                            {detail && <Text fontSize='xs' color = {theme.Text.description} >{detail}</Text>}
                        </VStack>
                        {isChevronEnable && 
                            <Box h = '100%' justifyContent={'center'}>
                                <EntypoIcon
                                    name='chevron-right'
                                    size= {20}
                                    color = {theme.Icon.base}
                                />
                            </Box>
                        }
                    </HStack>
                </VStack>
                {isDividerEnable && <Divider bg = {theme.Divider.base}/>}
            </Stack>
        )
    }}
    </Pressable>
   
  )
}

export default Optionfield;