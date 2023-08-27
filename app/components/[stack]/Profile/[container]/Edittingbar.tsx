import React,{useContext} from 'react'
import { Box , HStack , Text , IconButton , Icon} from 'native-base';
import { AntDesign , Entypo} from '@expo/vector-icons';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'native-base';
interface containerProps {
  title : string
  rightButtonEnable : boolean
}


const Edittingbar : React.FC <containerProps> = ({title , rightButtonEnable = true}) => {
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
          <IconButton 
                    size = 'sm'
                    w = '30'
                    h = {30}
                    rounded={'full'}
                    onPress={() =>  navigation.goBack()}
                    icon = {
                        <Icon
                        as={Entypo}
                        name='chevron-left'
                        size={'xl'}
                        color = {'coolGray.300'}
                        ></Icon>
                    }
                />
          </Box>
          <Box w = '70%' alignItems={'center'}  >
            <Text
              fontSize={'md'}
              fontWeight={'semibold'}
              color = {theme.Text.heading}
              >{title}
              </Text>
          </Box>
         
          <Box w = '15%' justifyContent={'center'}  alignItems = 'center' >
          {rightButtonEnable && 
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
          }
         
        </Box>
        </HStack>
       
    </Box>
  )
}

export default Edittingbar;
