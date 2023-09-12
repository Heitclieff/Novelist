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
import { 
BottomSheetModalProvider, 
BottomSheetModal , 
BottomSheetTextInput} from '@gorhom/bottom-sheet';

import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { getuserData } from '../../../systems/redux/action';
import { useDispatch , useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../systems/redux/reducer';

//Comment Components
import Commentfield from '../../field/Commentfield';

interface Modalprops {
    BottomRef : any
 }
const CommentModal: React.FC<Modalprops> = ({BottomRef}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '60%'], []);
    const theme:any = useContext(ThemeWrapper)

    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userdata = useSelector((state:any) => state.userData)
  
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)

    useEffect(() => {
      if(!isReduxLoaded) dispatch(getuserData());
    },[dispatch , isReduxLoaded])


    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    
    const handleSheetChanges = useCallback((index: number) => {        
    }, []);

    const handleReturnChange = () => {
        BottomRef.current?.snapToIndex(1);
    }
  

    return (
        <View style = {{flex : 1}}>
                <BottomSheetModal
                    ref={BottomRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle = {{backgroundColor : theme.Bg.comment}}
                    handleIndicatorStyle = {{backgroundColor : theme.Indicator.base}}
                >
                   
                    <VStack flex=  {1} space = {2}>
                        <VStack alignItems={'center'} space = {2}>
                            <Text color = {theme.Text.heading} fontSize={'md'} fontWeight={'semibold'}>Comment</Text>
                            <Divider bg = {theme.Divider.comment}/>
                        </VStack>      
                        <VStack h = '70%' space = {5} pt = {2}>
                            <Commentfield/>
                            <Commentfield/>
                        </VStack>
                        {userdata.length > 0 &&
                            <HStack w = '100%' h = '15%'  mr = {2} alignItems={'center'} justifyContent={'center'}>
                            <Box w = '15%'>
                                <Box w  = '55' h = '55' rounded = 'full' bg = 'gray.600' overflow= 'hidden'>
                                    <Image source={{uri :userdata[0].image}} style={{width:'100%' ,height :'100%'}}></Image>
                                </Box>
                            </Box>
                            <HStack w = '75%'>
                                <Box w=  '100%'>
                                    <BottomSheetTextInput 
                                    onSubmitEditing={handleReturnChange}
                                    style ={{borderWidth : 1, borderRadius : 100 , height : 35 , borderColor : theme.Divider.comment,  color :'white', paddingLeft : 10 }}
                                    placeholder='Enter Comment'
                                    placeholderTextColor={theme.Divider.comment}
                                    />

                                </Box> 
                            </HStack>
                        </HStack>
                        }
                    </VStack>
                </BottomSheetModal>
        </View>
    
    )
}

export default CommentModal;