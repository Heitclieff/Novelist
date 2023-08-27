import React,{useContext} from 'react'
import { Box , HStack , Text , IconButton , Icon} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'native-base';
interface containerProps {}
const EditProfilebar : React.FC <containerProps> = () => {
  const theme:any = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <Box
    safeAreaTop
    w = '100%'
    p = {3}

    >
        <HStack w = '100%' alignItems={'center'}>
          <Box w = '15%' justifyContent={'center'} alignItems={'center'}>
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
            
          </Box>
          <Box w = '70%' alignItems={'center'}  >
            <Text
              fontSize={'md'}
              fontWeight={'semibold'}
              color = {theme.Text.heading}
              >   Edit Profile
              </Text>
          </Box>
          <Box w = '15%' justifyContent={'center'}  alignItems = 'center' >
          <Pressable>
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
            )}}
            </Pressable>
        </Box>
        </HStack>
       
    </Box>
  )
}

export default EditProfilebar;
