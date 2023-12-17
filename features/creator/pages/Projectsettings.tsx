import React,{useContext, useState, useEffect} from 'react'
import { 
VStack , 
Text,
Box, 
HStack, 
Input, 
TextArea, 
Checkbox, 
Button, 
Switch, 
IconButton, 
Pressable,
FormControl,
useToast,
Icon} from 'native-base'
import { Alert , BackHandler } from 'react-native'
import AlertItem from '../../reader/components/Alert'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Elementnavigation from '../../../components/navigation/Elementnavigation'
import Rating from '../../project/components/Rating'
import SendAlert from '../../../services/alertService'
import { CheckCircleIcon , WarningOutlineIcon } from 'native-base';

// @Redux Tookits
import { setProjectContent, setProjectDocument ,setRating } from '../../../systems/redux/action'
import { useDispatch , useSelector } from 'react-redux'


//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
     route : any
}

const Memorizednavigation = React.memo(Elementnavigation)

const Projectsettings : React.FC <Pageprops>= ({route}) => {
     const {id} = route.params
     const db = firestore()
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const dispatch = useDispatch();
     const toast = useToast();
     const myproject = useSelector((state) => state.project)
     const projectdocument = useSelector((state) => state.docs.docs);
     const chapterdocs = useSelector((state) => state.content);
     const userdocs = useSelector((state) => state.userData)
     const rating =  useSelector((state) => state.rates);

     const [currentSnapshot, setCurrentSnapshot] = useState<any>("");
     const [showRating, setShowRating] = useState(false);
     // const [selectRating , setSelectRating] = useState<{}>({title : projectdocument?.rating})
     const [showAlert , setShowAlert] = useState<boolean>(false);


     const [isEdit , setIsedit] = useState<boolean>(false)
     const [isnotEmpty , setisnotEmpty] = useState<boolean>(false);
     const [allowCreate ,setAllowCreate] = useState<boolean>(false);

     const [projectconfig , Setprojectconfig] = useState<{}>({
          title : projectdocument.title ,
          overview : projectdocument.overview,
          rating : projectdocument.rating,
     
          comment_status : projectdocument.comment_status,
          commit_status : projectdocument.commit_status,
          novel_status : projectdocument.novel_status,
          status : projectdocument.status
     })


     
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

     const fetchingRates = async () : Promise <void> => {
          const getrates =  await firestore().collection('Rates').get();
          const ratesdocs = getrates.docs.map((doc) =>({id : doc.id,  ...doc.data()}))
          dispatch(setRating({rates : ratesdocs}))

          return ratesdocs;
     }



     const setSelectedRating = (target:any) => {
          if(!isEdit) setIsedit(!isEdit);

          Setprojectconfig((prevProjectconfig) => ({
               ...prevProjectconfig,
               rating : target,
          }))
     }

     const projectConfigChange = async (field:string,target:any) => {
          // if(!isEdit) setIsedit(!isEdit);
          setIsedit(false)
          if(typeof(target) === "boolean" || typeof(target) === "string"){
               setIsedit(true)
          }
    
          Setprojectconfig((prevProjectconfig) => ({
               ...prevProjectconfig,
               [field] : target,
          }))

          if (field === 'status'){
               let current_tags = [];
               let isFailed = false;


               if(chapterdocs.content?.length <= 0) {
                    Alert.alert("Error" , "You need to have 1 chapters on your project.")
                    isFailed = true;
                
                    Setprojectconfig((prevProjectconfig) => ({
                         ...prevProjectconfig,
                         [field] : false,
                    }))

                    return
               }

               console.log(typeof(currentSnapshot));
               console.log(currentSnapshot)
               if(typeof(currentSnapshot) !== "object"){
                    const snapshotTags = await firestore().collection('Novels').doc(id).get();
                    const get_current_tags = snapshotTags?.data().tagDoc

                    current_tags = get_current_tags;                    
                    setCurrentSnapshot(get_current_tags);
               }
               else{
                    current_tags = currentSnapshot;
               }

               if(!projectconfig?.rating && current_tags?.length <= 0){
                    
                    Alert.alert("Error" , "You need to  Select Rating and Select Tags first Before Saving")
                    isFailed = true

                    Setprojectconfig((prevProjectconfig) => ({
                         ...prevProjectconfig,
                         [field] : false,
                    }))

                    return
               }

               else if(!projectconfig?.rating){
                    Alert.alert("Error" , "You need to  Select Rating Before Saving")
                    isFailed = true
               }

             

               if(current_tags?.length <= 0){
                    isFailed = true;
                    Alert.alert("Error" , "You need to Select some Tags for your project.")
               }

               if(isFailed){
                    Setprojectconfig((prevProjectconfig) => ({
                         ...prevProjectconfig,
                         [field] : false,
                    }))
               }
          }

          else if(field === "title"){
               let isAlert = false;
               let error_message = "Try different from previous project name."
               
               if(target){
                    if(target.length > 6 || target.length > 255){
                         if(projectdocument.title === target){
                              return
                         }

                         const isExists = await db.collection('Novels')
                         .where('title', '==', target)
                         .get();

                         if(isExists.docs?.length > 0) {
                              setIsedit(false)
                              isAlert = true;
                         }
                    }else{
                         isAlert = true;
                         error_message = "Project name must have more 6 to 255 charecters";
                    }
               }
               setProjectdocsStatus((prev) => ({...prev , title : isAlert}))
               setprojectdocsError((prev) => ({...prev , [field] : error_message}))

          }

          else if (field === "novel_status"){
              let isFailed = false
              
               if(chapterdocs.content?.length <= 0) {
                    Alert.alert("Error" , "You need to have 1 chapters on your project.")
                    isFailed = true;
               }

               if(isFailed){
                    Setprojectconfig((prevProjectconfig) => ({
                         ...prevProjectconfig,
                         [field] : false,
                    }))
               }
          }


     }

     const handleProjectUpdate = () => {
          let status  = "error"
          if(projectconfig.title.length <= 6 || projectconfig.title.length > 255){
               Alert.alert("Error" , "Project name must have more 6 to 255 charecters")
               return
          }

          try{
               setIsedit(false);
               const firestoreConfig = {};
               const updateDocument = {...projectdocument};
               for(const key in projectconfig){
                    if(projectconfig[key] !== projectdocument[key]){
                         if(key === "rating"){
                              firestoreConfig[key] = firestore().doc(`Rates/${projectconfig[key]?.id}`);
                              continue;
                         }
                         firestoreConfig[key] = projectconfig[key];
                         updateDocument[key] = projectconfig[key];
                    }
               }
               
               firestore().collection('Novels').doc(id).update(firestoreConfig);
               dispatch(setProjectDocument({docs :updateDocument}));
               navigation.goBack();
               console.log("Sucessfull Updated Configuration.");
               status = "success"
          }catch(error){
               console.error("Error Update Novel Tag :", error);
               return false
          }

          SendAlert(status , "Saved changes" , "Saving failed" , toast)
     }

     const DeleteProject =  async () : Promise<void>   => {
          let status = 'error'
          try{
               const firebase = firestore();
               const batch = firebase.batch();

               const getusers = firebase.collection('Users');
               const getnovels = firebase.collection('Novels').doc(id);

               const myuser = userdocs[0];

               navigation.navigate('Creator');
               const updateProject = myproject.docs.filter((doc)=> doc.id !== id);
               dispatch(setProjectContent({docs : updateProject}))

               if(!projectdocument.multiproject){
                    console.log("METHOD : Single Project")

                    const NewProject = myuser.project.filter((project) => project !== id)
                    getusers.doc(myuser.id.toString()).update({project : NewProject});
               }
               else{
                    console.log("METHOD : Multiple Project")

                    const ProjectMember = projectdocument.creators?.map((member) => member.userDoc);

                    if(!ProjectMember?.length > 0){
                         console.log("Failed To delete Because Not found any Member.")
                         return
                    }
                    const getproject =  await getusers.where(firestore.FieldPath.documentId(), 'in' , ProjectMember).get();
                    const DeleteUserProject = getproject.docs?.map((doc) => ({
                         id : doc.id,
                         project : doc.data().project.filter((project) => project !== id)
                    })
                    )
            
                    DeleteUserProject.forEach((data) => {
                         const docRef = getusers.doc(data.id);
                         batch.update(docRef, { project: data.project });
                    });
     
                    batch.commit()
               }

               await getnovels.collection('Creator').parent?.delete();
               await getnovels.collection('Chapters').parent?.delete();
               await getnovels.delete();

               status = "success";
               console.log("Delete Books Success" , id)
          }catch(error){
               console.log("Failed To delete This Project" ,error)
          }
          SendAlert(status , "Deleted project" , "Delete failed" , toast)
     }
 
     const DeleteAlertDailog = () => 
     Alert.alert('Delete', 'you want to save this progress ?', [
          {
               text: 'Cancel',
  
               style: 'cancel',
          },
          {text: 'Delete', onPress: () => DeleteProject()},
     ]);

     const renderCheckIcon = (field:string) => {
          const isAlert =  projectdocsStatus[field];
          if(projectconfig?.[field]){
               return(
                    <CheckCircleIcon 
                    mr = {2}
                    color = {isAlert ? "red.500" : "teal.500"}
                    />
               )
          }
     }

     useEffect(() => {
          if(!isEdit){
               return
          }

          const backAction = () => {
               Alert.alert('Saving!', 'Are you sure you want to go back without save?', [
                 {
                   text: 'Cancel',
                   onPress: () => null,
                   style: 'cancel',
                 },
                 {text: 'YES', onPress: () => resetConfig()},
               ]);
               return true;
             };
         
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
          );
      
          return () => backHandler.remove();
     }, [isEdit]);
    

     useEffect(() => {
          if(rating?.rates) return
          fetchingRates(); 
     },[])


     const resetConfig = () => {
          setIsedit(false);
          Setprojectconfig({
               title : projectdocument.title ,
               overview : projectdocument.overview,
               rating : projectdocument.rating,
          
               comment_status : projectdocument.comment_status,
               commit_status : projectdocument.commit_status,
               novel_status : projectdocument.novel_status,
               status : projectdocument.status
          })
          navigation.goBack();
     }

  return (
       <VStack flex={1} bg={theme.Bg.base}>
            <Memorizednavigation title = "Project Settings"  editable = {isEdit} isAction  = {handleProjectUpdate}
            rightElement={[{icon : <AntdesignIcon size = {18} color = {theme.Icon.between} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
            />
            <Box flex={1}>
                 <FlatList disableRefresh = {true}>
                      <VStack p={6} space={4}>
                           <Text color={theme.Text.base} fontWeight={'semibold'}>General</Text>
                           <VStack space={4} >
                                <VStack space={2} >
                                     <Text color={theme.Text.heading} fontWeight={'semibold'}>Project name</Text>
                                     <FormControl isInvalid = {projectdocsStatus.title}>
                                     <Input
                                          onChange={() => setisnotEmpty(true)}
                                          rounded={'full'}
                                          bg={theme.Bg.container}
                                          borderColor={theme.Bg.comment}
                                          color={theme.Text.base}
                                          h={9}
                                          value={projectconfig.title}
                                          onChangeText={(target)=>projectConfigChange('title' , target)}
                                          placeholder='Enter your project name'
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
                                          value = {projectconfig.overview}
                                          onChangeText={(target)=>projectConfigChange('overview' , target)}
                                          placeholder="Enter your project Overview" />
                                </VStack>
                                <VStack space={2} >
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <Text color={theme.Text.heading} fontWeight={'semibold'}>Rating</Text>
                                        <IconButton 
                                        size = 'sm'
                                        onPress = {() => setShowRating(true)}
                                        rounded={'full'}
                                        icon = {
                                            <AntdesignIcon
                                            name='plus'
                                            size={12}
                                            color = {theme.Icon.static}
                                            />
                                        }
                              />
                                   </HStack>
                                   
                                   {projectdocument &&    
                                        <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>{projectconfig.rating ? projectconfig.rating.title : "Select your Novel Rating"}</Text>
                                   }
                                   
                              </VStack>
                                <VStack  space={2} >
                                   <HStack   alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack w = {'80%'}>
                                                  <Text color={theme.Text.heading} fontWeight={'semibold'}>Enable Comment</Text>           
                                                  <Text color = {theme.Text.description} fontSize={'xs'}>for people can comment your Novel</Text>                    
                                             </VStack>
                                                  <Switch size={'sm'} value = {projectconfig.comment_status} onToggle={(target) => projectConfigChange('comment_status' , target)}/>                                        
                                             
                                        </HStack>
                                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack w = {'80%'}>
                                                  <Text color={theme.Text.heading} fontWeight={'semibold'}>Public Project</Text>
                                                  <Text color = {theme.Text.description} fontSize={'xs'}>for people can see your project</Text>
                                             </VStack>
                                        
                                             <Switch size={'sm'} value = {projectconfig.status} onToggle={(target) => projectConfigChange('status' , target)}/>
                                        </HStack>
                                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack w = {'80%'}>
                                                  <Text color={theme.Text.heading} fontWeight={'semibold'}>Finshed Project</Text>
                                                  <Text color = {theme.Text.description} fontSize={'xs'}>for finished your project</Text>
                                             </VStack>
                                        
                                             <Switch size={'sm'} value = {projectconfig.novel_status} onToggle={(target) => projectConfigChange('novel_status' , target)}/>
                                        </HStack>
                                        {/* <HStack alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack w = {'80%'}>
                                                  <Text color={theme.Text.description} fontWeight={'semibold'}>Commit</Text>
                                                  <Text  color = {theme.Text.description} fontSize={'xs'}>this feature for single creator to commited your project</Text>
                                             </VStack>
                                        
                                             <Switch size={'sm'} value = {projectconfig.commit_status} onToggle={(target) => projectConfigChange('commit_status' , target)}/>
                                        </HStack> */}
                                     <VStack space={2} mt =  {2}>
                                        <Text color={theme.Text.heading} fontWeight={'semibold'}>Delete Project</Text>
                                        <Button 
                                        onPress ={DeleteAlertDailog}
                                        w= {120} 
                                        size={'sm'} 
                                        rounded={'full'}  
                                        variant={'outline'} 
                                        borderColor={'red.500'}>
                                             <Text color={'red.500'} fontSize={'xs'}>Delete Project</Text>   
                                        </Button>
                                   </VStack>
                                </VStack>

                           </VStack>
                      </VStack>
               </FlatList>
               <Rating 
               isOpen={showRating} 
               onClose = {setShowRating} 
               isselect = {{title : projectconfig.rating}}
               selectRating = {setSelectedRating}
               rating=  {rating?.rates}/> 
          </Box>
     </VStack>
  )
}
export default Projectsettings;