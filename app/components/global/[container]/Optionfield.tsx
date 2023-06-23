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

interface FiledProps {
    isDividerEnable : boolean,
    isChevronEnable : any ,
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
    justifyIcon = 'center',
    fontcolor,
    title , 
    detail , 
    OptionIcon, 
    direction , 
    navigation}) => {
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
            bg = {isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"}
        
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
                                color = 'gray.700'
                            
                                />
                        </Box>
                    }
                    
                    <VStack justifyContent={'center'} p = {1}  w = {OptionIcon.type ? justifyIcon == 'start' ?  "82%" : '75%' : '90%'}>
                        <Text color = {fontcolor && fontcolor} fontSize={'md'}>{title ? title : 'Options title'}</Text>
                        {detail && <Text fontSize={'xs'}>{detail}</Text>}
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
                {isDividerEnable && <Divider/>}
            </VStack>
        )
    }}
    </Pressable>
   
  )
}

export default Optionfield;
