import React,{useContext} from 'react'
import { Box , IconButton ,Icon , HStack , Text , Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import EntypoIcon from 'react-native-vector-icons/Entypo'

interface containerProps {
    title : string
    rightElement : any
    children :any
    Contentfixed : boolean,
    ediable : boolean
}

const Elementnavigation : React.FC <containerProps> = ({title = '' , rightElement = [] , Contentfixed = true , editable = false ,isAction = null}) => {
    const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
  return (
    <HStack safeAreaTop w = '100%' alignItems = "center"  position ={Contentfixed ? 'relative' : 'absolute'}  zIndex={1} justifyContent={'space-between'} pt = {3} pl = {4} pr = {4}>
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
                size = {25}
                color = {theme.Icon.static}
                />
                }
            />
            }  
            </Box>
            <HStack space = {2} alignItems={'center'}>
                {rightElement.length > 0  && 
                !editable &&
                    rightElement.map((item:any , index:number) =>{
                        return(
                            <IconButton
                            key = {index} 
                            onPress={() => item.navigate()}
                            size = 'sm'
                            rounded={'full'}
                            colorScheme={'cyan'}
                            icon = {item.icon}
                            isDisabled = {item.status}
                            />
                        )
                    })         
                }
                { editable && 
                    <Pressable onPress={() => {isAction();}}>
                        {({
                        isHovered,
                        isFocused,
                        isPressed
                        }) => {
                        return(
                            <Text
                            fontSize={'sm'}
                            fontWeight={'normal'}
                            
                            color = {isPressed ? theme.Text.action : isHovered ? theme.Text.action :theme.Text.heading}
                            >save
                            </Text>
                        )
                        }}
                        </Pressable>
                    }
           </HStack>
     </HStack>
  )
}

export default Elementnavigation;