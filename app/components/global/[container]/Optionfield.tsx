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
import { useNavigation } from '@react-navigation/native'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../systems/theme'

interface FiledProps {
    isDividerEnable : boolean,
    isChevronEnable : any ,
    theme : any,
    justifyIcon : string,
    fontcolor : string,
    title :string,
    detail : any,
    OptionIcon : {
        type : any
        name : any
    },
    direction : any,
    navigation : any,

}

const Optionfield :React.FC <FiledProps> = ({
    isDividerEnable = true , 
    isChevronEnable =  true, 
    theme,
    justifyIcon = 'center',
    fontcolor,
    title , 
    detail , 
    OptionIcon, 
    direction , 
    navigation}) => {

        const {colorMode} = useColorMode();
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
            rounded = 'md'
            bg = {isPressed ? theme.Bg.action : isHovered ? theme.Bg.action : theme.Bg.base}
            >
                <HStack 
                w= '100%'
                h = '100%'
                >
                    {OptionIcon.type &&
                        <Box 
                        w = {justifyIcon == 'start' ? '8%' : '15%'} 
                        h = '100%'
                        justifyContent={'center'}
                        alignItems={justifyIcon}
                        >         
                            <Icon
                                as={OptionIcon ? OptionIcon.type : null}
                                name= {OptionIcon ? OptionIcon.name : ''}
                                size={'md'}
                                color = {theme.Icon.base}
                                />
                        </Box>
                    }
                    
                    <VStack justifyContent={'center'} p = {1}  w = {OptionIcon.type ? justifyIcon == 'start' ?  "82%" : '75%' : '90%'}>
                        <Text color = {fontcolor ? fontcolor : theme.Text.base} fontSize={'md'} >{title ? title : 'Options title'}</Text>
                        {detail && <Text fontSize={'xs'} color = {theme.Text.description} >{detail}</Text>}
                    </VStack>
                    {isChevronEnable && 
                        <Box w = '10%' h = '100%' justifyContent={'center'}>
                            <IconButton
                                icon={
                                    <Icon
                                        as={Entypo}
                                        name='chevron-right'
                                        size={'xl'}
                                    ></Icon>
                            } />
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
