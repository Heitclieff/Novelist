import React, { FC, useState , useContext } from 'react';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import {
  VStack,
  Box,
  FormControl,
  Input,
  Button,
  Text,
  HStack,
} from 'native-base';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import { WarningOutlineIcon } from 'native-base';
import FastImage from 'react-native-fast-image';

interface LoginPageProps {
}


const LoginPage: FC<LoginPageProps> = () => {
  const theme:any = useContext(ThemeWrapper);
  const navigation = useNavigation();
  const [isLoading ,setLoading] = useState<boolean>(false);
  const [getforms , setForms] =  useState<{}>({
      email : "",
      password : "",
  });

  const handleLogin = async () : Promise <T> => {
    setLoading(true);
    try{
      if(!getforms?.email || !getforms?.password){
        console.log("Email or Password doesn't not exists")
        return
      }

      auth().signInWithEmailAndPassword(getforms.email, getforms.password).then((target)=>{
        navigation.navigate("Index")
      }).catch((error)=>{
        let error_message=  "Not founds any Account."

        if(error.code === "auth/invalid-email" && error.code === "auth/wrong-password"){
          error_message = "Not founds any Account."
        }
        else if(error.code === "auth/invalid-email" || error.code === "auth/wrong-password"){
          error_message = "The Email or password is invalid."
        }
        Alert.alert('Error', error_message, [
          {
            text: 'OK',
          },
        ]);
    })
    }catch(error){
      console.log("Failed to Login" , error);
    }
    setLoading(false);
  };


  const getFormsInput = (fields:string , input:string) => {
      setForms((prev) => ({...prev , [fields] : input}));
  }

  return (
    <VStack w="100%" h="100%" p={2} justifyContent="center" alignItems="center" bg = {theme.Bg.base}>
          <Box w = '100%'  h = "25%" overflow ='hidden' rounded = "md" justifyContent=  'center' alignItems=  'center'>
              <FastImage
                id='background-images'
                alt="images"
                source={require("../../assets/logo/Nobelist_icon.png")}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                    width: '40%',
                    height: '70%',
                    opacity : 1,
                    position : 'relative',
                    borderRadius : 50
                }}

              />
            </Box>

          <Box w = '80%' justifyContent={'start'} alignItems={'center'} >
           
            <Text fontSize={'3xl'} fontWeight={'bold'} color = {theme.Text.heading}>Nobelist</Text>
          </Box>

      {getforms &&
        <>
          <FormControl w="80%" mt = {5}>
          <Input
            rounded = "full"
            variant={'filled'}
            color = {theme.Text.base}
            borderColor={theme.Bg.container}
            bg = {theme.Bg.container}
            placeholder="Email address"
            pl = {5}
            value={getforms.email}
            onChangeText={(e) => getFormsInput("email" , e)}
          />
        </FormControl>
        <FormControl w="80%" mt={2}>
          <Input
            variant={'filled'}
            color = {theme.Text.base}
            borderColor={theme.Bg.container}
            bg = {theme.Bg.container}
            pl = {5}
            rounded = "full"
            placeholder="Password"
            secureTextEntry
            value={getforms.password}
            onChangeText={(e) => getFormsInput("password" , e)}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>
        </FormControl>
       </>
      }
     
      <Box w = '80%' mt = {3}>
        <Button 
        isLoading = {isLoading}
        w="100%" 
        rounded = "full"
        bg = {theme.Button.follow.base}  
        _text = {{color : theme.Text.between , fontWeight : 'semibold' }} 
        _pressed={{bg : theme.Button.follow.focused}}
        p = {2} 
        mt={4} 
        isDisabled = {!getforms.email || !getforms.password}
        onPress={handleLogin}>
          Sign in
        </Button>
      </Box>
      
      <HStack w = "80%" h = "50px" alignItems = {"flex-end"} space = {1}>
        <Text color = {theme.Text.description}>Dont't have an account?</Text>
        <Text color = {'teal.500'} onPress= {() => navigation.navigate("Register")}>Sign up</Text>
     
      </HStack>
      <HStack pt=  {5} alignItems={'flex-end'} >
        <Text onPress = {() => navigation.navigate("Forget")} color = {theme.Text.base}>Forget password</Text>
      </HStack>
     

    </VStack>
  );
};

export default LoginPage;
