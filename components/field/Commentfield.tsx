import React, { useContext, useEffect, useState } from 'react'
import {
    Box,
    HStack,
    VStack,
    Text,
    IconButton,
    Icon
} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Image, Keyboard } from 'react-native'
import Replyfield from './Replyfield'

// @Redux Toolkits
import { useSelector } from 'react-redux'

// @Firestore
import firestore from '@react-native-firebase/firestore'


// import * as Haptics from 'expo-haptics';

interface containerProps {
    data: any
    id: string
    setReplyInputstatus: any
    updatePostliked: any
}

const Commentfield: React.FC<containerProps> = ({ data, updatePostliked, setReplyInputstatus, id }) => {
    const theme: any = useContext(ThemeWrapper)
    const [isLiked, setisLiked] = useState<boolean>(false);
    const [LikeCount, setLikedCount] = useState<number>(0);
    const [userChat, setuserChat] = useState<{}>({})

    const [isloading, setisLoading] = useState(true);
    const [isShowreply, setisShowreply] = useState(false);

    const userdata = useSelector((state) => state.userData);

    const UpdatedPostLikesStatus = () => {
        setisLiked(!isLiked);
        updatePostliked(!isLiked, id , false);
    }


    const MatchingCommentusers = async (reply : boolean): Promise<T | void> => {
        try {
            const getusers = await firestore().collection("Users").doc(data?.userid).get();

            if (!getusers.exists) {
                console.log("Not found this users in rows")
                return
            }

            if(reply) {
                return getusers?.data()
            }

            setuserChat(getusers?.data())
            setisLoading(false)

            
        } catch (error) {
            console.log("ERROR: Failed to matching user with id", error);
        }

    }

    const prevPostLike = () => {
        try {
            if (!userdata?.length > 0) {
                console.log("Failed to Check Post Like because not founds any user.")
                return
            }
            const useritem = userdata[0];
            if (useritem.post_like?.length > 0) {
                if (useritem.post_like.includes(id)) {
                    setisLiked(true);
                }
            }
        } catch (error) {
            console.log("ERROR: Failed to validate Post like", error);
        }
    }
    useEffect(() => {
        prevPostLike();
    }, [])

    useEffect(() => {
        MatchingCommentusers(false);
    }, [])

    return (

        <HStack w='100%' justifyContent={'center'}>
            {!isloading &&
                <>
                    <Box w='13%' alignItems={'center'}>
                        <Box w='30' h='30' bg='gray.200' rounded='full' overflow="hidden">
                            <Image
                                source={{ uri: userChat.pf_image }}
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </Box>
                    </Box>


                    <VStack w='80%' space={1}>
                        <HStack justifyContent={'space-between'}>
                            <VStack w='90%' space={1}>
                                <Text fontWeight={'medium'} color={theme.Text.base}>{userChat?.username}</Text>
                                <Text color={theme.Text.base} fontSize={'xs'}>{data.content}</Text>
                            </VStack>
                            <Box w='10%' h='100%' mt={2}>
                                <IconButton
                                    size='sm'
                                    w='30'
                                    h={30}
                                    rounded={'full'}
                                    onPress={() => { UpdatedPostLikesStatus(); }}
                                    icon={
                                        <AntdesignIcon
                                            size={10}
                                            color={isLiked ? '#ef4444' : theme.Icon.base}
                                            name={isLiked ? 'heart' : 'hearto'} />}
                                />
                            </Box>
                        </HStack>

                        <HStack space={3} alignItems={'center'}>
                            <Text fontSize={'xs'} color={theme.Text.description} fontWeight={'medium'}>{`${data.like} Like`}</Text>
                            <Text fontSize={'xs'} color={theme.Text.description} fontWeight={'medium'} onPress={() => { setReplyInputstatus(id, userChat?.username); }}>Reply</Text>
                        </HStack>
                        
                        {data.reply &&
                            <Text 
                            fontSize={'xs'} 
                            onPress={() => setisShowreply(!isShowreply)}
                            color={theme.Text.description}>
                               {!isShowreply ?` ${Object.keys(data.reply).length}  replied` : "Hide" }
                            </Text>
                        }
                        
                        {isShowreply &&
                            Object.keys(data?.reply).map((key:any , index:number) => {
                                const replydata = data.reply[key];

                                return(
                                    <Replyfield
                                        key = {index}
                                        data = {replydata}
                                        id = {key}
                                        currentid = {id}
                                        updatePostliked={updatePostliked}
                                    />
                                )
                                
                            })
                        
                        }


                    </VStack>
       
                </>
            }
        
        </HStack>
  
  )
}

export default Commentfield;