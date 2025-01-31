import React, { useEffect, useRef, useState, useContext } from 'react'
import {
Box,
HStack,
Icon,
Text,
Center,
Button,
AlertDialog,
Divider,
IconButton,
Menu,
Pressable,
Spinner,
} from 'native-base';
import { Animated, Alert  } from 'react-native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { beginEvent } from 'react-native/Libraries/Performance/Systrace';
import { SpinnerItem } from '../Spinner';
// @Redux toolkits
import { useDispatch , useSelector } from 'react-redux';
import { Themelight , Themedark } from '../../systems/theme/theme';
import { setTheme , saveThemetoStorage } from '../../systems/redux/action';

//@ firebase
import firestore from '@react-native-firebase/firestore'
import Chapter from '../creator/pages/chapter';


// import * as Haptics from 'expo-haptics';

interface contianerProps {
     commitable : boolean,
     editable: boolean;
     isEdit : boolean,
     isLoading : boolean;
     status : boolean,
     multiproject : boolean
     chapterstate : any,
     accessable : boolean
     event: any;
     title: string;
     chapterdocs : any,
     openInvite : any
     approveproject : any
     request: any
     setShowReport : any
     GoBackwithReference : any
}


const Chapternavigation: React.FC<contianerProps> = ({ editable, event, isEdit , title , isLoading, commitable ,status ,openInvite , setShowReport ,approveproject, chapterstate ,accessable,GoBackwithReference ,chapterdocs , multiproject , request }) => {
     const navigation: any = useNavigation();
     const theme: any = useContext(ThemeWrapper);
     const dispatch = useDispatch();

     const [darkmode , setdarkmode]  = useState(theme.themeMode === 'dark');
     const [showAlert, setShowAlert] = useState(false);
     const [chapterheader ,setChapterheader] = useState(title);

     const toggleSwitch = () => { 
          const selectedTheme = darkmode ? Themelight : Themedark;
          dispatch(setTheme(selectedTheme))
          dispatch(saveThemetoStorage(selectedTheme))
          setdarkmode(!darkmode);
     }

     const BackHandler = () => {
          navigation.goBack()

     }
     const SavingAlertDailog = () => 
     Alert.alert('Saving', 'you want to save this progress ?', [
          {
               text: 'Cancel',
               style: 'cancel',
          },
          {text: 'Save', onPress: () =>  event()},
     ]);

     const PushingDialogs = () => 
     Alert.alert('Pushing', 'you want to push this progress to Commits ?', [
          {
               text: 'No',
               style: 'cancel',
          },
          {text: 'yes', onPress: () =>  multiproject ? request() : approveproject()},
     ]);

     const backAction = () => {
          if(!status){
               navigation.goBack();
               return
          }

          Alert.alert('Saving!', 'Are you sure you want to go back without save?', [
            {
              text: 'Cancel',
              onPress: () => null,
              style: 'cancel',
            },
            {text: 'YES', onPress: () => GoBackwithReference()},
          ]);
          return true;
        };
    

     const EditingDialogs = () => 
     Alert.alert('Edit', 'you want to edit this progress ?', [
          {
               text: 'No',
               style: 'cancel',
          },
          {text: 'yes', onPress: () => chapterstate()},
     ]);


     return (
          <Animated.View
               style={[{
                    width: '100%',
                    zIndex: 10
               }]
               }>
               <HStack w='100%' safeAreaTop justifyContent={'space-between'} alignItems={'center'} pl={5} mt = {2} pr={5}>
                    <Box>
                         <HStack alignItems={'center'}>
                              <IconButton
                                   size='sm'
                                   rounded={'full'}
                                   onPress={() => backAction()}
                                   icon={
                                        <EntypoIcon
                                             name='chevron-left'
                                             size={25}
                                             color={theme.Icon.base}
                                        />
                                   }
                              />
                              <Text color={theme.Text.heading}>{chapterheader}</Text>
                         </HStack>

                    </Box>
                    {!editable ?
                         <HStack alignItems={'center'} space = {1}>
                              <IconButton
                                   onPress={toggleSwitch}
                                   size='sm'
                                   rounded={'full'}
                                   icon={
                                        <FeatherIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name= {darkmode ? 'sun' : 'moon'} />}
                              />

                          <Menu w="150" bg = {theme.Bg.container} trigger={triggerProps => {
                                        return (
                                        <Pressable {...triggerProps}>
                                             <IonIcon
                                               size={20}
                                               color={theme.Icon.base}
                                               name='list' />
                                        </Pressable>
                                        )
                                   }}>
                                        <Menu.Item 
                                          _text={{color : theme.Text.base}}
                                          onPress = {() => setShowReport(true)}
                    
                                        > Report
                                        </Menu.Item>
                                   </Menu>
                         </HStack>
                         :
                     

                         <HStack alignItems={'center'} space={2} >
                              {/* <IconButton
                                   size='sm'
                                   rounded={'full'}
                                  
                                   icon={
                                        <FeatherIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name='settings' />}
                              /> */}

                              <Box  alignItems="center" >
                                   <Menu w="150" bg = {theme.Bg.container} trigger={triggerProps => {
                                        return <Pressable {...triggerProps}>
                                             <FeatherIcon
                                               size={20}
                                               color={theme.Icon.base}
                                               name='settings' />
                                        </Pressable>
                                   }}>
                                        {
                                        status &&
                                        multiproject &&
                                        accessable && 
                                             <Menu.Item 
                                             _text={{color : theme.Text.base}}
                                             onPress = {() => openInvite(true)}
                         
                                             >Invite
                                             </Menu.Item>
                                        }
                                        <Menu.Item 
                                        _text={{color : theme.Text.base}}
                                        onPress ={() => navigation.navigate('Editchapter', {title : chapterheader , chapterdocs , setChapterheader})}
                                        >Settings
                                        </Menu.Item>
                                        
                                   </Menu>
                              </Box> 

                              {!isLoading ?
                              status ? 
                                   isEdit ?
                                        
                                        <Text color = {theme.Text.heading} fontWeight={'semibold'} onPress = {SavingAlertDailog}>Save</Text>
                                        :
                                        
                                        <IconButton
                                        size='sm'
                                        rounded={'full'}
                                        isDisabled = {commitable}
                                        onPress ={PushingDialogs}
                                        icon={
                                             <IonIcon
                                                  size={20}
                                                  color={theme.Icon.base}
                                                  name='push' />}
                                        />
                                   :

                                   <IconButton
                                   size='sm'
                                   rounded={'full'}
                                   isDisabled = {commitable}
                                   onPress ={EditingDialogs}
                                   icon={
                                        <FeatherIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name='edit' />}
                                   />
                                   
                              : 
                              <Spinner/>
                              } 
                            
                         </HStack>
                      
                    }
                         
               </HStack>
          </Animated.View>
     )
}

export default Chapternavigation;
