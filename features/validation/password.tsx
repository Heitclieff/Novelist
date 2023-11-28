import React, {useContext, useState} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { 
Box  , 
VStack , 
Input , 
Text,
FormControl} from 'native-base'
import { CheckCircleIcon } from 'native-base'

// @Firestore
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'

interface pageProps {
    userdata : any
    isSecured : boolean
    setSecured : any
    form :any
    setForm :any
    formError :any
    setFormError :any
}   
const ChangePassword : React.FC <pageProps> =({userdata , isSecured , setSecured , form , setForm , formError ,setFormError}) => {
    const theme:any = useContext(ThemeWrapper);

    const ValidatePassword = (current:string) => {
        if(current.length > 6){
            return true
        }
        return false
    }

    const onFieldsChange = async (field:string , value : string) => {
        setForm((prev : any) => ({...prev , [field] : value}));
        let isError =  false;

        if(!ValidatePassword(value)){
            isError = true
        }
        setFormError((prev :any) => ({...prev , [field] : isError}));      
    }
    

  return (
    <VStack pl = {3} pr = {3} space = {2}>
        <Text color = {theme.Text.description} fontSize = 'sm'>your password should have more than 6 letter</Text>
        <VStack space = {2} mt = {5}>
            <Input
            color={theme.Text.base}
            p = {3}
            borderWidth={1}
            rounded={'full'}
            bg = {theme.Bg.container}
            borderColor={theme.Bg.container}
            placeholder='Current password'
            // secureTextEntry={true}
            value= {form.current}
            onChangeText={(e) => onFieldsChange('current' , e)}
            />
            <Input
            color = {theme.Text.base}
            p = {3}
            borderWidth={1}
            rounded={'full'}
            bg = {theme.Bg.container}
            borderColor={theme.Bg.container}
            placeholder='New password'
            // secureTextEntry={true}
            value= {form.new_password}
            onChangeText={(e) => onFieldsChange('new_password' , e)}
            />
            <Input
            color={theme.Text.base}
            p = {3}
            borderWidth={1}
            rounded={'full'}
            bg = {theme.Bg.container}
            borderColor={theme.Bg.container}
            placeholder='Re-enter new password'
            value = {form.confirm_password}
            onChangeText={(e) => onFieldsChange('confirm_password' , e)}
            // secureTextEntry={true}
            />
        </VStack>
</VStack>
  )
}

export default ChangePassword;
