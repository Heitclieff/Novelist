import React,{useContext} from 'react'
import { Box , IconButton ,Icon , HStack , Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { RollInLeft } from 'react-native-reanimated';

interface containerProps {
    title : null
    rightElement : any
    children :any
}

const Elementnavigation : React.FC <containerProps> = ({title = null , rightElement = []}) => {
    const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
  return (
    <HStack safeAreaTop w = '100%'  zIndex={1} justifyContent={'space-between'} p = {4}>
         <Box>
            {title ? 
                <Text
                    fontSize={'lg'}
                    fontWeight={'semibold'}
                    color = {theme.Text.heading}
                    >   {title}
                </Text>    
            :     
            
            <IconButton 
            size = 'sm'
            w = {30}
            h = {30}
            rounded={'full'}
            onPress={() =>  navigation.goBack()}
            icon = {
                <EntypoIcon
                name='chevron-left'
                size={30}
                />
            }
        />
        }  
            </Box>
            <HStack space = {2}>
                {rightElement.length > 0 && rightElement.map((item:any , index:number) =>{
                    return(
                        <IconButton
                        key = {index} 
                        onPress={item.navigate}
                        size = 'sm'
                        colorScheme={'cyan'}
                        w = {30}
                        h = {30}
                        icon = {item.icon}
                        />
                    )
                })
                    
                       
                        
                }
           </HStack>
               {/* <IconButton 
                    size = 'md'
                    w = {7}
                    h = {7}
                    onPress={()=> navigation.navigate('Project Settings')}
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
                        color = {'gray.200'}

                        ></Icon>
                    }
                /> */}
     </HStack>
  )
}

export default Elementnavigation;