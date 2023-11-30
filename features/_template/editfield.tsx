import React,{useContext , useState} from 'react'
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { 
Box, 
VStack , 
Text, 
Input, 
Button,
FormControl
} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import Centernavigation from '../../components/navigation/Centernavigation'

// @Components
import { updateUserField } from '../../systems/redux/action';
import DatePicker from 'react-native-modern-datepicker';
import { CheckCircleIcon , WarningOutlineIcon } from 'native-base';
import ChangePassword from '../validation/password';

// @Redux toolkits
import { setUser } from '../../systems/redux/action';
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

//@firebase
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


interface Pageprops {

}
const Editfield : React.FC <Pageprops> =() => {
  const navigation:any  = useNavigation();

  const route = useRoute()
  const db = firestore();

  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)
  const {options}:any = route.params  
  const theme:any = useContext(ThemeWrapper);

  const [input ,setInput] = useState<string>(options.value)
  const [Error , setError] = useState<boolean>(false);
  const [errorMassage , setErrorMassage] = useState<string>("");

  const [formError ,setFormError]   =useState<any>({
    current : false,
    new_password : false,
    confirm_password : false
  })
  const [form , setForm] = useState<any>({
      current : "",
      new_password : "",
      confirm_password:  "",
  }) 

  const [curPass ,setcurPass] = useState<string>('')
  const [newPass ,setnewPass] = useState<string>('')
  const [renewPass ,setrenewPass] = useState<string>('')
  
  // console.log('editfield',userdata[0].id)
  // console.log('option',options)
  // console.log('editfield input',input)

   
  const onFieldsChange = async (field:string , value : string) => {
    setInput(value);
    let isExist = false
    let error_massage = "";


    if(field === "Username"){
      error_massage = "Try different from previous username.";
      if(value){
        if(value === userdata[0].username){
          return;
        }
        const result = await db.collection("Users")
        .where('username' ,'==' , value)
        .get();

        if(result.docs?.length){
            isExist = true;
        } 
    }

  }else if (field === "Phone"){
      error_massage = "Try different from Phone number.";
      const format = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

      if(value){
        if(!format.test(value)){
          isExist = true
        }
      }
    }

    setError(isExist)
    setErrorMassage(error_massage);
  }

  const handleUpdatebyFields = async (field:string) => {
    let fieldname  = ""
    if(!input.length > 0){
        Alert.alert(options.title , `should have more than 1 letter.`);
        return
    }

    const db_connect = db.collection("Users").doc(userdata?.[0].id)
    try{
      if(field === "Username"){
        fieldname  = 'username'
        const isUpdated =  await db_connect.update({username : input});
        console.log("Success", isUpdated);
      }else if (field === "description"){
        const isUpdated = await db_connect.update({description : input});
        console.log("Success" , isUpdated)

      
      }else if (field === "Birthdate"){
        fieldname  = 'birthDate'
        const birthDateParts = input.split('/');
        const formattedDate = `${birthDateParts[0]}-${birthDateParts[1]}-${birthDateParts[2]}`;
        const selectedDate = new Date(formattedDate)

        const timestamp = firestore.Timestamp.fromDate(selectedDate);
        const isUpdated = await db_connect.update({birthDate : timestamp});
        console.log("Success" , isUpdated)

      }else if (field === "Phone"){
        fieldname  = 'phone'
        const isUpdated =  await db_connect.update({phone : input});
        console.log("Success" , isUpdated)

      }else if(field === 'Password'){
        if(formError.current && formError.new_password && formError.confirm_password){
          Alert.alert("Password" , "should have more than 6 letter.")
          return
        }
        const user = auth().currentUser;
        const credential = await auth.EmailAuthProvider.credential(userdata?.[0].email , form.current);
        try{
          const reauth = await user?.reauthenticateWithCredential(credential)
          
          if(form.new_password !== form.confirm_password){
            Alert.alert("Password" , "your password do not match.")
            return
          }
          const isupdate  = await user?.updatePassword(form.new_password)        
        }catch(error){
            Alert.alert("Password" , "Not found any user with your password")
            return
        }
      }

      if(fieldname){
        dispatch(setUser([{...userdata[0] , [fieldname] : input}]));
      }
      navigation.goBack();
    }catch(error){
      console.log("ERROR: failed to update Users" , error);
    }
  } 

  const renderCheckIcon = (field:string) => {
    const isShow = !options.optional;
    if(isShow && input){
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
            <Centernavigation title ={options.title} onEditcontent ={true} isAction={handleUpdatebyFields} isDisable = {Error}/>
            <VStack p ={4} space = {2}>
                <Text pl = {2} color={theme.Text.description} fontSize={'xs'} fontWeight={'semibold'}>{options.title}</Text>
                {options.title === "Birthdate" ?
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
                     current= {input}
                     selected= {input}
                     mode="calendar"
                     minuteInterval={30}
                     style={{ borderRadius: 10 }}
                     onSelectedChange={(e) => onFieldsChange(options.title, e)}
                   />
                :
                options.title === "Password" ? 

                <ChangePassword 
                userdata=  {userdata} 
                isSecured = {Error} 
                setSecured = {setError}
                form = {form}
                setForm = {setForm}
                formError = {formError}
                setFormError = {setFormError}
                /> 
                :

                <FormControl isInvalid = {Error}>
                  <Input
                  color={theme.Text.base}
                  height={8}
                  borderWidth={1}
                  rounded={'full'}
                  bg = {theme.Bg.container}
                  borderColor={theme.Bg.container}
                  value= {input}
                  onChangeText={(e) => onFieldsChange(options.title , e)}
                  InputRightElement={renderCheckIcon()}
                  />

                  <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {errorMassage}
                  </FormControl.ErrorMessage>
                </FormControl>
                }      
            </VStack>
      </Box>
    )
}

export default Editfield;