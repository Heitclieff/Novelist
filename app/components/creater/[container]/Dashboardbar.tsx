import React from 'react'
import { Box , IconButton ,Icon , HStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { Entypo , AntDesign } from '@expo/vector-icons';

interface containerProps {
}

const Dashboardbar : React.FC <containerProps> = ({}) => {
     const navigation = useNavigation();
  return (
    <HStack safeAreaTop w = '100%' position={'absolute'} zIndex={1} justifyContent={'space-between'} pl = {3} pr = {3}>
         <Box>
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
          <HStack space = {2}>
               <IconButton 
                    size = 'md'
                    w = {7}
                    h = {7}
                    onPress={()=> navigation.openDrawer()}
                    rounded={'full'}
                    icon = {
                        <Icon
                        as={AntDesign}
                        name='setting'
                        size={5}
                        color = {'coolGray.300'}
                        ></Icon>
                    }
                />
                 <IconButton 
                    bg = 'gray.300'
                    size = 'md'
                    w = {7}
                    h = {7}
                    onPress={()=> navigation.openDrawer()}
                    rounded={'full'}
                    icon = {
                        <Icon
                        as={AntDesign}
                        name='appstore-o'
                        size={4}
                        color = {'coolGray.800'}
                        ></Icon>
                    }
                />
          </HStack>
     </HStack>
  )
}

export default Dashboardbar;