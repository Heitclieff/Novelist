import React,{useContext} from 'react'
import { Box , IconButton ,Icon , HStack , Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { RollInLeft } from 'react-native-reanimated';

interface containerProps {
    title : string
    rightElement : any
    children :any
    Contentfixed : boolean
}

const Elementnavigation : React.FC <containerProps> = ({title = '' , rightElement = [] , Contentfixed = true}) => {
    const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
  return (
    <HStack safeAreaTop w = '100%' position ={Contentfixed ? 'relative' : 'absolute'}  zIndex={1} justifyContent={'space-between'} pt = {3} pl = {4} pr = {4}>
         <Box >
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
            rounded={'full'}
            onPress={() =>  navigation.goBack()}
            icon = {
                <EntypoIcon
                name='chevron-left'
                size = {20}
                color = {theme.Icon.static}
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
                        onPress={() => item.navigate()}
                        size = 'sm'
                        rounded={'full'}
                        colorScheme={'cyan'}
                        icon = {item.icon}
                        />
                    )
                })         
                }
           </HStack>
     </HStack>
  )
}

export default Elementnavigation;