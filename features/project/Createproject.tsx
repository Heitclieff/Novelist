import React,{useContext, useEffect, useState} from 'react'
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
Button } from 'native-base';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

//@Components
import { setProjectContent } from '../../systems/redux/action';
import Rating from './components/Rating';
import CreateProjectbar from '../components/creater/[container]/CreateProjectbar';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import Centernavigation from '../../components/navigation/Centernavigation';

// @Redux tookits
import { useSelector , useDispatch } from 'react-redux';
import { setRating } from '../../systems/redux/action';

//@firestore
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Createproject : React.FC = () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();

     const [showRating, setShowRating] = useState(false);
     const [selectRating , setSelectRating] = useState<{}>()

     const dispatch = useDispatch();
     const useraccount = useSelector((state) => state.userData);
     const projectprev = useSelector((state) => state.project)
     const rating = useSelector((state) => state.rates)

     const [projectdocs ,setprojectdocs] = useState<{}>({
          title : "",
          overview : "",
          tagDoc : [],
          cateDoc : [],
          rating : 'ผู้ใหญ่',
     })
     const [projectOption , setProjectOption] = useState({
          comment_status : false , 
          multiproject : false , 
          status : false , 
          commit_status : false
     })

     const fetchingRates = async () : Promise <void> => {
        const getrates =  await firestore().collection('Rates').get();
        const ratesdocs = getrates.docs.map((doc) =>({id : doc.id,  ...doc.data()}))
        dispatch(setRating({rates : ratesdocs}))
     }

     const OnOptionChange = (field:string , value:boolean) => {
          setProjectOption({...projectOption , [field] : value})
     }

     const OnProjectdocsChange = (field :string , value:boolean) => {
          setprojectdocs({...projectdocs , [field] : value})
     }

     const handleSelectedTags = (selectedTags:any , selectedCategory:any) => {
          setprojectdocs({...projectdocs , tagDoc : selectedTags , cateDoc : selectedCategory})
          return  true
     }

     const OnCreateProject = async() : Promise<void> => {
          try{
               const userdocs = useraccount?.[0]
               const timestamp = firestore.FieldValue.serverTimestamp();
               const getusers = firestore().collection('Users');
               const getnovel = firestore().collection('Novels')

               const tagDocs = projectdocs.tagDoc.map(doc => doc.id)
               const createDoc = {
                    ...projectdocs,
                    createAt : timestamp,
                    image : 'https://wallpapers.com/images/featured/non-copyrighted-ia4f27yk6qnz364p.jpg',
                    owner : userdocs.id,
                    lastUpdate : timestamp,
                    like : 0,
                    view : 0,
                    tagDoc : tagDocs,
                    rating : selectRating?.title,
                    ...projectOption,
                    
               }

               const docRef = await getnovel.add({...createDoc});
               const getChapter =  await getnovel.doc(docRef.id).collection('Chapters');
               const getCreator =  await getnovel.doc(docRef.id).collection('Creator');
               const getUsers   =  getusers.doc(userdocs.id);

               const UsersRef   = await getUsers.update({project : [...userdocs.project , docRef.id]})
               const CreatorRef = await getCreator.add({
                    addAt : timestamp,
                    pending : false,
                    pf_image: userdocs.pf_image,
                    userDoc : userdocs.id,
                    username : userdocs.username,
               })

               dispatch(setProjectContent({
                    docs : [{...createDoc , id : docRef.id} , ...projectprev.docs]
               }));
               console.log("Create Project Success id :" ,docRef.id)

               navigation.goBack();
          }catch(error){
               console.log(`Failed to Create Project : ${projectdocs.title}` , error)
          }
         
     }
     useEffect(() => {
          fetchingRates();
     },[])
     return(
     <VStack flex = {1} bg = {theme.Bg.base}>
          <Centernavigation title = {"Create Project"} transparent = {true} Contentfixed = {false}/>
          <FlatList>
               <VStack flex = {1}>
                    <Box w=  '100%' h = {200} bg = {theme.Bg.container}></Box>
                    <VStack space={5}  p = {4}>
                                <VStack space={2} >
                                     <Text color={theme.Text.description} fontWeight={'semibold'}>Project name</Text>
                                     <Input
                                          rounded={'full'}
                                          bg={theme.Bg.container}
                                          borderColor={theme.Bg.comment}
                                          color={theme.Text.base}
                                          h={9}
                                          placeholder='Enter your project name'
                                          value={projectdocs.title}
                                          onChangeText={(text) => OnProjectdocsChange('title' , text)}
                                     />
                                </VStack>

                                <VStack space={2} >
                                     <Text color={theme.Text.description} fontWeight={'semibold'}>Overview</Text>
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
                                        <Text color={theme.Text.description} fontWeight={'semibold'}>{`Tags (${projectdocs.tagDoc?.length}) `}</Text>
                                        <IconButton 
                                        size = 'md'
                                        rounded={'full'}
                                        icon = {
                                        <AntdesignIcon
                                            name='plus'
                                            size={15}
                                            color = {theme.Icon.base}
                                            onPress= {() => navigation.navigate('Tags' , {current_tags : projectdocs.tagDoc , handleTagupdate : handleSelectedTags})}
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
                                        <Text color={theme.Text.description} fontWeight={'semibold'}>Rating</Text>
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
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Enable Comment</Text>           
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people can comment your Novel</Text>                    
                                        </VStack>
                                        <Switch size={'sm'} value = {projectOption.comment_status} onToggle={(event) => OnOptionChange('comment_status' , event)}/>                                        
                                        
                                   </HStack>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Mulitple Arthors</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people want to join your project</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'} value = {projectOption.multiproject} onToggle={(event) => OnOptionChange('multiproject' , event)}/>
                                   </HStack>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Public Project</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people can see your project</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'} value = {projectOption.status} onToggle={(event) => OnOptionChange('status' , event)}/>
                                   </HStack>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Commit</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for Check your project progress</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'} value = {projectOption.commit_status} isDisabled = {!projectOption.multiproject} onToggle={(event) => OnOptionChange('commit_status' , event)}/>
                                   </HStack>
                              </VStack>
                              <Button rounded={'full'} variant={'outline'} colorScheme={'teal'} borderColor={'teal.600'} onPress={OnCreateProject}>Create</Button>
                    </VStack>
               </VStack>
          </FlatList>    
         <Rating 
         isOpen={showRating} 
         onClose = {setShowRating} 
         isselect = {selectRating}
         selectRating = {setSelectRating}
         rating=  {rating?.rates}/>
     </VStack>
  )
}

export default Createproject;