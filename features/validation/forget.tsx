import React,{useContext, useState , useEffect} from 'react'
import { 
Box , 
VStack,
FormControl,
Input,
Text,
} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { WarningOutlineIcon , CheckCircleIcon } from 'native-base'
import Centernavigation from '../../components/navigation/Centernavigation'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native'

interface pageProps {}

const Forget : React.FC <pageProps> = () => {
     const [input ,setInput] = useState<string>("");
     const [Error , setError] = useState<boolean>(false);
     const [isDisable , setDisable] = useState<boolean>(true);
     const theme:any = useContext(ThemeWrapper);
     const db = firestore();
     const navigation = useNavigation();

     const validateEmail = (email : string) => {
          const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return mailformat.test(email)
     };
    
     const onFieldsChange = async (value : string) => {
          setInput(value)

          const checkEmail = db.collection('Users').where('email', '==', input)
          const isemailformatted = validateEmail(input);
          let isExist = false
          let error_message = "Try different from previous email"
 
          if(value.length > 0){
            if (isemailformatted) {
              const getemail = await checkEmail.get();
              if (getemail.docs.length) {
                console.log(`${input} has already in used`);
                isExist = true
              }
            } else {
               isExist = true
               error_message = "Invalid email " + error_message;
            }
          }

          setError(isExist);

          if(value){
               if(!isExist){
                    setDisable(false);
               }else{
                    setDisable(true)
               }
          }else {
               setDisable(true);
          }
     }

     const handleUpdatebyFields = () => {
          if(!input.length > 0 && Error){
               Alert.alert("Error" , "Please Enter correctly Email.")
               return
          }

          try{
               auth().sendPasswordResetEmail(input).then(() => {
                    Alert.alert("Reset Password" , "Send Password Reset successfully Please check your Email.")
                    navigation.navigate("Login")
                  }).catch((error)=>{
                    Alert.alert("Reset Password" , "Failed to send Reset password.")
                  })
          }catch(error){
               console.log("Failed to Reset Password")
          }


     }

  const renderCheckIcon = (field:string) => {
     if(input){
       return(
         <CheckCircleIcon 
           mr = {2}
           color = {Error ? "red.500" : "teal.500"}
         />
       )
     }
   }


  return (
     <Box flex = {1} bg = {theme.Bg.base}>
     <Centernavigation title ={"Forget Password"} onEditcontent ={true} isAction={handleUpdatebyFields} isDisable = {isDisable} ButtonText='reset'/>
          <VStack p ={4} space = {2}>
               <Text color = {theme.Text.heading} pl = {1} fontWeight = {'semibold'}>Email Address</Text>
               <FormControl isInvalid = {Error}>
                  <Input
                  color={theme.Text.base}
                  height={8}
                  borderWidth={1}
                  rounded={'full'}
                  bg = {theme.Bg.container}
                  borderColor={theme.Bg.container}
                  value= {input}
                  placeholder='Enter your email'
                  onChangeText={(e) => onFieldsChange(e)}
                  InputRightElement={renderCheckIcon()}
                  />

                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                         Invalid Email Please try again.
                  </FormControl.ErrorMessage>
                </FormControl>
          </VStack>
     </Box> 

  )
}

export default Forget;