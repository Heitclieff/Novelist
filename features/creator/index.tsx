import React,{useContext , useState, useRef , useEffect , useCallback , useMemo} from 'react'
import { Box , VStack , Text , Center , Spinner} from 'native-base'
import { 
ImageBackground, 
ScrollView ,
View ,
Dimensions ,
RefreshControl, 
FlatList
} from 'react-native'
import FastImage from 'react-native-fast-image';
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeWrapper } from'../../systems/theme/Themeprovider';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


//@Components
import Headercontent from './header';
import Elementnavigation from '../../components/navigation/Elementnavigation';
import Background from './components/Background';
import Photochoice from '../../components/layout/Modal/Photochoice';

//@Sections
import EpisodeSection from './section/Episode';

//@Redux Toolkits
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '../../systems/redux/reducer';
import { setChaptercontent , setProjectTeams , setProjectDocument} from '../../systems/redux/action';
import { BottomSheetModal} from '@gorhom/bottom-sheet'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import { userdata } from '../../assets/content/VisualCollectionsdata';
import { LogBox } from 'react-native';


interface Pageprops {
  route : any
}

const Memorizednavigation = React.memo(Elementnavigation);

const Creatorcontent : React.FC <Pageprops> = ({route}) =>{
  const theme:any = useContext(ThemeWrapper);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const reference = storage();

  const chapterdocs = useSelector((state) => state.content);
  const projectdocs = useSelector((state) => state.docs.docs)
  const useraccount = useSelector((state) => state.userData);

  const {projectdocument , snapshotcontent , id , isupdated , mainrefresh} :any = route.params;
  const [isLoading , setisLoading] = useState<boolean>(true);
  const [refreshing , setRefreshing] = useState<boolean>(false);

  const Screenheight = Dimensions.get('window').height;
  const MAX_HEIGHT  = Screenheight / 2.5;
  const HEADER_HEIGHT_NARROWED = 90;
  const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 2.5; 

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '25%'], []);
  
  const handlePresentModalPress = useCallback(() => {
  bottomSheetModalRef.current?.present();
  }, []);

  const handlePresentModalClose = useCallback(() => {
       bottomSheetModalRef.current?.close();
       }, []);
  const handleSheetChanges = useCallback((index: number) => {
  console.log('handleSheetChanges', index);
  }, []);

  const Redirectnavigation = (direction:never) => {
        navigation.navigate(direction);
  }

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  console.log("Project" , id)
  const fetchchaptercontent = async () : Promise <void> => {
    try {
      const userdocs = await fetchmemberAccount();
      const snapshotchapter = snapshotcontent.collection('Chapters');
      const getchapter  = await snapshotchapter.orderBy('updateAt' , 'desc').get();

      const chapterdocs = getchapter.docs.map(doc => ({
        id : doc.id , 
        updatedimg :userdocs?.find(filteraccount => filteraccount.id === doc.data().updatedBy)?.pf_image,
        ...doc.data() , 
        }))

      
      dispatch(setChaptercontent({content : chapterdocs , id , snapshotchapter : snapshotchapter}));
      dispatch(setProjectTeams({teams : userdocs}))

      setisLoading(false);

    } catch(error) {
      console.error('Error fetching chapter data:', error);
    }
  }

  const fetchmemberAccount = async () => {
    try {
         const creatorDocs = projectdocs.creators.map(doc => doc.userDoc);
         const snapshotuser = await firestore().collection('Users')
         .where(firestore.FieldPath.documentId() , 'in' ,  creatorDocs)
         .get();

         const snapshotuserMap = new Map(snapshotuser?.docs.map(doc => [doc.id, doc]));
         const userdocs = creatorDocs.map((doc_id:string , index:number) => {
          const doc = snapshotuserMap.get(doc_id)?.data();
            return {
                id : doc_id ,
                doc_id : projectdocs.creators[index].doc_id,
                isleader : projectdocs.owner === doc_id,
                owner : projectdocs.owner,
                isyou : doc_id === useraccount[0].id,
                pending : projectdocs.creators[index].pending ,
                ...doc
              }
              });
        return userdocs;
     }catch(error) {    
         console.error("Error fetching document:", error);
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
         setSelectedImages(result);
    }

    handlePresentModalClose();
  }

  const getPhotos = async () => {
    const result =  await launchCamera({
      mediaType : 'photo',
      maxWidth : 300 , 
      maxHeight : 400
    })

     if(result){
         setSelectedImages(result);
    }
    handlePresentModalClose();
}


  const setSelectedImages = async (image : string) => {
    const background_assets = image.assets?.[0];
    const background_uri =  background_assets.uri;
    
  
    try{
      const downloadURL =  await uploadBackgroundImage({
        image : background_uri , 
        name : background_assets.fileName
      })
  
      const projectUpdate = {
        ...projectdocs , 
        image : downloadURL,
      }

     const isUpdate = await  firestore().collection("Novels").doc(id).update({image : downloadURL})
     dispatch(setProjectDocument({docs : projectUpdate , id : id}));
    }catch(error){
      console.log("ERROR: failed to upload Image" , error);
    }
  }

  const uploadBackgroundImage = async (background : string) => {
    if(!background?.image){
         return
    }
    try{
         const reference_path = `novel-image/${background.name}`
   
         const upload_result = await reference
         .ref(reference_path)
         .putFile(background.image);
         
         console.log(upload_result.state , `to upload ${background.name}`);
   
         if(upload_result.state === "success"){
           const downloadURL = await reference.ref(reference_path).getDownloadURL();
           return downloadURL;
         }
       }catch(error){
         console.log("failed to Upload image to storage" ,error.message);
       }
}





  const initailfetchContent = () => {  
      if(refreshing){
        fetchchaptercontent();  
      }

      if(chapterdocs){
        if(chapterdocs.id === id) {
          setisLoading(false)
          return
        }
      }  
      fetchchaptercontent();  
  }

  
  const onRefresh = React.useCallback(() => {
    mainrefresh(true);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  useEffect(() => {
    initailfetchContent();
  },[refreshing ])

  return (
      <Box flex = {1} bg = {theme.Bg.base} position={'relative'}>
        {/* <Dashboardbar/> */}
        <Memorizednavigation 
            Contentfixed = {false}
            rightElement={[
            {icon : <AntdesignIcon size = {20} color = {theme.Icon.static} name = 'setting'/> , navigate : () => Redirectnavigation('Project Settings')} ,
            {icon : <AntdesignIcon size = {20} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
        />
        {projectdocs  && 
        <>
          <Background 
          MAX_HEIGHT={MAX_HEIGHT} 
          image = {projectdocs.image}
         
          />
       
          <FlatList
            data={[0]}
            showsVerticalScrollIndicator = {false}
            refreshControl={
              <RefreshControl 
              refreshing = {refreshing} 
              onRefresh={onRefresh}
              tintColor={'white'}
              />
            }
            style={{
              zIndex: 1,
              position: 'relative',
              marginTop: HEADER_HEIGHT_NARROWED,
              paddingTop: HEADER_HEIGHT_EXPANDED
            }}
            ListFooterComponent={<View style={{ height: HEADER_HEIGHT_EXPANDED }} />}
            renderItem={({ item, index }) => (
              <VStack flex={1} bg={theme.Bg.base}>
                <Headercontent 
                data={projectdocs} 
                onModalPress={handlePresentModalPress}
                id = {id}
                userid = {useraccount?.[0].id}
                timestamp = {{createAt : projectdocs.createAt , updatedAt : projectdocs.lastUpdate}}
                />
                {isLoading ? 
                <Center mt = {5}>
                    <Spinner accessibilityLabel="Loading posts" />   
                </Center>
                  :
                <EpisodeSection doc_id = {id}/> }
              </VStack>
            )}
          />
        </>
        }
      <Photochoice
        BottomRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChanges}

        DevicePhotos={getdeviceLibrary}
        photosMode={getPhotos}
      />
      </Box>
 
  )
}

export default Creatorcontent; 