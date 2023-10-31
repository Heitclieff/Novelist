import React,{useContext} from 'react'
import { 
Box,
HStack,
Icon,
Text,
Pressable,
IconButton } from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import Animated from 'react-native-reanimated';

interface contianerProps { 
    title : string,
    onEditcontent : boolean
    transparent : boolean
    Contentfixed : boolean
    // onSave : any
}

const Centernavigation : React.FC <contianerProps> = ({title , onEditcontent = false , transparent = false , Contentfixed = true ,isAction = null}) => {

  const navigation:any  = useNavigation();
  const theme:any = useContext(ThemeWrapper);
  return (
    <Animated.View
      style={[{
      width : '100%', 
      position : Contentfixed ? 'relative' : 'absolute', 
      zIndex: 10 }]
    }>
    <HStack w = '100%'  safeAreaTop position = 'relative' justifyContent={'center'} pl = {4} pr = {4}  pt = {3} pb ={3} bg = {transparent ? 'transparent' : theme.Bg.base }> 
            <Box w = '15%' h = {8} justifyContent='center' alignItems={'center'}>
                {onEditcontent ? 
                    <Pressable onPress={() => navigation.goBack()}>
                    {({
                    isHovered,
                    isFocused,
                    isPressed
                    }) => {
                    return(
                        <Text
                        fontSize={'md'}
                        fontWeight={'medium'}
                        
                        color = {isPressed ? theme.Text.action : isHovered ? theme.Text.action :theme.Text.heading}
                        >cancel
                        </Text>
                    )
                    }}
                    </Pressable>
                :
                    <IconButton 
                        size = 'sm'
                        rounded={'full'}
                        onPress={() =>  navigation.goBack()}
                        icon = {
                            <EntypoIcon
                            name='chevron-left'
                            size={20}
                            color = {theme.Icon.static}
                            />
                        }
                    />
                }
            </Box>
            <Box w = '70%'  alignItems='center' justifyContent='center'>
                <Text fontSize={'md'} fontWeight={'semibold'} color = {transparent ? theme.Text.static : theme.Text.heading}>{title}</Text>
            </Box>
            <Box w = '15%' justifyContent='center' alignItems={'center'} >
            {onEditcontent &&
                <Pressable onPress={() => {isAction(); navigation.goBack()}}>
                {({
                isHovered,
                isFocused,
                isPressed
                }) => {
                return(
                    <Text
                    fontSize={'md'}
                    fontWeight={'medium'}
                    color = {isPressed ? theme.Text.action : isHovered ? theme.Text.action :theme.Text.heading}
                    >save
                    </Text>
                )
                }}
                </Pressable>
                }
            </Box>
          
        </HStack>
    </Animated.View>
  )
}

export default Centernavigation;