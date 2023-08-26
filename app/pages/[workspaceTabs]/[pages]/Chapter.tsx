import React,{useContext , useEffect , useState , useRef , useMemo , useCallback} from 'react'
import { Platform , Keyboard , KeyboardEvent } from 'react-native'
import { Box , VStack ,HStack,Input, Text, useDisclose, Button ,Divider , IconButton , Icon} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import Chapterbar from '../../../components/creater/[container]/Chapterbar'
import { EvilIcons } from '@expo/vector-icons'
import { Flatlist } from '../../[stack]/[global]/Flatlist'
import Chaptercontainer from '../../../components/creater/[container]/Chaptercontainer'
import { teamsdata } from '../../../../assets/VisualCollectionsdata'
import { Actionsheet , FormControl } from 'native-base'
import { BottomSheetModalProvider , BottomSheetModal ,BottomSheetTextInput } from '@gorhom/bottom-sheet'
import {SwipeListView }from 'react-native-swipe-list-view'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
interface Pageprops {}

const Chapter : React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeContext)
     const {isOpen , onOpen , onClose} = useDisclose();
     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
     const snapPoints = useMemo(() => ['30%', '30%'], []);

     const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
     }, []);
     const handleSheetChanges = useCallback((index: number) => {        
    }, []);

    const handleReturnChange = () => {
      bottomSheetModalRef.current?.snapToIndex(1);
    }

  return (
    <BottomSheetModalProvider>
     <VStack flex=  {1} bg=  {theme.Bg.base}>
          <Chapterbar onOpen = {handlePresentModalPress}/>
          <Box flex = {1}>
          <Flatlist>
            <Box w= '100%' mt = {2}>
              <Box pl = {6} pr = {6}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<Icon as = {<EvilIcons name='search'/>} size = {5} mr = {2}/>}
                  placeholder='Seacrh your Chapter name'
                  />
              </Box> 
            </Box> 
               <VStack space = {2} m ={5} mt = {6}>
                    <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'}  fontSize={'xs'}>Draft</Text>
                    <VStack mb = {4} space = {2}>
                        <SwipeListView 
                          disableRightSwipe
                          data={[0]}
                          renderItem={(item:any , index:number) => (
                            <Chaptercontainer data = {teamsdata[0]}/>
                          )}
                          renderHiddenItem={ (data, rowMap) => (
                            <HStack  flex = {1} m = {1}  space = {1} flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'} rounded={'full'} overflow={'hidden'}>
                              <IconButton 
                                bg = {'rose.600'}
                                colorScheme={'rose'}
                                size = 'md'
                                w = {50}
                                h = {50}    
                               
                                rounded={'full'}
                                icon = {
                                      <Icon
                                      as={AntDesign}
                                      name='delete'
                                      size={4}
                                      color = {theme.Text.base}
                                      ></Icon>
                                }
                            />
                            </HStack>
                          )}
                          leftOpenValue={60}
                          rightOpenValue={-60}

                        />
                    </VStack>
                    <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>All</Text>
                    <VStack mb = {4} space = {2} >
                      
                         <Chaptercontainer data = {teamsdata[0]}/>
                         <Chaptercontainer data = {teamsdata[0]}/>
                    </VStack>
               </VStack>
              
            </Flatlist>
        </Box>
     </VStack>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle = {{backgroundColor : theme.Bg.comment}}
        handleIndicatorStyle = {{backgroundColor : theme.Indicator.base}}
    >
        
        <VStack flex=  {1} space = {2}>
        <VStack w = '100%' p = {4} space = {5}>
            <FormControl mb="5" >
                <Text color = {theme.Text.base} fontWeight={'semibold'} pb = {2} >Chapter Title</Text>
                <BottomSheetTextInput onSubmitEditing={handleReturnChange} style ={{width : '100%' , height :35, borderWidth : 1 , borderRadius : 100 ,borderColor : theme.Divider.comment,color : 'white', backgroundColor : theme.Divider.comment , paddingLeft : 10}}/>
                <FormControl.HelperText>
                  Give your a chapter title.
                </FormControl.HelperText>
            </FormControl>
        <Button rounded={'full'} colorScheme={'teal'}>Create</Button>
      </VStack>
        </VStack>
    </BottomSheetModal>
     </BottomSheetModalProvider>
  
  )
}

export default Chapter;