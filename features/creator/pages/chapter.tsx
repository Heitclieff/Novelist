import React, { useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import {
Box,
VStack,
HStack,
Input,
Text,
useDisclose,
Button,
Divider,
IconButton,
FormControl,
Icon,
Center,
Spinner,
useToast,
} from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { SwipeListView } from 'react-native-swipe-list-view'
//@Components
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import Elementnavigation from '../../../components/navigation/Elementnavigation'
import ChapterItem from '../components/ChapterItem'
import Deletebutton from '../../../components/button/Deletebutton'
import AlertItem from '../../reader/components/Alert'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'

import SendAlert from '../../../services/alertService'
// @Firestore
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database';

//@redux
import { useSelector , useDispatch } from 'react-redux'
import { setChaptercontent } from '../../../systems/redux/action'
import { AppSkeleton } from '../../../components/skelton/app'
interface Pageprops {
  route: any
}

const Memorizednavigation = React.memo(Elementnavigation);
const MemorizedChapterItem = React.memo(ChapterItem);

const Chapter: React.FC<Pageprops> = ({ route }) => {
  const theme: any = useContext(ThemeWrapper);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();

  const [chaptersaperated ,setChapterSaperated] = useState<{}>({});
  const [serchingKey ,setSearchingKey] = useState<string>('');
  const [refreshing , setRefreshing] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [isCreate ,setisCreate] = useState<boolean>(false);
  const [initial , setInitial] = useState<boolean>(true);
  

  const projectdocs = useSelector((state) => state.docs.docs)
  const chapterdocs = useSelector((state) => state.content);
  const useraccount = useSelector((state) => state.userData);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => [150, 250], []);
  // const {chapterdocs} = route.params;

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  const handleReturnChange = () => {
    bottomSheetModalRef.current?.snapToIndex(1);
  }

  let separatedChapterdocs = useMemo(() => {
    if (!chapterdocs.content) return { draft: [], other: [] };
  
    const document = chapterdocs.content.reduce((acc, item) => {
      if (item.status) {
        acc.draft.push(item);
      } else {
        acc.other.push(item);
      }
      return acc;
    }, { draft: [], other: [] });
    
    if(isLoading || isCreate){
      setChapterSaperated(document);
    }

    if(isCreate){
      setisCreate(false);
    }
    setisLoading(false);
    
    return document;
  }, [chapterdocs.content , isCreate]);

  useEffect(() => {
  }, [separatedChapterdocs , refreshing])


  const setCreateChapter = () => {
    setisCreate(true);
  }

  const DeleteChapter = async (id:string): Promise<void>=> { 
    let status = 'error'
    try { 
      const projectpath = firestore().collection('Novels').doc(chapterdocs.id);
      const chapterpath = projectpath.collection("Chapters").doc(id);
      const Contentpath = chapterpath.collection('Content')
      const removechapter = chapterdocs.content.filter(doc => doc.id !== id)
      dispatch(setChaptercontent({...chapterdocs , content : removechapter  , id : chapterdocs.id}))
      
      await Contentpath.parent?.delete();
      const docRef = await chapterpath.delete();
              
      const newReference = await database().ref(`/task/${chapterdocs.id}`).child(id).remove()
      console.log("Remove Chapter Success" , id)
      status = "success"
    }catch(error){
      console.log("Failed To Remove This Chapter" , error)
    }
    SendAlert(status , "Deleted" , "Delete failed" , toast)
  }

  
  const getFilterObject = (value:string) => {
    setSearchingKey(value);

    if(!chaptersaperated){
      return
    }

    let fields = "draft"
    let opposite_fields = "other"

    if(!value){
      separatedChapterdocs.draft = chaptersaperated.draft
      separatedChapterdocs.other = chaptersaperated.other
    }
    
    if (typeof (value) == "string") {
        const draft_results = chaptersaperated?.draft.filter((item:any) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        )

        const other_results = chaptersaperated?.other.filter((item:any) =>
        item.title.toLowerCase().includes(value.toLowerCase())
       )
   
        if(draft_results.length > 0 && other_results.length > 0){
          separatedChapterdocs.draft = draft_results;
          separatedChapterdocs.other = other_results;
          return
        }

        let results_used = draft_results

        if(!draft_results.length > 0){
          fields = "other";
          opposite_fields = "draft";
          results_used =  other_results;
        }

        separatedChapterdocs[fields] = results_used;
        separatedChapterdocs[opposite_fields] = [];

    }
}


  useEffect(() => {
    setTimeout(() => {
      setInitial(false);
    },0)
},[])

if(initial) return(
  <AppSkeleton/>
)
  return (
    <VStack flex={1} bg={theme.Bg.base}>
      <Memorizednavigation title="Chapters"
        rightElement={[
          { icon: <AntdesignIcon size={18} color={theme.Icon.static} name='plus' />, navigate: () => navigation.navigate('CreateChapter' , {doc_id : chapterdocs.id , setCreateChapter : setCreateChapter}) },
          { icon: <AntdesignIcon size={18} color={theme.Icon.between} name='appstore-o' />, navigate: navigation.openDrawer }
        ]}
      />

      <VStack flex={1}>
        <FlatList setRefreshing = {setRefreshing} refreshing = {refreshing}>
          <Box pl={6} pr={6} mt={5}>
            <Input
              rounded={'full'}
              bg={theme.Bg.container}
              borderColor={theme.Bg.comment}
              color={theme.Text.base}
              h={9}
              onChangeText={(e) => getFilterObject(e)}
              InputRightElement={<Icon as = {<EvilIcon name='search'/>} size = {5} mr = {2}/>}
              placeholder='Seacrh your Chapter name'
            />
          </Box>
          {chapterdocs.content?.length > 0 ? 
            !isLoading ?
            <VStack space={2} m={5} mt={6}>
              {separatedChapterdocs.draft?.length > 0 &&
                <>
                  <Text pl={3} color={theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>Draft</Text>
                  <VStack mb={4} space={2}>
                    {separatedChapterdocs.draft.map((item:string , index:number) => {
                      const isVisible = item.access?.includes(useraccount?.[0].id) || projectdocs.owner === useraccount?.[0].id
                      let isDisable = false

                      if(projectdocs.owner !== useraccount?.[0].id){
                        isDisable = true;
                      } 

                      else if  (item.createdBy === useraccount?.[0].id){
                        isDisable = false;
                      }

                      if (item.commits){
                        isDisable = true;
                      }
                      if(isVisible)
                        return(
                          <SwipeListView
                            key = {index}
                            disableRightSwipe
                            disableLeftSwipe = {isDisable}
                            data={[0]}
                            ItemSeparatorComponent={<Box h='2' />}
                            renderItem={() => {
                              return(
                                <ChapterItem key = {index} data={item} doc_id = {chapterdocs.id}/>
                              )
                            }}
                            renderHiddenItem={() => (<Deletebutton id = {item.id} action = {DeleteChapter}/>)}
                            leftOpenValue={60}
                            rightOpenValue={-60}
                          />
                      )
                    })}
                  </VStack>
                </>
              }
              
              <Text pl={3} color={theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>All</Text>
              <VStack mb={4} space={3} >
                {separatedChapterdocs.other && 
                  separatedChapterdocs.other.map((item:any , index:number) => {
                    const isDisable = projectdocs.owner !== useraccount?.[0].id 
                    return (
                      <SwipeListView
                      key = {index}
                      disableRightSwipe
                      disableLeftSwipe = {isDisable}
                      data={[0]}
                      ItemSeparatorComponent={<Box h='2' />}
                      renderItem={() => {
                        return(
                          <MemorizedChapterItem key = {index} data={item} doc_id = {chapterdocs.id}/>
                        )
                       
                      }}
                      renderHiddenItem={() => (<Deletebutton  id = {item.id} action = {DeleteChapter}/>)}
                      leftOpenValue={60}
                      rightOpenValue={-60}
                    />
                    )
                  })
                }
             
              </VStack>
             
            </VStack>
            :   
            <Center mt = {5}>
              <Spinner accessibilityLabel="Loading posts" />   
            </Center>
            :
            <Center>
                <Text color = {theme.Text.description} mt = {10} fontSize = 'sm'>Not found chapter content.</Text>
            </Center> 
          }
        </FlatList>
        <KeyboardAvoidingView behavior="position">
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle={{ backgroundColor: theme.Bg.comment }}
            handleIndicatorStyle={{ backgroundColor: theme.Indicator.base }}
          >

            <VStack flex={1} space={2}>
              <VStack w='100%' p={4} space={5}>
                <FormControl mb="5" >
                  <Text color={theme.Text.base} fontWeight={'semibold'} pb={2} >Chapter Title</Text>
                  <BottomSheetTextInput onSubmitEditing={handleReturnChange} style={{ width: '100%', height: 35, borderWidth: 1, borderRadius: 100, borderColor: theme.Divider.comment, color: 'white', backgroundColor: theme.Divider.comment, paddingLeft: 10 }} />
                  <FormControl.HelperText>
                    Give your a chapter title.
                  </FormControl.HelperText>
                </FormControl>
                <Button rounded={'full'} colorScheme={'teal'}>Create</Button>
              </VStack>
            </VStack>
          </BottomSheetModal>
        </KeyboardAvoidingView>
      </VStack>

    </VStack>

  )
}

export default Chapter;