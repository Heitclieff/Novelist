import React,{useEffect , Suspense , useRef , useCallback , useMemo} from 'react'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { useContext, useState } from 'react'
import {
Box,
Button,
VStack,
HStack,
Center,
Text,
Divider,
Input,
Pressable
 } from 'native-base'
import FastImage from 'react-native-fast-image'
 
import { Image, Platform , TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { FlatList } from '../../components/layout/Flatlist/FlatList'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
 //@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { getuserData, setUser } from '../../systems/redux/action'
import { BottomSheetModalProvider , BottomSheetModal} from '@gorhom/bottom-sheet'

// @Firestore
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'

//@Components
const LazyAvatarfield  = React.lazy(() =>import('../../components/field/Avatarfield'));
import Centernavigation from '../../components/navigation/Centernavigation'
import Editfield from '../../components/field/Editfiled'
import Photochoice from '../../components/layout/Modal/Photochoice'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
interface Pageprops {}

const Memorizednavigation = React.memo(Centernavigation);
const MemorizedAvatarfield = React.memo(LazyAvatarfield);
const MemorizedEditfield = React.memo(Editfield);

const Editprofile : React.FC <Pageprops> = () => {
  const theme:any = useContext(ThemeWrapper);
  const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const userdata = useSelector((state:any) => state.userData)

  const [currentProfile ,setCurrentProfile] = useState<[]>(userdata?.[0]);
  const [uploadField , setUploadField] = useState<string>("");
  const navigation = useNavigation();
  const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '25%'], []);
 
  const handlePresentModalPress = useCallback((props:string) => {
    bottomSheetModalRef.current?.present();
    setUploadField(props)
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const reference = storage()
  const db = firestore();
  // const [isEdit, setisEdit] = useState<Boolean>(true)

  const TimeConvert = (timestamp) => {
    if(timestamp){
      const birth =new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
      const isoString = birth.toISOString();
      const formattedDate = isoString.split('T')[0];
    
      // setformattedDate({createAt : formattedDateCreateAt , lastupdated : formattedDatelastupdate});
      return formattedDate
    }
  }
  

  const getdeviceLibrary =  async () => {
    const result =  await launchImageLibrary({
      presentationStyle : 'formSheet',
      mediaType : 'photo' ,
      maxWidth : 300 , 
      maxHeight : 400
    });

    if(result){
      UploadPhotos(result);
    }
  }

const getPhotos = async () => {
    const result =  await launchCamera({
      mediaType : 'photo',
      maxWidth : 300 , 
      maxHeight : 400
    })

    if(result){
      UploadPhotos(result);
    }
}

const UploadPhotos =  async (result:any) => {
    try{
      const result_assets : any = result.assets[0];
      const reference_path = `user-image/${result_assets.fileName}`

      const upload_result = await reference
      .ref(reference_path)
      .putFile(result_assets.uri);
      
      console.log(upload_result.state , `to upload ${result_assets.fileName}`);

      if(upload_result.state === "success"){
        const downloadURL = await reference.ref(reference_path).getDownloadURL();
        
        const NewProfile = {...currentProfile , [uploadField] : downloadURL};
        
        setCurrentProfile(NewProfile);
        const update_result  = await db
        .collection("Users")
        .doc(userdata?.[0].id)
        .update({
          [uploadField] : downloadURL
        });
  
        dispatch(setUser([{...NewProfile}]));
        console.log("Dowload URL" , downloadURL);
        console.log(`update ${userdata?.[0].username} profile success`);
      }
    }catch(error){
      console.log("failed to get Image from device" ,error.message);
    }
  }

  const MenuOptions = [{
    title : 'Username' , 
    value : userdata[0].username,
    optional : false,
  },
  {
    title : 'description',
    value : userdata[0].description,
    height : '20',
    optional : true,
  },
  {
    title : 'Birthdate',
    value : TimeConvert(userdata[0].birthDate),
    optional : false,
  },
  ]

  useEffect(() => {
    // if(!isReduxLoaded) dispatch(getuserData());
  },[userdata])
  // console.log('Editprofile',userdata)


  return (
  <BottomSheetModalProvider>
    <Box flex = {1} bg = {theme.Bg.base}>
      <TouchableOpacity style = {{flex :1}} activeOpacity={1} onPress = {()=>  bottomSheetModalRef.current?.close()}>
      <Memorizednavigation title = "Edit Profile"  onEditcontent = {false}/>
      <FlatList>
        <VStack flex = {1} mt = {1}  space = {2}> 
            <Box id = 'Picture-edit' h= {200} mb = {2} position={'relative'}>
              <Center>
               
                  <Pressable 
                  w=  '100%' 
                  onPress = {() => handlePresentModalPress("bg_image")}
                  >  
                  {({
                  isHovered,
                  isFocused,
                  isPressed
                }) => {
                  return(
                  <Box w = '100%' h = {160} overflow={'hidden'} bg = {theme.Bg.container}>
                    {currentProfile?.bg_image &&
                         <FastImage 
                         style={{width : '100%' ,height : '100%' , opacity : isPressed ? 0.3 : isHovered ? 0.3  : 1 }}
                         source={{
                          uri : currentProfile?.bg_image,
                          priority: FastImage.priority.normal,
                        }}
                        alt="images"
                        resizeMode={FastImage.resizeMode.cover}
                         />
                    }
                 
                  </Box> 
                )}}
                </Pressable>
              </Center>
              <Box ml = {5} position={'absolute'} bottom={0}   w = '85' h = '85' zIndex={10} shadow={1}>
                  <MemorizedAvatarfield 
                  image = {currentProfile?.pf_image}
                  action = {() => handlePresentModalPress("pf_image")} 
                  size = '100%'/>
                </Box>
            </Box>
            
            <VStack >          
            <Divider bg = {theme.Divider.base}/>
                <Suspense  fallback = {<Box>Loading..</Box>}>       
                  {/* <MemorizedEditfield options = {MenuOptions}/> */}
                  {MenuOptions.map((items , key) => 
                    <VStack space = {1}  key=  {key} >
                      <MemorizedEditfield options = {items}/>
                      <Divider bg = {theme.Divider.base}/>
                    </VStack>
                  )}
                </Suspense>    
            </VStack>
            <Box pl = {6}>
            <Pressable onPress={() => {bottomSheetModalRef.current?.close(); navigation.navigate('AccountSettings');}}>
              {({
              isHovered,
              isFocused,
              isPressed
            }) => {
              return(
                <Text color =  {isPressed ? 'blue.800' : isHovered ? 'blue.800' :'blue.500'}>
                  Account Settings
                </Text>
              )}}
              </Pressable>
            </Box>
           
        </VStack>
      </FlatList>
      </TouchableOpacity>
    </Box>
      <Photochoice
        BottomRef = {bottomSheetModalRef}
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChanges}

        DevicePhotos = {getdeviceLibrary}
        photosMode = {getPhotos}
      />

    </BottomSheetModalProvider>

  )
}


export default Editprofile;