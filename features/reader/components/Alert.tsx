import React from "react";
import {
     Stack,
     Alert,
     HStack,
     VStack,
     Text,
     IconButton,
     CloseIcon,
} from "native-base";
import { StatusDialog } from "../assets/AlertDialog";
interface containerProps {
     status: any
}

const AlertItem: React.FC<containerProps> = ({ status }) => {
     return <Stack space={3} w="100%" maxW="400">
          {StatusDialog.map((item , index) => {
               if (status === item.status) {
                    return (
                         <Alert key = {index} w="100%" status={item.status}>
                              <VStack space={2} flexShrink={1} w="100%">
                                   <HStack flexShrink={1} space={2} justifyContent="space-between">
                                        <HStack space={2} flexShrink={1}>
                                             <Alert.Icon mt="1" />
                                             <Text fontSize="md" color="coolGray.800">
                                                  {item.title}
                                             </Text>
                                        </HStack>
                                        <IconButton
                                             variant="unstyled"
                                             _focus={{
                                                  borderWidth: 0,
                                             }}
                                             icon={<CloseIcon size="3" />}
                                             _icon={{
                                                  color: "coolGray.600",
                                             }}
                                        />
                                   </HStack>
                              </VStack>
                         </Alert>
                    );
               }
          })}

     </Stack>;
}


export default AlertItem