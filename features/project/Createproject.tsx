import React,{useContext, useState} from 'react'
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

//@Components
import CreateProjectbar from '../components/creater/[container]/CreateProjectbar';
import { FlatList } from '../../components/layout/Flatlist/FlatList';

//firebase
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

const Createproject : React.FC = () => {
     const [projectName, setProjectName] = useState('');
     const [overView, setoverView] = useState('');
     const uid = auth().currentUser.uid
     // const novel_status = ['Public', "Pivate"]
     // const cate = ['Action', 'Drama', 'Fantasy', 'Comedy', 'Romantic', 'Horror']
     // const commit_status = [true,false]
     // const tag_list = ['ระบบ','เกิดใหม่','คลั่งรัก','ซอมบี้','ย้อนเวลา','หักหลัง','ครอบครัว','ตลก','เวททนตร์','ตำนาน','เรื่องเล่า','เกมส์']
     // const tag_list2 = ['อาหาร','เทพ','สู้ชีวิต','ปลูกผัก','นางเอกฉลาด','พระเอกเก่ง','อบอุ่น','มนตรา','กำลังภายใน','หมอ','ย้อนยุค','เอาชีวิตรอด']
     // const rating_list = ['12+', 'เด็ก', 'ผู้ใหญ่']
     // const comment_status = ['Public','Private']
     // let novelData = {
     //      title: projectName,
     //      image: '',
     //      overview: overView,
     //      like: 0,
     //      view: 0,
     //      status: novel_status[0],
     //      createAt: new Date(),
     //      lastUpdate: new Date(),
     //      creators: ['user id'],
     //      owner: 'user id',
     //      cateDoc: cate[0],
     //      comment_status: comment_status[0],
     //      commit_status: commit_status[0],
     //      rating: rating_list[0],
     //      tagDoc: [tag_list[0],tag_list2[0]]
     // }
     // const uid = auth().currentUser.uid
     // const mainUserRef = firestore().collection('Users')
     // const mainUserdocRef = mainUserRef.doc(uid)
     // const mainNovelRef = firestore().collection('Novels')
     // const mainNovelDocRef = mainNovelRef.add(novelData).then(async(novelDoc) => {
     //     console.log('novelDoc',novelDoc.id)
     //     await mainUserdocRef.update({
     //       project: firestore.FieldValue.arrayUnion(novelDoc.id)
     //     });
     // })
     const theme:any = useContext(ThemeWrapper);
     return(
     <VStack flex = {1} bg = {theme.Bg.base}>
          {/* <CreateProjectbar/> */}
          <FlatList>
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
                                          value={projectName}
                                          onChangeText={(text) => setProjectName(text)}
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
                                          value={overView}
                                          onChangeText={(text) => setoverView(text)}
                                     />
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
                                        <AntdesignIcon
                                            name='plus'
                                            size={15}
                                            color = {theme.Text.base}
                                        />
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
                                        <AntdesignIcon
                                        name='plus'
                                        size={15}
                                        color = {theme.Text.base}
                                        />
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
          </FlatList>    
        
         
         
     </VStack>
  )
}

export default Createproject;