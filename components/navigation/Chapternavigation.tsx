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
import { Animated } from 'react-native';
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';

import EntypoIcon from 'react-native-vector-icons/Entypo'
import IonIcon from 'react-native-vector-icons/Ionicons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { beginEvent } from 'react-native/Libraries/Performance/Systrace';

// import * as Haptics from 'expo-haptics';

interface contianerProps {
     editable: boolean;
     event: any;
     title: string;
}

interface SaveProps { }
const SaveButton: React.FC<SaveProps> = ({event}) => {
     const theme:any = useContext(ThemeWrapper);

     const [isOpen, setIsOpen] = React.useState(false);
     const cancelRef = React.useRef(null);
     const onClose = () => setIsOpen(false);

     return (
          <Center>
               <Text color={theme.Text.base} onPress={() => setIsOpen(!isOpen)}>Save</Text>
               <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                    <AlertDialog.Content bg = {theme.Bg.container}>
                         <AlertDialog.CloseButton />
                         <AlertDialog.Header bg = {theme.Bg.container} borderBottomColor={theme.Divider.comment} >
                              <Text color = {theme.Text.heading}>Save</Text>
                         </AlertDialog.Header>
                        
                         <AlertDialog.Body bg = {theme.Bg.container}>
                            <Text color = {theme.Text.base}>Do you want to Save your progress ?</Text>
                         </AlertDialog.Body>
                         <AlertDialog.Footer bg = {theme.Bg.container} borderTopColor={theme.Divider.comment}>
                              <Button.Group space={2}>
                                   <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                                        <Text color = {theme.Text.base}>
                                             Cancel
                                        </Text>
                                        
                                   </Button>
                                   <Button colorScheme="teal" onPress={() => {event(); onClose();}}>
                                        Save
                                   </Button>
                              </Button.Group>
                         </AlertDialog.Footer>
                    </AlertDialog.Content>
               </AlertDialog>
          </Center>
     )
}

const Chapternavigation: React.FC<contianerProps> = ({ editable, event, title }) => {
     const navigation: any = useNavigation();
     const theme: any = useContext(ThemeWrapper);

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
                              <Text color={theme.Text.heading}>{title}</Text>
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
                                   icon={
                                        <FeatherIcon
                                             size={20}
                                             color={theme.Icon.base}
                                             name='settings' />}
                              />
                              <SaveButton event = {event}/>
                         </HStack>
                    }
               </HStack>
          </Animated.View>
     )
}

export default Chapternavigation;
