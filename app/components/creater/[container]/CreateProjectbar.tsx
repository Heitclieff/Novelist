import React,{FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Icon,
IconButton,
Button, } from 'native-base'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native'
import { LogBox } from 'react-native'
interface Createprops { 
}

const CreateProjectbar : React.FC <Createprops> = () => {
  const theme:any = useContext(ThemeContext)
  const navigation = useNavigation();
  return  (
    <Box
    safeAreaTop
    w = '100%'
    p = {4}

    >
        <HStack w = '100%' alignItems={'center'} justifyContent={'center'} pl = {2} pr = {2}>
            <Box w = '15%'>
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
            <Box w = '75%'  alignItems={'center'}>
               <Text
               fontSize={'md'}
               fontWeight={'semibold'}
               color = {theme.Text.heading}
               >Project Settings
               </Text>
            </Box>
           
            <Box w = '15%'  justifyContent={'center'} alignItems={'center'}>
            <Text
               fontSize={'sm'}

               color = {theme.Text.description}
               >skip
               </Text>
            </Box>
           
        </HStack>
    </Box>
  )
}

export default CreateProjectbar;