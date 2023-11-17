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
Icon} from 'native-base'
import { Alert } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Elementnavigation from '../../../components/navigation/Elementnavigation'
import Rating from '../../project/components/Rating'

// @Redux Tookits
import { setProjectContent, setRating } from '../../../systems/redux/action'
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
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const dispatch = useDispatch();

     const myproject = useSelector((state) => state.project)
     const projectdocument = useSelector((state) => state.docs.docs);
     const userdocs = useSelector((state) => state.userData)
     const rating =  useSelector((state) => state.rates);

     const [showRating, setShowRating] = useState(false);
     const [selectRating , setSelectRating] = useState<{}>({title : projectdocument?.rating})
     const [showAlert , setShowAlert] = useState<boolean>(false);


     const [isEdit , setIsedit] = useState<boolean>(false)
     const [isnotEmpty , setisnotEmpty] = useState<boolean>(false);
     
     const [projectconfig , Setprojectconfig] = useState<{}>({
          title : projectdocument.title ,
          overview : projectdocument.overview,
          rating : projectdocument.rating,
     
          comment_status : projectdocument.comment_status,
          commit_status : projectdocument.commit_status,
          status : projectdocument.status
     })

     const fetchingRates = async () : Promise <void> => {
          const getrates =  await firestore().collection('Rates').get();
          const ratesdocs = getrates.docs.map((doc) =>({id : doc.id,  ...doc.data()}))
          dispatch(setRating({rates : ratesdocs}))
     }

     const setSelectedRating = (target:any) => {
          if(!isEdit) setIsedit(!isEdit);
          
          Setprojectconfig((prevProjectconfig) => ({
               ...prevProjectconfig,
               rating : target.title,
          }))
     }

     const projectConfigChange = (field:string,target:any) => {
          if(!isEdit) setIsedit(!isEdit);
          
          Setproject
          config((prevProjectconfig) => ({
               ...prevProjectconfig,
               [field] : target,
          }))
     }

     const handleProjectUpdate = () => {
          try{
               const firestoreConfig = {};
               const updateDocument = {...projectdocument};
               for(const key in projectconfig){
                    if(projectconfig[key] !== projectdocument[key]){
                         firestoreConfig[key] = projectconfig[key];
                         updateDocument[key] = projectconfig[key];
                    }
               }
               
               firestore().collection('Novels').doc(id).update(firestoreConfig);
               dispatch(setProjectDocument({docs :updateDocument}));
               console.log("Sucessfull Updated Configuration.");
       
          }catch(error){
               console.error("Error Update Novel Tag :", error);
               return false
          }
     }

     const DeleteProject =  async () : Promise<void>   => {
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

               console.log("Delete Books Success" , id)
          }catch(error){
               console.log("Failed To delete This Project" ,error)
          }
         
     }
 
     const DeleteAlertDailog = () => 
     Alert.alert('Delete', 'you want to save this progress ?', [
          {
               text: 'Cancel',
               style: 'cancel',
          },
          {text: 'Delete', onPress: () => DeleteProject()},
     ]);

     useEffect(() => {
          if(rating?.rates) return
          fetchingRates(); 
     },[])

  return (
       <VStack flex={1} bg={theme.Bg.base}>
            <Memorizednavigation title = "Project Settings"  editable = {isEdit} isAction  = {handleProjectUpdate}
            rightElement={[{icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
            />
            <Box flex={1}>
                 <FlatList>
                      <VStack p={6} space={4}>
                           <Text color={theme.Text.base} fontWeight={'semibold'}>General</Text>
                           <VStack space={4} >
                                <VStack space={2} >
                                     <Text color={theme.Text.description} fontWeight={'semibold'}>Project name</Text>
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
                                     />
                                </VStack>

                                <VStack space={2} >
                                     <Text color={theme.Text.description} fontWeight={'semibold'}>Overview</Text>
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
                                        <Text color={theme.Text.description} fontWeight={'semibold'}>Rating</Text>
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
                                   
                                   {projectdocument?.rating &&
                                        projectconfig ? 
                                    <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>{projectconfig?.rating}</Text>
                                    :     
                                   <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>Select your Novel Rating</Text>
                                   }
                                   
                              </VStack>
                                <VStack space={2} >
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack>
                                                  <Text color={theme.Text.description} fontWeight={'semibold'}>Enable Comment</Text>           
                                                  <Text color = {theme.Text.description} fontSize={'xs'}>for people can comment your Novel</Text>                    
                                             </VStack>
                                                  <Switch size={'sm'} value = {projectconfig.comment_status} onToggle={(target) => projectConfigChange('comment_status' , target)}/>                                        
                                             
                                        </HStack>
                                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack>
                                                  <Text color={theme.Text.description} fontWeight={'semibold'}>Public Project</Text>
                                                  <Text color = {theme.Text.description} fontSize={'xs'}>for people can see your project</Text>
                                             </VStack>
                                        
                                             <Switch size={'sm'} value = {projectconfig.status} onToggle={(target) => projectConfigChange('status' , target)}/>
                                        </HStack>
                                        <HStack alignItems={'center'} justifyContent={'space-between'}>
                                             <VStack>
                                                  <Text color={theme.Text.description} fontWeight={'semibold'}>Commit</Text>
                                                  <Text color = {theme.Text.description} fontSize={'xs'}>this feature for single creator to commited your project</Text>
                                             </VStack>
                                        
                                             <Switch size={'sm'} value = {projectconfig.commit_status} onToggle={(target) => projectConfigChange('commit_status' , target)}/>
                                        </HStack>
                                     <VStack space={2} mt =  {2}>
                                        <Text color={theme.Text.description} fontWeight={'semibold'}>Delete Project</Text>
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