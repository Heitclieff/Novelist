import React, { FC, useState } from 'react';
import {
  VStack,
  Box,
  FormControl,
  Input,
  Button,
} from 'native-base';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
// import * as ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-modern-datepicker';

interface RegisterPageProps {
    // navigation: any;
}

const RegisterPage: FC<RegisterPageProps> = () => {
  const db = firestore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [date ,setDate] = useState('');

  // const lUri = await firestore().collection('Users').doc(uid).get()
  // const options = {
  //     mediaType: 'photo',
  //     maxWidth: 1000,
  //     maxHeight: 1000,
  //     quality: 0.8,
  //     includeBase64: false,
  //   };

  // ImagePicker.launchImageLibrary(options, async (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error:', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button:', response.customButton);
  //     } else {
  //       // Upload image to Firebase Cloud Storage
  //       console.log(response.assets[0].uri)
  //       const storageRef = storage().ref(`images/${uid}/${response.assets[0].uri}`);
        
  //       await storageRef.putFile(response.assets[0].uri);

  //       // Get the download URL of the uploaded image
  //       const downloadUrl = await storageRef.getDownloadURL();

  //       // Update Firestore with the download URL
  //       await firestore().collection('Users').doc(uid).update({
  //         image: downloadUrl,
  //       });

  //       console.log('Image uploaded and URL stored in Firestore:', downloadUrl);
  //     }
  //   });
  const validateEmail = (email) => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email)
  };

  const validateUser = (user) => {
    const userformat = /^[a-zA-Z\u0E00-\u0E7F']+$/u;
    return userformat.test(user)
  }

  const handleRegister = async () => {
    let d_list = date.split('/')
    let newDate = new Date( d_list[0], d_list[1] - 1, d_list[2]);
    const checkUser = db.collection('Users').where('username', '==', username)
    const checkEmail = db.collection('Users').where('email', '==', email)
    const snapCheck = await checkUser.get()
    const snapCheckEmail = await checkEmail.get()
    console.log(snapCheck.docs.length)
    if (username.length < 3) {
      console.log('minimum username is 3 charactors')
    } else if (snapCheck.docs.length > 0 ) {
      console.log('username is already in used')
    } else if (!validateUser(username)) {
      console.log('wrong user format')
    } else if (email.length < 1) {
      console.log('email cannot be empty')
    } else if (!validateEmail(email)) {
      console.log('email is not valid')
    } else if (snapCheckEmail.docs.length > 0) {
      console.log('email is already in used') // this might not nessessary due to create user with auth. its automatically check
    } else if (password.length < 6) {
      console.log('minimun password is 6 charactors')
    } else {
      auth().createUserWithEmailAndPassword(email, password).then((user)=>{
          const curTime = new Date();
          const data = {
              email: email,
              image: 'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/3.jpeg?alt=media&token=356ae7fd-5926-4248-aa06-7879c630deff',
              follower: 0,
              following: 0,
              username: username,
              createAt : curTime,
              birthDate: newDate
              // ...
            };
          db.collection('Users').doc(user.user.uid).set(data).then(()=>{
              console.log('add document success')
          }).catch((error)=>{
              console.log('Error add document',error)
          })
      }).catch((error)=>{
          console.log('Error sign up',error)
      })
    }
    
  };

  return (
    <VStack w="100%" h="100%" p={2} justifyContent="center" alignItems="center">
      <FormControl w="80%">
      <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </FormControl>  
      <FormControl w="80%" mt={2}>
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
      <FormControl>
        {/* <DatePicker
          mode="monthYear"
          selectorStartingYear={2000}
          onMonthYearChange={selectedDate => setDate(selectedDate)}
        /> */}
        <DatePicker
            options={{
              backgroundColor: '#090C08',
              textHeaderColor: '#FFA25B',
              textDefaultColor: '#F6E7C1',
              selectedTextColor: '#fff',
              mainColor: '#F4722B',
              textSecondaryColor: '#D6C7A1',
              borderColor: 'rgba(122, 146, 165, 0.1)',
              dateFormat: 'jDD/jMM/jYYYY',
            }}
            current="2023-07-13"
            selected="2023-07-23"
            mode="calendar"
            minuteInterval={30}
            style={{ borderRadius: 10 }}
            onSelectedChange={(text) => setDate(text)}
          />
      </FormControl>
      <Button w="80%" mt={4} onPress={handleRegister}>
        Register
      </Button>
    </VStack>
  );
};

export default RegisterPage;
