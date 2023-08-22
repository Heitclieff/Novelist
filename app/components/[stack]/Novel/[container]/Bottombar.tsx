import React,{useContext}from 'react'
import { Box , Button ,Text , Icon, HStack , IconButton, VStack} from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import { Divider } from 'native-base';
interface containerProps {
     isLiked : boolean , 
     setisLiked : any,
     bottomspace : number,
}
const Bottombar : React.FC <containerProps> = ({isLiked , setisLiked , bottomspace}) => {
     const theme:any = useContext(ThemeContext)
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
                  onPress={() => { setisLiked(!isLiked); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                  icon={
                      <Icon
                          size='md'
                          as={AntDesign}
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
               leftIcon={<Icon
                    size='md'
                    as={Ionicons}
                    color={theme.themeMode === 'dark' ? 'amber.400' : theme.Text.base}
                    name={'library-outline'} />}
          >
               <Text fontWeight={'medium'} fontSize={'xs'} color={theme.themeMode === 'dark' ? 'amber.400' : null}>Add to library</Text>
          </Button>    
          
     </HStack>
     </VStack>
   
  )
}

export default Bottombar
