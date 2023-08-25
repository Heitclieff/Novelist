import React,{useContext} from "react"
import { Box , HStack ,Text, IconButton  , Icon} from "native-base"
import { AntDesign } from "@expo/vector-icons"
import { ThemeContext } from "../../../../systems/Theme/ThemeProvider"
import { useNavigation } from "@react-navigation/native"

interface containerProps {
     isMenuhidden : boolean
}
const Projectsettingsbar : React.FC <containerProps> = ({isMenuhidden}) => {
     const theme:any = useContext(ThemeContext);
     const navigation = useNavigation();
     
     return(
          <Box
          safeAreaTop
           w=  '100%' 
           pl = {7}
           pr = {4} 
           pt = {4} 
           pb = {4}
          >
          <HStack w = '100%' alignItems={'center'} justifyContent={'space-between'}>
               <Text
               fontSize={'lg'}
               fontWeight={'semibold'}
               color = {theme.Text.heading}
               >Project Settings
               </Text>
               {!isMenuhidden ?
                    <IconButton  
                    bg = {theme.Bg.container}
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
                         color = {theme.Text.base}
                         ></Icon>
                              }
                         />
               : 
               
               <Text color={theme.Text.base}>Save</Text>
               }
            
          </HStack>
          </Box>
     )
}

export default Projectsettingsbar;
