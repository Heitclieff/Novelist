import React, { FC, useState , useContext } from 'react';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import {
VStack,
Box,
Text,
FormControl,
Input,
Button,
HStack,
Modal,
IconButton,
} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { CheckCircleIcon , WarningIcon , WarningOutlineIcon } from 'native-base';
import { FormsHeader } from './assets/forms';
import { Keyboard } from 'react-native';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'


// import * as ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-modern-datepicker';

interface RegisterPageProps {
    // navigation: any;
}

const RegisterPage: FC<RegisterPageProps> = () => {
  const theme:any = useContext(ThemeWrapper);
  const db = firestore()
  const [onDatapickerOpen , setDatapickerOpen] = useState(false);
  const [Signup ,setSignup] = useState(false)
  const [isLoading , setisLoading] = useState(false);

  const currentDate = new Date(); 
  const isoString = currentDate.toISOString();
  const formattedDate = isoString.split('T')[0];

  const [registerFormsError, setregisterFormsError] = useState({
    username : "Try different from previous username.",
    email : 'Try different from previous email.',
    password : "Try different from previous password.",
    BirthDate : " ",
  })

  const [registerFormsStatus , setRegisterFormsStatus] = useState({
    username : false , 
    email :false , 
    password : false,
    BirthDate : false,
  })

  const [registerForms, setRegisterForms] = useState({
    username : "",
    email : "",
    password : "",
    BirthDate : "" ,
  });

  const [date ,setDate] = useState('');

  const navigation = useNavigation();

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


  const ValidateRegister = async (filed:string , input:string) => {
      setRegisterForms((prev) => ({...prev, [filed] : input}));
      
      if(filed === "username"){
        const checkUser = db.collection('Users').where('username', '==', input);
        const getuser =  await checkUser.get()
        let isExist = false
        
        if(getuser.docs.length){
          console.log(`${input} has already Exists`);
          isExist = true
        }
        setRegisterFormsStatus((prev) => ({...prev , [filed] : isExist}))
        
      }else if (filed === 'email'){
         const checkEmail = db.collection('Users').where('email', '==', input)
         const isemailformatted = validateEmail(input);
         let isExist = false
         let error_message = "Try different from previous email"

         if(input.length > 0){
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
         setregisterFormsError((prev) => ({...prev , [filed] : error_message}))
         setRegisterFormsStatus((prev) => ({...prev , [filed] : isExist}))
      
        //
      }else if (filed === 'password'){
        let isSecured = true;
        let error_message = "Try different from previous password";

        if(input.length > 0){
            if(input.length > 6){
                isSecured = false;
            }else{
              error_message = "password not enough secured";
            }
        }else{
          isSecured = false
        }
       
        setregisterFormsError((prev) => ({...prev , [filed] : error_message}))
        setRegisterFormsStatus((prev) => ({...prev , [filed] : isSecured}))
      }else if (filed === "BirthDate"){
        Keyboard.dismiss();
        setDatapickerOpen(false);

        if(registerForms.email && registerForms.username && registerForms.password){
          if(!registerFormsStatus.email && !registerFormsStatus.username && !registerFormsStatus.password){
            setSignup(true)
          }
        }

      }

      if(registerForms.email && registerForms.username && registerForms.password && registerForms.BirthDate){
        if(!registerFormsStatus.email && !registerFormsStatus.username && !registerFormsStatus.password && !registerFormsStatus.BirthDate){
          setSignup(true)
        }
      }
  }

  

  const handleRegister = async () => {
    try{
      setisLoading(true);
      const birthDateParts = registerForms.BirthDate.split('/');
      const formattedDate = `${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}`;
      const selectedDate = new Date(formattedDate);

      const timestamp = firestore.Timestamp.fromDate(selectedDate);

      const authRef = await auth().createUserWithEmailAndPassword(registerForms.email, registerForms.password)
      
      if(!authRef.user?.uid){
        console.log("Cannot register this user")
        return 
      }
      
      const Newdata = {
        username: registerForms.username,
        email: registerForms.email,
        bg_image: 'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/3.jpeg?alt=media&token=356ae7fd-5926-4248-aa06-7879c630deff',
        pf_image : 'https://firebasestorage.googleapis.com/v0/b/novel-app-test.appspot.com/o/3.jpeg?alt=media&token=356ae7fd-5926-4248-aa06-7879c630deff',
        description : "",
        favorite : [],
        post_like : [],
        project : [],
        followlist : [],
        follower: 0,
        following: 0,
        notification : 0,
        phone : "",
        createAt : firestore.FieldValue.serverTimestamp(),
        birthDate: selectedDate,
        message_token : "",
      };
      
      db.collection('Users').doc(authRef.user.uid).set(Newdata).then(()=>{
          navigation.navigate("Index");
          console.log('add document success')
      }).catch((error)=>{
          console.log('Error add document',error)
      })
    }catch(error){
      console.log("ERROR: faied to Register" ,error)
    }
    setisLoading(false)
  };

  return (
    <VStack w="100%" h="100%" p={2} alignItems="center" bg = {theme.Bg.base}>
      
      <HStack safeAreaTop w = '100%' h = {"80px"}  position = 'relative'  alignItems={'flex-end'} >
      <IconButton 
            zIndex = {10}
            ml = {3}
            position=  'absolute'
            size = 'sm'
            rounded={'full'}
            onPress={() =>  navigation.goBack()}
            icon = {
                <EntypoIcon
                name='chevron-left'
                size = {20}
                color = {theme.Icon.static}
                />
                }
          />
        <Text
        position = 'absolute' 
        w = '100%'
        textAlign={'center'}
        fontSize={'xl'} 
        fontWeight={'bold'} 
        color = {theme.Text.heading}>
          Nobelist
        </Text>
      </HStack>

      <Box w = '85%' pt = {7}>
        <Text color = {theme.Text.base} fontSize=  '2xl' fontWeight={"bold"} >Create Your Account</Text>
      </Box>
      {registerForms &&
        <VStack w='85%' pt={3} justifyContent={'center'} alignItems={'center'} space={3}>
          {FormsHeader?.map((item:any ,index:number) => {
            return(
              <FormControl key = {index} w="100%" alignItems={'center'} isInvalid = {registerFormsStatus[item.fieldname]}>
                <Input
                  onPressIn = {() => item.fieldname === "BirthDate" && setDatapickerOpen(true)}
                  variant={'underlined'}
                  placeholder= {item.placeholder}
                  borderColor={theme.Text.description}
                  placeholderTextColor={theme.Text.description}
                  color={theme.Text.base}
                  value={registerForms[item.fieldname]}
                  onChangeText={(e) => ValidateRegister(item.fieldname , e)}

                  InputRightElement={ 
                    registerForms[item.fieldname] ?
                        !registerFormsStatus[item.fieldname] ?
                          <CheckCircleIcon 
                            color = 'teal.500'
                            mr = {1}
                          />
                          :
                          <WarningIcon 
                          color = 'red.500'
                          mr = {1}
                          />
                    : 
                    null
                  }
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {registerFormsError[item.fieldname]}
              </FormControl.ErrorMessage>

            </FormControl>
            )
          })
        
        }   

            {onDatapickerOpen &&
              <Modal isOpen={onDatapickerOpen} onClose={() => {setDatapickerOpen(false); Keyboard.dismiss()}}>
              <Modal.Content >
                <Modal.Body  p = {0}>
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

                      mode = "calendar"
                      current= {registerForms.BirthDate}
                      selected={registerForms.BirthDate ? registerForms.BirthDate : formattedDate}
                      onDateChange = {(e) => ValidateRegister("BirthDate" , e)}
                      /> 
                </Modal.Body>
              </Modal.Content>
            </Modal>   
             }
            <Button 
              w="100%" 
              isLoading = {isLoading}
              rounded = "full"
              onPress = {handleRegister}
              isDisabled = {!Signup}
              bg = {theme.Button.follow.base}  
              _text = {{color : theme.Text.between , fontWeight : 'semibold' }} 
              p = {2} 
              mt={5} 
              >
            Sign up
          </Button>
         </VStack>
      }
    </VStack>
  );
};

export default RegisterPage;