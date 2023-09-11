import React,{useContext}from 'react'
import { ThemeWrapper } from '../../../../systems/theme/Themeprovider';
import { 
Box , 
Button ,
Text , 
Icon, 
HStack , 
IconButton, 
VStack , 
Divider} from 'native-base'

// import * as Haptics from 'expo-haptics';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import IonIcon from 'react-native-vector-icons/Ionicons'

interface containerProps {
     isLiked : boolean , 
     setisLiked : any,
     bottomspace : number,
}
const Bottomnavigation : React.FC <containerProps> = ({isLiked , setisLiked , bottomspace}) => {
     const theme:any = useContext(ThemeWrapper)
  return (
     <VStack safeAreaBottom w = '100%'  h = {bottomspace}   zIndex={10} position={'absolute'} bottom={0} alignItems={'center'} bg= {theme.Bg.base} space = {2}>
           <Divider bg = {theme.Divider.base} />
           <HStack space = {3} mt = {1}>
            <IconButton
                  size='sm'
                  w='15%'
                  h='9'
                  variant={theme.themeMode === 'dark' ? 'outline' : 'solid'}
                  borderColor={isLiked ? 'red.500' : theme.Icon.base}
                  rounded={'md'}
                //   onPress={() => { setisLiked(!isLiked); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                  icon={
                      <AntdesignIcon
                          size= {15}
                          color={isLiked ? 'red.500' : theme.Icon.base}
                          name={isLiked ? 'heart' : 'hearto'} />}
          />
          <Button
               w = "70%"
               h='9'
               size='sm'
               variant={theme.themeMode === 'dark' ? 'outline' : 'solid'}
               bg={theme.themeMode === 'dark' ? null : 'amber.400'}
               borderColor={'amber.400'}
               leftIcon={
                    <IonIcon
                        size={15}
                        color={theme.themeMode === 'dark' ? 'amber.400' : theme.Text.base}
                        name= 'library-outline' 
                    />}
          >
               <Text fontWeight={'medium'} fontSize={'xs'} color={theme.themeMode === 'dark' ? 'amber.400' : null}>Add to library</Text>
          </Button>    
          
     </HStack>
     </VStack>
   
  )
}

export default Bottomnavigation;