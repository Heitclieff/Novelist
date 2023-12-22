import { MessageConfig } from "../features/search/assets/config";


const sendNotification = async (params:any) : Promise<void> => {
     if(!params?.token){
        console.log("ERROR : Not found any token" , "Token :" , params?.token)
        return
     } 

     try{
          const response:any = await fetch(MessageConfig.protocol, {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `key=${MessageConfig.server_key}`,
               },
               body: JSON.stringify({
                 to : params?.token,
                 notification: {
                   title: 'Nobelist',
                   body: params?.body,
                   icon : params?.icon,
            
                 },
                 data: {
                   custom_key: MessageConfig.custom_key,
                   icon : params?.icon,
                   title : params?.body,
                   type : params?.type,
                   project : params?.project,
                   target:  params?.target,
                   id : params?.id,
                 },
               }),
             });
           
             const data = await response.json();
             console.log('Notification Response:', data);

     }catch(error){
          console.log("Failed to send Notification" , error)
     }
   };


export default sendNotification;