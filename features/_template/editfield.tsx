import React,{useContext , useState} from 'react'
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native';
import { Box, VStack , Text, Input, Button} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import Centernavigation from '../../components/navigation/Centernavigation'

import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { updateUserField } from '../../systems/redux/action';
import DatePicker from 'react-native-modern-datepicker';

//firebase
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'


interface Pageprops {

}
const Editfield : React.FC <Pageprops> =() => {
  const navigation:any  = useNavigation();
  const route = useRoute()
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)
  const {options}:any = route.params  
  const theme:any = useContext(ThemeWrapper);
  const [input ,setInput] = useState<string>(options.value)
  const [curPass ,setcurPass] = useState<string>('')
  const [newPass ,setnewPass] = useState<string>('')
  const [renewPass ,setrenewPass] = useState<string>('')
  
  // console.log('editfield',userdata[0].id)
  // console.log('option',options)
  // console.log('editfield input',input)
  const handleSave = async () => {
    const parts = input.split('/');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const dateObject = new Date(year, month, day);
    const referenceDate = new Date("1970-01-01");
    const difference = dateObject - referenceDate;

    const seconds = Math.floor(difference / 1000);
    const nanoseconds = (difference % 1000) * 1e6;

    // Create the duration object
    const duration = { "nanoseconds": nanoseconds, "seconds": seconds };
    // console.log('duration',duration);
    // console.log("Timestamp:", newDate);
    const uid = userdata[0].id
    const userDocRef = firestore().collection('Users').doc(uid)
    const updateUserData = (field, value, successMessage, errorMessage) => {
      if (options.title === 'Username') {
        userDocRef.update({ [field]: value }).then(()=>{
          const scoreCollectionRef = firestore().collection('Scores');  //pass
          const scoreDocRef = scoreCollectionRef.doc(uid)
          scoreDocRef.update({ [field]: value }).then(async() => {
            const userData = await userDocRef.get()
            let project = userData.data().project
            project.forEach(doc => {
              console.log(doc)
              const novelDocRef = firestore().collection('Novels').doc(doc) //pass
              const creatorRef = novelDocRef.collection('Creator').doc(uid)
              creatorRef.update({ [field]: value }).then(()=>{
                dispatch(updateUserField(field,value));
                
              })
            });
            Alert.alert('Saved', `${field}: ${value}`, [
              {
                text: 'OK',
                onPress: () => {
                  // navigation.goBack();
                },
              },
            ]);
          })
        })
        

      } else {
        dispatch(updateUserField(field,value));
        userDocRef.update({ [field]: value }).then(() => {
            Alert.alert('Saved', `${field}: ${value}`, [
              {
                text: 'OK',
                onPress: () => {
                  // navigation.goBack();
                },
              },
            ]);
          })
          .catch((error) => {
            console.error(`Error updating ${field}:`, error);
            Alert.alert('Error', errorMessage, [
              {
                text: 'OK',
              },
            ]);
          });
      }
      
    };
  
    if (options.title === 'Username') {
      updateUserData('username', input, 'Username updated', 'Error updating username');
    } else if (options.title === 'description') {
      updateUserData('description', input, 'Description updated', 'Error updating description');
    } else if (options.title === 'Birthdate') {
      updateUserData('birthDate', dateObject, 'Birthdate updated', 'Error updating birthdate');
    } else if (options.title === 'Phone') {
      updateUserData('phone', input, 'Phone updated', 'Error updating phone');
    } else if (options.title === 'Password') {
      const user = auth().currentUser;
      const credential = auth.EmailAuthProvider.credential(userdata[0].email, curPass);
      try{
        user.reauthenticateWithCredential(credential).then(() => {
          if (newPass === renewPass && newPass != '') {
            user.updatePassword(newPass).then(() => {
                Alert.alert('Password Updated', 'Password has been updated successfully', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ]);
              })
              .catch((error) => {
                console.error('Error updating password:', error);
                Alert.alert('Error', 'Error updating password', [
                  {
                    text: 'OK',
                  },
                ]);
              });
          } else {
            Alert.alert('Password Mismatch Or Empty', 'New passwords do not match or empty', [
              {
                text: 'OK',
              },
            ]);
          }
        })
        .catch((error) => {
          console.error('Error reauthenticating user:', error);
          Alert.alert('Error', 'Error reauthenticating user', [
            {
              text: 'OK',
            },
          ]);
        });
      } catch (error) {
        console.error('An error occurred:', error.message);
        Alert.alert('An error occurred:', error.message, [
          {
            text: 'OK',
          },
        ]);
      }
      
    }
  };
  if (options.title === 'Birthdate') {
    return (
      <Box flex = {1} bg = {theme.Bg.base}>
          <Centernavigation title ={options.title} onEditcontent ={true} isAction={handleSave} />
          <VStack p ={4} space = {2}>
              <Text pl = {2} color={theme.Text.description} fontSize={'xs'} fontWeight={'semibold'}>{options.title}</Text>
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
                onSelectedChange={(text) => setInput(text)}
              />
          </VStack>
      </Box>
    )
  } else if (options.title === 'Password') {
    return (
      <Box flex = {1} bg = {theme.Bg.base}>
            <Centernavigation title ={options.title} onEditcontent ={true} isAction={handleSave} />
            <VStack p ={4} space = {2}>
                <Text pl = {2} color={theme.Text.description} fontSize={'xs'} fontWeight={'semibold'}>{options.title}</Text>
                <Input
                color={theme.Text.base}
                height={8}
                borderWidth={1}
                rounded={'full'}
                bg = {theme.Bg.container}
                borderColor={theme.Bg.container}
                value= {curPass}
                onChangeText={(text) => setcurPass(text)}
                placeholder='Current password'
                // secureTextEntry={true}
                />
                <Input
                color={theme.Text.base}
                height={8}
                borderWidth={1}
                rounded={'full'}
                bg = {theme.Bg.container}
                borderColor={theme.Bg.container}
                value= {newPass}
                onChangeText={(text) => setnewPass(text)}
                placeholder='New password'
                // secureTextEntry={true}
                />
                <Input
                color={theme.Text.base}
                height={8}
                borderWidth={1}
                rounded={'full'}
                bg = {theme.Bg.container}
                borderColor={theme.Bg.container}
                value= {renewPass}
                onChangeText={(text) => setrenewPass(text)}
                placeholder='Re-enter new password'
                // secureTextEntry={true}
                />
            </VStack>
      </Box>
    )
  } else {
    return (
      <Box flex = {1} bg = {theme.Bg.base}>
            <Centernavigation title ={options.title} onEditcontent ={true} isAction={handleSave} />
            <VStack p ={4} space = {2}>
                <Text pl = {2} color={theme.Text.description} fontSize={'xs'} fontWeight={'semibold'}>{options.title}</Text>
                <Input
                color={theme.Text.base}
                height={8}
                borderWidth={1}
                rounded={'full'}
                bg = {theme.Bg.container}
                borderColor={theme.Bg.container}
                value= {input}
                onChangeText={(text) => setInput(text)}
                />
            </VStack>
      </Box>
    )
  }
}
export default Editfield;