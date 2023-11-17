import React, { FC, useState } from 'react';
import {
  VStack,
  Box,
  FormControl,
  Input,
  Button,
} from 'native-base';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth'

interface LoginPageProps {
}

const LoginPage: FC<LoginPageProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    auth().signInWithEmailAndPassword(email, password).then(()=>{
        console.log('sign in success')
    }).catch((error)=>{
        console.log('sign in fail', error)
        Alert.alert('Log in fail', 'email or password is incorrect', [
          {
            text: 'OK',
          },
        ]);
    })
  };

  return (
    <VStack w="100%" h="100%" p={2} justifyContent="center" alignItems="center">
      <FormControl w="80%">
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
      </FormControl>
      <FormControl w="80%" mt={2}>
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </FormControl>
      <Button w="80%" mt={4} onPress={handleLogin}>
        Login
      </Button>
    </VStack>
  );
};

export default LoginPage;
