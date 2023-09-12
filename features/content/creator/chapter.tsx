import React,{useContext , useEffect , useState , useRef , useMemo , useCallback} from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { 
Box , 
VStack ,
HStack,
Input, 
Text, 
useDisclose, 
Button ,
Divider , 
IconButton , 
FormControl,
Icon} from 'native-base'
import { teamsdata } from '../assets/config'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { BottomSheetModalProvider , BottomSheetModal ,BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import {SwipeListView }from 'react-native-swipe-list-view'

//@Components
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
import Elementnavigation from '../../../components/navigation/Elementnavigation'
import ChapterItem from './components/ChapterItem'
import Deletebutton from '../../../components/button/Deletebutton'

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'


interface Pageprops {}

const Memorizednavigation = React.memo(Elementnavigation);

const Chapter : React.FC <Pageprops> = () => {
     const theme:any = useContext(ThemeWrapper);
     const navigation = useNavigation();
     const {isOpen , onOpen , onClose} = useDisclose();
     const bottomSheetModalRef = useRef<BottomSheetModal>(null);
     const snapPoints = useMemo(() => [150, 250], []);

     const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
     }, []);
     const handleSheetChanges = useCallback((index: number) => {        
    }, []);

    const handleReturnChange = () => {
      bottomSheetModalRef.current?.snapToIndex(1);
    }

  return (
     <VStack flex=  {1} bg=  {theme.Bg.base}>
             <Memorizednavigation title = "Chapters" 
                rightElement={[
                    {icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'plus'/> , navigate : handlePresentModalPress},
                    {icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}
                ]}
            />
        
        <VStack flex = {1}>
          <FlatList>
              <Box pl = {6} pr = {6} mt = {5}>
                  <Input 
                  rounded={'full'} 
                  bg = {theme.Bg.container} 
                  borderColor={theme.Bg.comment} 
                  color={theme.Text.base}
                  h  = {9}
                  InputRightElement={<EvilIcon name='search' size = {10} mr = {2}/>}
                  placeholder='Seacrh your Chapter name'
                  />
              </Box> 
               <VStack space = {2} m ={5} mt = {6}>
                    <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'}  fontSize={'xs'}>Draft</Text>
                    <VStack mb = {4} space = {2}>
                        <SwipeListView 
                          disableRightSwipe
                          data={[0]}
                          renderItem={(item:any , index:number) => (
                            <ChapterItem data = {teamsdata[0]}/>
                          )}
                          renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                          leftOpenValue={60}
                          rightOpenValue={-60}

                        />
                    </VStack>
                    <Text pl = {3} color = {theme.Text.description} fontWeight={'semibold'} fontSize={'xs'}>All</Text>
                    <VStack mb = {4} space = {3} >
                      <SwipeListView 
                          disableRightSwipe
                          data={[0,1]}
                          ItemSeparatorComponent={<Box h=  '2'/>}
                          renderItem={(item:any , index:number) => (
                            <ChapterItem data = {teamsdata[0]}/>
                          )}
                          renderHiddenItem={ (data, rowMap) => (<Deletebutton/>)}
                          leftOpenValue={60}
                          rightOpenValue={-60}
                        />
                    </VStack>
     
            </VStack>      
            </FlatList>
            <KeyboardAvoidingView  behavior="position">
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
            </KeyboardAvoidingView>
        </VStack>
       
     </VStack>

  )
}

export default Chapter;