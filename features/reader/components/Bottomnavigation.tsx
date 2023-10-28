import React,{useContext}from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
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
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'

interface containerProps {
     isLiked : boolean , 
     setisLiked : any,
     setisMyOwn : any,
     bottomspace : number,
     myBook : boolean
}
const Bottomnavigation : React.FC <containerProps> = ({isLiked , setisLiked , bottomspace, myBook , setlibrary}) => {
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
               onPress = {setlibrary}
               variant={theme.themeMode === 'dark' ? 'outline' : 'solid'}
               bg={theme.themeMode === 'dark' ? myBook ? 'amber.400' : null :  'amber.400'}
               borderColor={'amber.400'}
               opacity={myBook ? theme.themeMode === 'dark' ?   0.9 : 0.5 : 1}
               leftIcon={
                    myBook? 
                         <EntypoIcon
                         size={15}
                         color={'green'}
                         name= {'check'}
                         />
                         :
                         <IonIcon
                         size={15}
                         color={theme.themeMode === 'dark' ? '#fbbf24' : 'black'}
                         name= {'library-outline' }
                    />}
          >
               <Text fontWeight={'medium'} fontSize={'xs'} color={theme.themeMode === 'dark' ? myBook ? 'black' :'amber.400' : null}>{!myBook ? `Add to Library`: `On Your Library`}</Text>
          </Button>    
          
     </HStack>
     </VStack>
   
  )
}

export default Bottomnavigation;