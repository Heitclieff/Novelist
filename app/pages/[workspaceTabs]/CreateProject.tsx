import React,{useContext} from 'react'
import { Box, VStack , Text , TextArea, Input, HStack , IconButton , Icon, Button } from 'native-base';
import { ThemeContext } from '../../../systems/Theme/ThemeProvider';
import CreateProjectbar from '../../components/creater/[container]/CreateProjectbar';
import { Flatlist } from '../[stack]/[global]/Flatlist';
import { AntDesign } from '@expo/vector-icons';
import { Switch } from 'native-base';

const CreateProject : React.FC = () => {
     const theme:any = useContext(ThemeContext);
     return(
     <VStack flex = {1} bg = {theme.Bg.base}>
          <CreateProjectbar/>
         
          <Flatlist>
               <VStack flex = {1}>
                    <Box w=  '100%' h = {170} bg = {theme.Bg.container}></Box>
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
                                     />
                                </VStack>

                                <VStack space={2} >
                                     <Text color={theme.Text.description} fontWeight={'semibold'}>Overview</Text>
                                     <TextArea
                                          minH={30}
                                          bg={theme.Bg.container}
                                          borderColor={theme.Bg.container}
                                          color={theme.Text.base}
                                          placeholder="Enter your project Overview" />
                              </VStack>

                              <VStack space={2} >
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <Text color={theme.Text.description} fontWeight={'semibold'}>Tags(0) </Text>
                                        <IconButton 
                                        size = 'md'
                                        w = {7}
                                        h = {7}
                                        rounded={'full'}
                                        icon = {
                                        <Icon
                                        as={AntDesign}
                                        name='plus'
                                        size={4}
                                        color = {theme.Text.base}
                                        ></Icon>
                                        }
                              />
                                   </HStack>
                                     
                                   <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>Enter your Novel Tags</Text>
                              </VStack>

                              <VStack space={2} >
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <Text color={theme.Text.description} fontWeight={'semibold'}>Rating</Text>
                                        <IconButton 
                                        size = 'md'
                                        w = {7}
                                        h = {7}
                                        rounded={'full'}
                                        icon = {
                                        <Icon
                                        as={AntDesign}
                                        name='plus'
                                        size={4}
                                        color = {theme.Text.base}
                                        ></Icon>
                                        }
                              />
                                   </HStack>
                                     
                                   <Text pl = {1} color = {theme.Text.description} fontSize={'xs'}>Select your Novel Rating</Text>
                              </VStack>
                              <VStack mt = {2} space = {2}>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Enable Comment</Text>           
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people can comment your Novel</Text>                    
                                        </VStack>
                                        <Switch size={'sm'}/>                                        
                                        
                                   </HStack>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Public Project</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>for people can see your project</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'}/>
                                   </HStack>
                                   <HStack alignItems={'center'} justifyContent={'space-between'}>
                                        <VStack>
                                             <Text color={theme.Text.description} fontWeight={'semibold'}>Commit</Text>
                                             <Text color = {theme.Text.description} fontSize={'xs'}>this feature for single creator to commited your project</Text>
                                        </VStack>
                                   
                                        <Switch size={'sm'}/>
                                   </HStack>
                              </VStack>
                              <Button rounded={'full'} variant={'outline'} colorScheme={'teal'} borderColor={'teal.600'}>Create</Button>
                    </VStack>
               </VStack>
          </Flatlist>    
        
         
         
     </VStack>
  )
}

export default CreateProject;
