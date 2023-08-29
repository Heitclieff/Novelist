import React,{useContext, useState} from 'react'
import { VStack  , Text ,Box, HStack , Input , TextArea , Checkbox , Button , Switch , IconButton , Icon} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import Projectsettingsbar from '../../../components/creater/[container]/Projectsettingsbar'
import { Flatlist } from '../../[stack]/[global]/Flatlist'
import { AntDesign } from '@expo/vector-icons'

import { Pressable } from 'native-base'
interface Pageprops {}

const Projectsettings : React.FC = () => {
     const [isnotEmpty , setisnotEmpty] = useState<boolean>(false);
     const theme:any = useContext(ThemeContext);
     const Checkboxlist = [{status : 'Public' , color: 'teal.700'} , {status : 'Privated', color: 'red.600'} , {status : 'Develop', color: 'yellow.700'}]
  return (
       <VStack flex={1} bg={theme.Bg.base}>
            <Projectsettingsbar isMenuhidden = {isnotEmpty}/>
            <Box flex={1}>
                 <Flatlist>
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
                                <VStack space={2} >
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
                 </Flatlist>
          </Box>
     </VStack>
  )
}
export default Projectsettings;
