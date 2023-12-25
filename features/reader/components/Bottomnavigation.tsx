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

import { CheckCircleIcon } from 'native-base';
// import * as Haptics from 'expo-haptics';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

interface containerProps {
     isLiked : boolean ,
     isLoading : boolean, 
     setisLiked : any,
     setisMyOwn : any,
     bottomspace : number,
     myBook : boolean
     setlibrary : any

     comment_status : boolean
     handleCommentButton : any
}
const Bottomnavigation : React.FC <containerProps> = ({isLiked , setisLiked , bottomspace, myBook , isLoading , setlibrary , handleCommentButton , comment_status}) => {
     const theme:any = useContext(ThemeWrapper)
  return (
     <VStack safeAreaBottom w = '100%'  h = {bottomspace}   zIndex={10} position={'absolute'} bottom={0} alignItems={'center'} bg= {theme.Bg.base} space = {2}>
           <Divider bg = {theme.Divider.base} />
           <HStack space = {3} mt = {1} pl = {2} pr = {2}>
            <IconButton
               w=  "35px"
               h =  "35px"
               size='sm'
               _pressed={{ bg : '#ef4444'}}
               bg = {isLiked ? '#ef4444' : theme.Bg.base}
               rounded={'full'}
               onPress={() => { setisLiked(!isLiked);}}
               icon={
                    <AntdesignIcon
                         size= {15}
                         color={isLiked ? 'white' : theme.Icon.base}
                         name={isLiked ? 'heart' : 'hearto'} />}
          />

          <IconButton 
               w=  "35px"
               h =  "35px"
               isDisabled = {!comment_status}
               size = 'sm'
               rounded={'full'}
               onPress={handleCommentButton}
               icon = {
                    <FontAwesome5Icon 
                    size = {15}
                    color = {theme.Icon.base}
                    name = {'comment-alt'}/>}
          />

          <Box w = "70%" alignItems={'center'}>
               <Button
                    w = "100%"
                    isLoading = {isLoading}
                    _spinner={{color : 'amber.500'}}
                    _pressed={{ bg : 'amber.500'}}
                    size='sm'
                    rounded={'full'}
                    onPress = {setlibrary}
                    variant={theme.themeMode === 'dark' ? 'outline' : 'solid'}
                    bg={theme.themeMode === 'dark' ? myBook ? 'amber.400' : null :  'amber.400'}
                    borderColor={'amber.400'}
                    opacity={myBook ? theme.themeMode === 'dark' ?   0.9 : 0.5 : 1}
                    
                    rightIcon={
                         myBook? 
                              <CheckCircleIcon
                              size={"20px"}
                              color={theme.Bg.base}
                              />
                              :
                              <CheckCircleIcon
                              size={"20px"}
                              color={theme.themeMode === 'dark' ? '#fbbf24' : 'black'}
                         />}
               >
                    <Text fontWeight={'medium'} mr  = {2} fontSize={'sm'} color={theme.themeMode === 'dark' ? myBook ? 'black' :'amber.400' : null}>{!myBook ? `Add to Library`: `On Your Library`}</Text>
               </Button>    
          </Box>
          
          
     </HStack>
     </VStack>
   
  )
}

export default Bottomnavigation;