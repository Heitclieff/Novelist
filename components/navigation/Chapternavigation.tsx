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
IconButton
} from 'native-base';
import { Animated, Alert } from 'react-native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';

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
     event: any;
     title: string;
     chapterdocs : any,
     request: any
}


const Chapternavigation: React.FC<contianerProps> = ({ editable, event, isEdit, title , commitable , chapterdocs , request}) => {
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
                              <IconButton
                                   size='sm'
                                   rounded={'full'}
                                   onPress ={() => navigation.navigate('Editchapter', {title : chapterheader , chapterdocs , setChapterheader})}
                                   icon={
                                        <FeatherIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name='settings' />}
                              />

                              {isEdit ?
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
                              } 
                            
                         </HStack>
                      
                    }
                         
               </HStack>
          </Animated.View>
     )
}

export default Chapternavigation;
