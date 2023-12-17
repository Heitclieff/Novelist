import React,{useContext, useEffect, useState , useRef , useMemo , useCallback} from 'react'
import { 
Box, 
VStack , 
Text , 
TextArea,
Input, 
HStack , 
IconButton , 
Icon, 
Switch,
FormControl,
useToast,
Button } from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { CheckCircleIcon , WarningOutlineIcon } from 'native-base';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

//@Components
import Background from './components/Background';
import { setProjectContent } from '../../systems/redux/action';
import Photochoice from '../../components/layout/Modal/Photochoice';
import Rating from './components/Rating';
import CreateProjectbar from '../components/creater/[container]/CreateProjectbar';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import Centernavigation from '../../components/navigation/Centernavigation';
import { BottomSheetModalProvider , BottomSheetModal} from '@gorhom/bottom-sheet'

// @Redux tookits
import { useSelector , useDispatch } from 'react-redux';
import { setRating } from '../../systems/redux/action';
import SendAlert from '../../services/alertService';


//@firestore
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import storage from '@react-native-firebase/storage';

const Createproject : React.FC = () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const toast = useToast();
     
     const db = firestore()
     const reference = storage()

     const [showRating, setShowRating] = useState(false);
     const [selectRating , setSelectRating] = useState<{}>()
     const [isLoading ,setLoading] = useState(false);

     const dispatch = useDispatch();
     const useraccount = useSelector((state) => state.userData);
     const projectprev = useSelector((state) => state.project)
     const rating = useSelector((state) => state.rates)
     const [allowCreate ,setAllowCreate] = useState<boolean>(false);


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

     
     const [projectdocsError, setprojectdocsError] = useState({
          title : "Try different from previous project name.",
          overview : "",
          tagDoc :"",
          cateDoc : "",
          rating : ""
        })
      
     const [projectdocsStatus, setProjectdocsStatus] = useState<{}>({
          title : false,
          overview : false,
          tagDoc : false,
          cateDoc : false,
          rating : false
     })

     const [projectdocs ,setprojectdocs] = useState<{}>({
          background : {
               image : "",
               name : "",
          },
          title : "",
          overview : "",
          tagDoc : [],
          cateDoc : [],
          rating : '',
     })
     const [projectOption , setProjectOption] = useState({
          comment_status : false , 
          multiproject : false , 
          status : false , 
          commit_status : false
     })

     const fetchingRates = async () : Promise <void> => {
        const getrates =  await db.collection('Rates').get();
        const ratesdocs = getrates.docs.map((doc) =>({id : doc.id,  ...doc.data()}))
        dispatch(setRating({rates : ratesdocs}))
     }

     const OnOptionChange = (field:string , value:boolean) => {

          setProjectOption({...projectOption , [field] : value})
     }


     const handleSelectedTags = (selectedTags:any , selectedCategory:any) => {
          setprojectdocs({...projectdocs , tagDoc : selectedTags , cateDoc : selectedCategory})
          return  true
     }

     const OnProjectdocsChange = async (field :string , value:string) => {
          let allow = false;
          let ispass = false;
          setprojectdocs({...projectdocs , [field] : value})
          if(field === "title"){
               let isAlert = false;
               let error_message = "Try different from previous project name."
               
               if(value){
                    if(value.length >= 6 || value.length > 255){
                         ispass  = true;
                         const isExists = await db.collection('Novels')
                         .where('title', '==', value)
                         .get();
          
                         if(isExists.docs?.length > 0) {
                              isAlert = true;
                              ispass  = false;
                              setAllowCreate(false);
                         }
                         
                        
                    }else{
                         isAlert = true;
                         error_message = "Project name must have more 6 to 255 charecters";
                    }
               }
               setProjectdocsStatus((prev) => ({...prev , title : isAlert}))
               setprojectdocsError((prev) => ({...prev , [field] : error_message}))

          }

          if(!projectdocsStatus.title || ispass){
               allow = true;
          }
          setAllowCreate(allow);
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

     const OnCreateProject = async() : Promise<void> => { 
          setLoading(true);
          const ImageURL : string | undefined = await uploadBackgroundImage(projectdocs?.background);

          let status  = "error"

          try{

               const userdocs = useraccount?.[0]
               const timestamp = firestore.FieldValue.serverTimestamp();
               const rates = selectRating? selectRating?.id : '' ;
               const getusers = db.collection('Users');
               const getnovel = db.collection('Novels');

               const tagDocs = projectdocs.tagDoc.map(doc => doc.id)
               const createDoc = {
                    title : projectdocs.title,
                    overview : projectdocs.overview,
                    tagDoc : projectdocs.tagDoc,
                    cateDoc : projectdocs.cateDoc,
                    image : ImageURL ?  ImageURL : "",
                    createAt : timestamp,
                    owner : userdocs.id,
                    lastUpdate : timestamp,
                    like : 0,
                    view : 0,
                    tagDoc : tagDocs,
                    rating : rates ? db.doc(`Rates/${rates}`) : "", 
                    ...projectOption, 
               }

               console.log(createDoc)
               const docRef = await getnovel.add({...createDoc});
               const getChapter =  getnovel.doc(docRef.id).collection('Chapters');
               const getCreator =  getnovel.doc(docRef.id).collection('Creator');
               const getUsers   =  getusers.doc(userdocs.id);

               // const UsersRef   = await getUsers.update({project : [...userdocs.project , docRef.id]})
               const UsersRef   = await getUsers.update({project: firestore.FieldValue.arrayUnion(docRef.id)})
               const CreatorRef = await getCreator.add({
                    addAt : timestamp,
                    pending : false,
                    pf_image: userdocs.pf_image,
                    userDoc : userdocs.id,
                    username : userdocs.username,
               })

               const Project_previous = projectprev?.docs ?  projectprev.docs : [];
               dispatch(setProjectContent({
                    docs : [{...createDoc , id : docRef.id} , ...Project_previous]
               }));

               console.log("Create Project Success id :" ,docRef.id)
               status = "success";
               navigation.goBack();
          
          }catch(error){
               console.log(`Failed to Create Project : ${projectdocs.title}` , error)
          }
          setLoading(false);
          SendAlert(status ,  "Created Project" , "Create failed" , toast);
     }

     const setSelectedImages = (image : any) => {
          const background_assets = image.assets?.[0];
          const background_uri =  background_assets.uri;

          setprojectdocs((prev) => ({...prev , 
               background : { 
               image : background_uri,
               name : background_assets.fileName
          }}))
     }
     
     const getdeviceLibrary =  async () => {
          const result =  await launchImageLibrary({
            presentationStyle : 'formSheet',
            mediaType : 'photo' ,
            maxWidth : 300 , 
            maxHeight : 400
          });
      
          if(!result.didCancel){
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
      
          if(!result.didCancel){
               setSelectedImages(result);
          }
          handlePresentModalClose();
      }
     
     
     const renderCheckIcon = (field:string) => {
          const isAlert =  projectdocsStatus[field];
          if(projectdocs?.[field]){
               return(
                    <CheckCircleIcon 
                    mr = {2}
                    color = {isAlert ? "red.500" : "teal.500"}
                    />
               )
          }
     }

     useEffect(() => {
          fetchingRates();
     },[])

     return(
     <VStack flex = {1} bg = {theme.Bg.base}>
          <Centernavigation title = {"Create Project"} transparent = {true} Contentfixed = {false} />
          <FlatList>
               <VStack flex = {1}>
                    <Background image = {projectdocs.background?.image} onModalPress= {handlePresentModalPress}/>
                    <VStack space={5}  p = {4}>
                                <VStack space={2} >
                                     <Text color={theme.Text.heading} fontWeight={'semibold'}>Project name</Text>
                                     <FormControl isInvalid = {projectdocsStatus.title}>
                                     <Input
                                          rounded={'full'}
                                          bg={theme.Bg.container}
                                          borderColor={theme.Bg.comment}
                                          color={theme.Text.base}
                                          h={9}
                                          
                                          placeholder='Enter your project name'
                                          value={projectdocs.title}
                                          onChangeText={(text) => OnProjectdocsChange('title' , text)}
                                          InputRightElement={renderCheckIcon('title')}
                                    />
                                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                                            {projectdocsError.title}
                                        </FormControl.ErrorMessage>
                                    </FormControl>
                                </VStack>

                                <VStack space={2} >
                                     <Text color={theme.Text.heading} fontWeight={'semibold'}>Overview</Text>
                                     <TextArea
                                          minH={30}
                                          bg={theme.Bg.container}
                                          borderColor={theme.Bg.container}
                                          color={theme.Text.base}
                                          placeholder="Enter your project Overview" 
                                          value={projectdocs.overview}
                                          onChangeText={(text) => OnProjectdocsChange('overview' , text)}
                                     />
                              </VStack>

                              <VStack space={2} >
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <Text color={theme.Text.heading} fontWeight={'semibold'}>{`Tags (${projectdocs.tagDoc?.length}) `}</Text>
                                        <IconButton 
                                        size = 'md'
                                        rounded={'full'}
                                        icon = {
                                        <AntdesignIcon
                                            name='plus'
                                            size={15}
                                            color = {theme.Icon.base}
                                            onPress= {() => navigation.navigate('Tags' , {current_tags : projectdocs.tagDoc , handleTagupdate : handleSelectedTags ,  status : false})}
                                        />
                                        }
                              />
                                   </HStack>
                                     
                          
                                   <HStack minHeight={10}  p = {1} space= {2} flexWrap = {'wrap'} borderWidth={0}>
                                        {projectdocs.tagDoc?.length > 0 ?
                                             projectdocs.tagDoc.map((item:any , index:number) => 

                                             <Button key = {item.id}  p = {1} rounded={'full'} borderWidth={1} borderColor={'teal.600'} mb = {1} bg=  {"teal.600"}>
                                                  <Text color = {'white'} fontSize={'xs'}>{item.title}</Text>
                                              </Button>
                                             
                                             ) :   
                                             <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>Enter your Novel Tags</Text>
                                        }
                                   </HStack>
                                  
                              </VStack>

                              <VStack space={2} >
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <Text color={theme.Text.heading} fontWeight={'semibold'}>Rating</Text>
                                        <IconButton 
                                        size = 'md'
                                        onPress={() => setShowRating(true)}
                                        rounded={'full'}
                                        icon = {
                                        <AntdesignIcon
                                        name='plus'
                                        size={15}
                                        color = {theme.Icon.base}
                                        />
                                        }
                              />
                                   </HStack>
                                     
                                   {selectRating ?
                                        <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>{selectRating?.title}</Text>
                                   :
                                        <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>Select your Novel Rating</Text>
                                   }
                                   
                              </VStack>
                              <VStack mt = {2} space = {2}>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.heading} fontWeight={'semibold'}>Enable Comment</Text>           
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people can comment your Novel</Text>                    
                                        </VStack>
                                        <Switch size={'sm'} value = {projectOption.comment_status} onToggle={(event) => OnOptionChange('comment_status' , event)}/>                                        
                                        
                                   </HStack>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.heading} fontWeight={'semibold'}>Mulitple Arthors</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people want to join your project</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'} value = {projectOption.multiproject} onToggle={(event) => OnOptionChange('multiproject' , event)}/>
                                   </HStack>
                                   {/* <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Public Project</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people can see your project</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'} value = {projectOption.status} onToggle={(event) => OnOptionChange('status' , event)}/>
                                   </HStack> */}
                                   {/* <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Commit</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for Check your project progress</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'} value = {projectOption.commit_status} isDisabled = {!projectOption.multiproject} onToggle={(event) => OnOptionChange('commit_status' , event)}/>
                                   </HStack> */}
                              </VStack>
                              <Button 
                                   w="100%" 
                                   isLoading = {isLoading}
                                   rounded = "full"
                                   _pressed = {{bg : theme.Button.create.focused}}
                                   onPress = {OnCreateProject}
                                   isDisabled = {!allowCreate}
                                   bg = {theme.Button.create.base}  
                                   _text = {{color : theme.Text.create , fontWeight : 'semibold' }} 
                                   p = {2} 
                                   mt={5} 
                                   >
                                   Create
                               </Button>
                    </VStack>
               </VStack>
          </FlatList>    

         <Rating 
         isOpen={showRating} 
         onClose = {setShowRating} 
         isselect = {selectRating}
         selectRating = {setSelectRating}
         rating=  {rating?.rates}
         />


     <Photochoice
        BottomRef = {bottomSheetModalRef}
        snapPoints={snapPoints}
        handleSheetChange={handleSheetChanges}

        DevicePhotos = {getdeviceLibrary}
        photosMode = {getPhotos}
      />
     </VStack>
  )
}

export default Createproject;