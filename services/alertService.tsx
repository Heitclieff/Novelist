import React from 'react';
import AlertItem from "../features/reader/components/Alert";
import { useToast } from "native-base";

const SendAlert = (status: string, success: string, failed: string , toast : any) => {
     try{
          toast.show({
               placement: 'top',
               render: ({ id }) => {
                 return <AlertItem
                   status={status}
                   successText={success}
                   failedText={failed}
                 />
               }
             });
     }catch(error){
          console.log("Toast failed" ,error)
     }

}


export default SendAlert;