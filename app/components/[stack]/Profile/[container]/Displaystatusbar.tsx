import React,{FC} from "react";
import { 
Box,
Text,
HStack,
VStack,
Center,
 } from "native-base";
import { useContext } from "react";
import { ThemeContext } from "../../../../../systems/Theme/ThemeProvider";

interface containerProps { }

const MenuVariant = ['follower' , 'following' , 'Careers']

const Displaystatusbar : React.FC <containerProps> = () => {
    const theme:any = useContext(ThemeContext);
    return(
        <Box w = '100%' h=  {50} justifyContent={'flex-end'}>
            <HStack justifyContent = 'center' alignItems={'flex-end'} space = {1}>
                {MenuVariant.map((item, key) => {
                    return (
                        <VStack w='30%' key = {key}>
                            <Center>
                                <Text 
                                fontWeight={'semibold'}
                                color={theme.Text.base}>
                                    0
                                </Text>
                                <Text
                                color={theme.Text.base}>
                                    {item}
                                </Text>
                            </Center>
                        </VStack>
                    )
                })}
            </HStack>
        </Box>
    )
}

export default Displaystatusbar;