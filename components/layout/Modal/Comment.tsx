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
HStack, 
IconButton} from 'native-base';
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
import { getuserData, setUser } from '../../../systems/redux/action';
import IonIcon from 'react-native-vector-icons/Ionicons'
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../systems/redux/reducer';
import { TouchableWithoutFeedback } from 'react-native';
import { KeyboardAvoidingView  } from 'native-base';
import sendNotification from '../../../services/notificationService';
//Comment Components
import Commentfield from '../../field/Commentfield';

// @Redux Tookits
import { useDispatch , useSelector } from 'react-redux';

// @Firestore
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore'

interface Modalprops {
    BottomRef : any
    snapPoints : any
    handleSheetChange : any
    id : string
    owner : string
 }
const CommentModal: React.FC<Modalprops> = ({BottomRef , snapPoints , handleSheetChange , id , owner}) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const theme:any = useContext(ThemeWrapper)
    const InputRef = useRef(null)
    const fstore = firestore();

    const [targetToken ,setTargetToken] = useState<string>("");
    const [LobbyChat ,setLobbyChat] = useState<any[]>([])
    const [contentInput , setContentInput] = useState<{}>({content : "" , placeholder : "Enter your comment"});
    const [currentReply , setCurrentReply] = useState<string>('');

    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const userdata = useSelector((state:any) => state.userData)
  
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded)
    const BOX_HEIGHT  = 80
    useEffect(() => {
      if(!isReduxLoaded) dispatch(getuserData());
    },[dispatch , isReduxLoaded])


    const fetchingChat = () => {
        try{
            const reference = database()
            .ref(`/comment/${id}`)
            .orderByChild('timestamp')
            .limitToLast(10)
         
            const recivedReference = (snapshot:any) => {
               
            if(!snapshot.exists){
                return false
            }
            setLobbyChat(snapshot.val());
            };
            reference.on('value' , recivedReference);

            return () => {
                reference.off('value' , recivedReference);
            }
        }catch(error){
            console.log("ERROR: Failed to fetching Chat data" ,error)
        }
    }
   

    const findingTargetToken = async (target : string) => {
        try{
        const getTarget = await fstore.collection("Users").doc(target).get();
        const getToken = getTarget.data()?.message_token;

        if(getToken){
            if(!targetToken){
                setTargetToken(getToken);
            }
        }
        return getToken;

        }catch(error){
            console.log("Failed to finding Target Token" ,error);
        }
    }

    const  PushingChat = async () => {
        try{
            if(!contentInput.content){
                console.log("Not found any Content of comment.")
                return
            }

            const newReference = database().ref(`/comment/${id}`).push(); 
            const docRef = await newReference
                        .set({
                            content: contentInput.content ,
                            like : 0,
                            reply : "",
                            userid : userdata?.[0].id, 
                            timestamp: database.ServerValue.TIMESTAMP
                        })
            
            if(owner === userdata?.[0].id){
                return
            }

            let message_token = targetToken;
            if(!message_token){
               message_token = await findingTargetToken(owner);          
            }

            console.log("Owner" , owner);

            if(message_token){
                sendNotification({
                    token : message_token,
                    target : owner,
                    body : `${userdata[0].username} has comment to your project.`,
                    icon: userdata?.[0].pf_image,
                    type : 'notify',
                    project : id,
                });
            }else{
                console.log("Not founds message token in your account");
            }

            setContentInput({content : "" , placeholder : "Enter your comment"})
        }catch(error){
            console.log("ERROR: Failed to Post this comment" ,error)
        }
       
    }  

    const updatedPostliked = (isLiked:boolean , post:string , reply : string) => {
        try{
            // Updated to Realtime database.
            let path = `/comment/${id}/${post}`;
            
            if(reply){
                path += `/reply/${reply}`
            }

            const newReference =  database().ref(path); 
            newReference.update({
                like : database.ServerValue.increment(isLiked ? 1 : -1),
                timestamp: database.ServerValue.TIMESTAMP,
            })
            // Updated to firestore
            const getusers = firestore().collection("Users").doc(userdata?.[0].id);
            
            const Posts = reply ? reply : post
            let removePost = [];
           
            if(!isLiked){
                removePost =  userdata[0].post_like.filter((prev) => prev !==  Posts)
            }   
            const userRef = getusers.update({
                post_like : isLiked  ? [...userdata?.[0].post_like , Posts] : removePost
            })
            
            dispatch(setUser([{...userdata[0] , post_like  : isLiked ? [ ...userdata[0].post_like , Posts] : removePost}]));
            console.log("Sucess Updated Post like")
        }catch(error){
            console.log("ERROR: Failed to Update this comment" ,error)
        }  
    }


    const replyCurrentPost = async () =>{
        try{
               const newReference =  database().ref(`/comment/${id}/${currentReply}`); 
               const CurrentReference = newReference.child('reply').push();
               
               const docRef =  await CurrentReference.set({
                content: contentInput.content ,
                like : 0,
                userid : userdata?.[0].id, 
                timestamp: database.ServerValue.TIMESTAMP
               })

               setCurrentReply('')
               setContentInput({content : "" , placeholder : "Enter your comment"})
               console.log("Reply Sucesss");
        }catch(error){
            console.log("ERROR: Faied to Reply this Post" ,error)
        }
    }

    const setReplyInputstatus = (id:string , name:string) => {
        InputRef.current?.focus()
     
        setCurrentReply(id);
        setContentInput((prev) => ({...prev , placeholder : `Reply ${name}`}))   
    }

    const SetKeyboardDismiss = () => {
        if(!contentInput.content){
            setContentInput({content : "" , placeholder : "Enter your comment"})
        }

        Keyboard.dismiss();
    }

    useEffect(() => {
       const unsubscribe =  fetchingChat();

        if(!unsubscribe){
            console.log("ERROR : Not founds any Project id in Comment list");
            return
        }
       return () => {
        unsubscribe();
       }
    }, [])

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

                <TouchableWithoutFeedback  onPress ={SetKeyboardDismiss}>
                <VStack flex=  {1} space = {2} position={'relative'}>
                    {LobbyChat ?
                       
                            <BottomSheetFlatList
                            data={Object.keys(LobbyChat)}
                            contentContainerStyle = {{paddingBottom : BOX_HEIGHT + 40 , marginTop : 30 }}
                            ItemSeparatorComponent={<Box h = {7}></Box>}
                            // keyExtractor={(i) => i}
                            renderItem={(key:any) => {
                                const chatData = LobbyChat[key.item];
                                return(
                                    <Commentfield 
                                    key = {key.item} 
                                    id = {key.item}
                                    data ={chatData} 
                                    setReplyInputstatus = {setReplyInputstatus}
                                    updatePostliked = {updatedPostliked}
                                    />
                                )
                            }}
                            />
                        :
                        <Center mt = {5}>
                            <Text color = {theme.Text.base}>Don't have any comment right now.</Text>
                        </Center>
                        
                    }         
             
            
                        <HStack 
                        w = '100%' 
                        position = "absolute" 
                        bottom = {0}
                        shadow={1}
                        bg = {theme.Bg.comment}
                        >
                              
                            <KeyboardAvoidingView 
                            w = '100%' 
                            position={'relative'}
                            alignItems={'center'}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            h={{
                                base: `${BOX_HEIGHT}px`,
                                lg: "auto"
                            }}
                            >
                            {currentReply &&
                                <Button 
                                onPress = {() => {setCurrentReply(''); setContentInput((prev) =>({...prev , placeholder : "Enter your comment"}))}}
                                p = {0}
                                pl = {2}
                                pr = {2} 
                                h = '25' 
                                bg = 'teal.500'
                                position = 'absolute' 
                                top = {-7}
                                rounded={'full'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                >
                                <Text color = {'white'} fontSize = 'xs'>Cancle Reply</Text>
                            </Button>    
                            }
                            
                                   
                                 
                            <HStack w = '100%' h= '100%' space = {2} alignItems={'center'} justifyContent={'center'} pl = {10} pr = {10}>
                            
                                <Box w  = '45' h = '45' rounded = 'full' bg = 'gray.600' overflow= 'hidden'>
                                {userdata?.length > 0 
                                    &&
                                    <Image 
                                    source={{uri : userdata?.[0].pf_image}} 
                                    style = {{
                                        maxWidth : '100%' , 
                                        maxHeight : '100%' ,
                                        width : '100%' , 
                                        height : '100%' , 
                                        objectFit :'cover'
                                    }}/>
                                }
                                    
                                </Box>
                                  
                                <Box w= '100%' h = {'35'}>
                                   
                                <Input 
                                  pl = {3} 
                                  w='100%' 
                                  h=  '100%'
                                  rounded = "full"
                                   ref={InputRef}
                                  bg = {theme.Divider.comment}
                                  color = {theme.Text.base}
                                  borderColor={theme.Divider.comment}
                                  placeholder= {contentInput.placeholder}
                                  value = {contentInput.content}
                                  onChangeText={(e) => setContentInput((prev) => ({...prev , content : e}))}
                                  
                                  InputRightElement={
                                    contentInput.content &&
                                      <IconButton 
                                      onPress={currentReply ? replyCurrentPost : PushingChat} 
                                     
                                      colorScheme={'teal'}
                                      p = {0} 
                                      rounded = 'full'
                                      w= {'35'} 
                                      h = {'full'}
                                      icon={  
                                        
                                        <IonIcon
                                            size={12}
                                            color={theme.Icon.base}
                                            name = "send"
                                        />
                                      }
                                     />
                                          
                                      
                                    
                                }
                                />

                                </Box>
                                
                            </HStack>
                            </KeyboardAvoidingView> 
                            </HStack>
        
                </VStack>
                </TouchableWithoutFeedback>
        </BottomSheetModal>
   
    )
}

export default CommentModal;