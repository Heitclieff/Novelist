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
} from 'native-base';
import { Animated, Alert } from 'react-native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { beginEvent } from 'react-native/Libraries/Performance/Systrace';

//@ firebase
import firestore from '@react-native-firebase/firestore'
import Chapter from '../creator/pages/chapter';


// import * as Haptics from 'expo-haptics';

interface contianerProps {
     commitable : boolean,
     editable: boolean;
     isEdit : boolean,
     status : booelan,
     chapterstate : any,
     event: any;
     title: string;
     chapterdocs : any,
     openInvite : any
     request: any
}


const Chapternavigation: React.FC<contianerProps> = ({ editable, event, isEdit , title , commitable ,status ,openInvite , chapterstate, chapterdocs , request }) => {
     const navigation: any = useNavigation();
     const theme: any = useContext(ThemeWrapper);

     const [showAlert, setShowAlert] = useState(false);
     const [chapterheader ,setChapterheader] = useState(title);


     const SavingAlertDailog = () => 
     Alert.alert('Saving', 'you want to save this progress ?', [
          {
               text: 'Cancel',
               style: 'cancel',
          },
          {text: 'Save', onPress: () => event()},
     ]);

     const PushingDialogs = () => 
     Alert.alert('Pushing', 'you want to push this progress to Commits ?', [
          {
               text: 'No',
               style: 'cancel',
          },
          {text: 'yes', onPress: () => request()},
     ]);


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
               <HStack w='100%' safeAreaTop justifyContent={'space-between'} alignItems={'center'} pl={5} pr={5}>
                    <Box>
                         <HStack alignItems={'center'}>
                              <IconButton
                                   size='sm'
                                   rounded={'full'}
                                   onPress={() => navigation.goBack()}
                                   icon={
                                        <EntypoIcon
                                             name='chevron-left'
                                             size={20}
                                             color={theme.Icon.base}
                                        />
                                   }
                              />
                              <Text color={theme.Text.heading}>{chapterheader}</Text>
                         </HStack>

                    </Box>
                    {!editable ?
                         <HStack>
                              <IconButton
                                   size='sm'
                                   rounded={'full'}
                                   icon={
                                        <FeatherIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name='moon' />}
                              />

                              <IconButton
                                   size='sm'
                                   rounded={'full'}
                                   icon={
                                        <IonIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name='list'
                                        />}
                              />
                         </HStack>
                         :
                     

                         <HStack alignItems={'center'} space={2}>
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
                                        <Menu.Item 
                                        _text={{color : theme.Text.base}}
                                        onPress = {() => openInvite(true)}
                                        
                                        >Invite</Menu.Item>
                                        <Menu.Item 
                                        _text={{color : theme.Text.base}}
                                        onPress ={() => navigation.navigate('Editchapter', {title : chapterheader , chapterdocs , setChapterheader})}
                                        >Settings
                                        </Menu.Item>
                                        
                                   </Menu>
                              </Box> 

                              {
                              status ? 
                                   isEdit ?
                                        <Text color = {theme.Text.base} onPress = {SavingAlertDailog}>Save</Text>
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
                                   
                                   } 
                            
                         </HStack>
                      
                    }
                         
               </HStack>
          </Animated.View>
     )
}

export default Chapternavigation;
