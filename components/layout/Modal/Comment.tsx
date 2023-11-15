import React, { 
useMemo, 
useRef, 
useState, 
useCallback, 
useContext , 
useEffect} from 'react'
import { 
Center, 
Button,
Box,
Text,
Modal, 
FormControl,
Input , 
Divider, 
VStack, 
HStack } from 'native-base';
import {
View,
Image,
Keyboard,
Platform} from 'react-native';
import BottomSheet, { BottomSheetView , BottomSheetFlatList   } from '@gorhom/bottom-sheet';
import { 
BottomSheetModalProvider, 
BottomSheetModal , 
BottomSheetTextInput} from '@gorhom/bottom-sheet';

import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { getuserData } from '../../../systems/redux/action';
import { FlatList } from '../Flatlist/FlatList';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../systems/redux/reducer';
import { TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView  } from 'native-base';
//Comment Components
import Commentfield from '../../field/Commentfield';

// @Redux Tookits
import { useDispatch , useSelector } from 'react-redux';

interface Modalprops {
    BottomRef : any
    snapPoints : any
    handleSheetChange : any
 }
const CommentModal: React.FC<Modalprops> = ({BottomRef , snapPoints , handleSheetChange}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const theme:any = useContext(ThemeWrapper)

    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userdata = useSelector((state:any) => state.userData)
  
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)
    const BOX_HEIGHT  = 80
    useEffect(() => {
      if(!isReduxLoaded) dispatch(getuserData());
    },[dispatch , isReduxLoaded])


    const handleClosePress = useCallback(() => {
        BottomRef.current?.close();
      }, []);
    const handleSheetChanges = useCallback((index: number) => {        
        console.log('handleSheetChanges', index);
    }, []);

    const handleReturnChange = () => {
        BottomRef.current?.snapToIndex(1);
    }
  

    return (
            <BottomSheetModal
                keyboardBehavior='interactive'
                ref={BottomRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
                backgroundStyle = {{backgroundColor : theme.Bg.comment}}
                handleIndicatorStyle = {{backgroundColor : theme.Indicator.base}}
          
            >
                
                <TouchableWithoutFeedback onPress ={Keyboard.dismiss}>
                <VStack flex=  {1} space = {2} position={'relative'}>
                    <BottomSheetFlatList
                        data={[0,0,0,0,0,0,0]}
                        contentContainerStyle = {{paddingBottom : BOX_HEIGHT , marginTop : 30 }}
                        ItemSeparatorComponent={<Box h = {7}></Box>}
                        // keyExtractor={(i) => i}
                        renderItem={(item:any , round:number) => {
                            return(
                                <Commentfield key = {round}/>
                            )
                        }}
                    />
                        <HStack 
                        w = '100%' 
                        position = "absolute" 
                        bottom = {0}
                        shadow={1}
                        bg = {theme.Bg.comment}
                        >
                            <KeyboardAvoidingView 
                            w = '100%' 
                            
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            h={{
                                base: `${BOX_HEIGHT}px`,
                                lg: "auto"
                            }}
                            >
                            <HStack w = '100%' h= '100%' space = {2} alignItems={'center'} justifyContent={'center'} pl = {10} pr = {10}>
                                <Box w  = '45' h = '45' rounded = 'full' bg = 'gray.600' overflow= 'hidden'>
                                    <Image 
                                    source={{uri : userdata?.[0].pf_image}} 
                                    style = {{
                                        maxWidth : '100%' , 
                                        maxHeight : '100%' ,
                                        width : '100%' , 
                                        height : '100%' , 
                                        objectFit :'cover'
                                    }}/>
                                </Box>  
                                <Box w= '100%' h = {'35'}>
                                <Input 
                                borderColor={theme.Divider.comment}
                                rounded = "full"
                                bg = {theme.Divider.comment}
                                placeholder="Enter your comment" 
                                pl = {3} 
                                w='100%' 
                                h=  '100%' />
                                </Box>
                                
                            </HStack>
                            </KeyboardAvoidingView> 
                            </HStack>
                    {/* </HStack> */}
                    
                </VStack>
                </TouchableWithoutFeedback>
        </BottomSheetModal>
   
    )
}

export default CommentModal;