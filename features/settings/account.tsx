import React,{useEffect , Suspense , useContext} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import {
Box,
VStack,
HStack,
Center,
Text,
Divider,
Button,
Input,
 } from 'native-base'
import { Image , Alert} from 'react-native'
import { FlatList } from '../../components/layout/Flatlist/FlatList'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getuserData } from '../../systems/redux/action'
import { useNavigation } from '@react-navigation/native'
//@Components
import Editfield from '../../components/field/Editfiled'
import Centernavigation from '../../components/navigation/Centernavigation'

//@Firestore
import auth from '@react-native-firebase/auth'
interface Pageprops {}

const Memorizednavigation = React.memo(Centernavigation);
const MemoriedEditfield = React.memo(Editfield);

const AccountSettings : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const navigation = useNavigation();
  const userdata = useSelector((state:any) => state.userData)

  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  const LogoutAlert = () => 
  Alert.alert('Sign out', 'Areu you sure to Sign out?', [
       {
            text: 'cancel',
            style: 'cancel',
       },
       {text: 'Sign out', onPress: () =>  Logout()},
  ]);


  const MenuOptions = [{
    title : 'Username' , 
    value : userdata[0].username,
  },
  {
    title : 'Phone',
    value : userdata[0].phone,
  },
  // {
  //   title : 'Email',
  //   value : userdata[0].email,
  // },
  {
     title : 'Password',
     value : 'Change Password',
   },
  ]

  const Logout = async () => {
    try{
      await auth().signOut()
      navigation.navigate("Login")
    }catch(error){
      console.log("ERROR: faied to sign Out" ,error)
    }

  }
 
  useEffect(() => {
    // if(!isReduxLoaded) dispatch(getuserData());
  },[userdata])

  return (
    <Box flex = {1} bg = {theme.Bg.base}>
      <Memorizednavigation title= 'Account' onEditcontent = {false} />
      <FlatList>
        <VStack flex = {1} mt = {1}  space = {3}> 
            <VStack >          
               <Suspense  fallback = {<Box>Loading..</Box>}>       
               {MenuOptions.map((items , key) => 
               <VStack space = {1}  key=  {key}>
                    <MemoriedEditfield  
                    inputColor = {theme.Text.description}
                    inputStyle = {'space-between'} 
                    options = {items}/>
               </VStack>
               )}
               </Suspense>    
            </VStack>
            <Box p = {5}>
               <Button size={'sm'} rounded={'full'}  variant={'outline'} borderColor={'red.500'} onPress=  {LogoutAlert}>
                    <Text color={'red.500'} fontSize={'xs'}>Sign out</Text>        
               </Button>
            </Box>
        </VStack>
      </FlatList>
      
    </Box>
  )
}


export default AccountSettings;