import React, { useEffect } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'

interface Hookprops {
     userid: string
     userdata: any
}

const SecurityHooks: React.FC<Hookprops> = ({ userid, userdata }) => {
     const navigation = useNavigation();

     useEffect(() => {
          if (userid) {
               const subscriber = firestore()
                    .collection('Users')
                    .doc(userid)
                    .onSnapshot((doc) => {
                         const userdata = doc.data();
                         if (userdata?.disable) {
                              Alert.alert("Security", "your account was Disabled please try again.")
                              auth().signOut();
                              navigation.navigate("Login")
                              return
                         }
                    });

               return () => subscriber();
          }
     }, [userdata]);

     return null
}

export default SecurityHooks;