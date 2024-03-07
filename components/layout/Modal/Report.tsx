import React, {useContext , useState} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack,
Center,
Button,
Modal,
FormControl,
Input,
Checkbox,
TextArea,
useToast
 } from 'native-base'
import SendAlert from '../../../services/alertService'
 //@ firebase
import firestore from '@react-native-firebase/firestore'
 
interface ModalProps { 
     showReport : boolean
     setShowReport : any
     userid : string
     data : any
     doc_id : string
}

const ReportModal : React.FC <ModalProps> = ({showReport ,setShowReport , data , userid ,doc_id}) => {
     const theme:any = useContext(ThemeWrapper);
     const fstore = firestore();
     const toast = useToast();

     const [reportArea ,setReportArea] = useState<string>("");

     const sendReport = async () : Promise <void> => {
          let status  = "error"
          const timestamp = firestore.FieldValue.serverTimestamp();
          try{
               const report = await fstore.collection("Report");
               report.add({
                    user_id : userid,
                    doc_id : doc_id , 
                    chapter_id : data.id,
                    content : reportArea,
                    reportDate : timestamp,
               })
               status = "success"
               console.log("Success Report");
           
          }catch(error){
               console.log("ERROR: Failed to send Report" , error.message);
          }
          SendAlert(status , "send Report" , "send failed" , toast)
          setShowReport(false);
     }
     
   return (
       <Center>
            <Modal isOpen={showReport} onClose={() => setShowReport(false)}>
                 <Modal.Content maxWidth="400px" bg = {theme.Bg.menu}>     
                      <Modal.CloseButton />
                      <Modal.Header borderBottomWidth={0} bg = {theme.Bg.menu} _text = {{color : theme.Text.heading}}>Report</Modal.Header>
                      <Modal.Body>
                         <TextArea
                              value = {reportArea}
                              onChangeText={(e : string) => setReportArea(e)}
                              placeholder = "Please type something to let us know about this."
                              color = {theme.Text.base}
                              borderColor = {theme.Text.menu}
                              bg = {theme.Bg.container}
                         />
                      </Modal.Body>
                      <Modal.Footer bg = {theme.Bg.menu} borderTopWidth={0}>
                           <Button.Group space={2} alignItems = 'center'>
                                <Button
                                variant="ghost" 
                                rounded= 'full'
                         
                                _text={{color : theme.Text.base}}
                                onPress={() => {
                                     setShowReport(false);
                                }}>
                                     Cancel
                                </Button>
                                <Button
                                rounded={'full'}
                                p = {0}
                                w = "80px"
                                h = "35px"
                                colorScheme={'teal'}
                              
                                onPress={() => {
                                    sendReport();
                                }}>
                                     Report
                                </Button>
                           </Button.Group>
                      </Modal.Footer>
                 </Modal.Content>
            </Modal>
       </Center>
  )
}

export default ReportModal;
