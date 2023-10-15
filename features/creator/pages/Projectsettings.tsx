import React,{useContext, useState} from 'react'
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
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import Elementnavigation from '../../../components/navigation/Elementnavigation'

//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
     route : any
}

const Memorizednavigation = React.memo(Elementnavigation)

const Projectsettings : React.FC <Pageprops>= ({route}) => {
     const {projectdocument , ProjectdocumentUpdate , id} = route.params
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
   
     const [isEdit , setIsedit] = useState<boolean>(false)
     const [isnotEmpty , setisnotEmpty] = useState<boolean>(false);
     const [projectconfig , Setprojectconfig] = useState<{}>({
          title : projectdocument.title ,
          overview : projectdocument.overview,
          comment_status : projectdocument.comment_status,
          commit_status : projectdocument.commit_status,
          status : projectdocument.status
          })
  

     const projectConfigChange = (field:string,target:any) => {
          if(!isEdit) setIsedit(!isEdit);
          
          Setprojectconfig((prevProjectconfig) => ({
               ...prevProjectconfig,
               [field] : target,
          }))
     }


     const handleProjectUpdate = () => {
          try{
               const SaperatedConfig = {};
               for(const key in projectconfig){
                    if(projectconfig[key] !== projectdocument[key]){
                         SaperatedConfig[key] = projectconfig[key];
                    }
               }

               firestore().collection('Novels').doc(id).update(SaperatedConfig);
               ProjectdocumentUpdate(SaperatedConfig);
               console.log("Sucessfull Updated Configuration.");

       
          }catch(error){
               console.error("Error Update Novel Tag :", error);
               return false
          }
     }
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
                                        size = 'md'
                                        rounded={'full'}
                                        icon = {
                                            <AntdesignIcon
                                            name='plus'
                                            size={10}
                                            color = {theme.Text.base}
                                            />
                                        }
                              />
                                   </HStack>
                                     
                                   <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>Select your Novel Rating</Text>
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
                                        <Button w= {120} size={'sm'} rounded={'full'}  variant={'outline'} borderColor={'red.500'}>
                                             <Text color={'red.500'} fontSize={'xs'}>Delete Project</Text>
                                             
                                        </Button>
                                   </VStack>
                                     <VStack space={2}>
                                          {/* {Checkboxlist.map((item:any , index:number) => {
                                   return(
                                   <Checkbox value="test" key = {index} >
                                        <Text color = {theme.Text.base}>
                                             {item.status}
                                        </Text>
                                   </Checkbox>
                                   )
                                   })} */}

                                     </VStack>

                                </VStack>

                           </VStack>
                      </VStack>
                 </FlatList>
          </Box>
     </VStack>
  )
}
export default Projectsettings;