import React,{useContext, useEffect} from "react";
import { 
Box,
Text,
HStack,
VStack,
Center,
 } from "native-base";
import { ThemeWrapper } from "../../../systems/theme/Themeprovider";

interface containerProps { 
    follower : string | number,
    following : string | number,
    career : string | number,
    careersAmout : string
}

const Statusdisplay : React.FC <containerProps> = ({follower, following , career  ,careersAmout}) => {
    const theme:any = useContext(ThemeWrapper);    
    const MenuVariant = {  follower : follower , following :following , Careers : careersAmout ?  careersAmout : 0}

    useEffect(() => {

    },[follower])
    return(
        <Box justifyContent={'flex-end'}>
            <HStack  alignItems={'flex-end'} space = {4}>
                {Object.keys(MenuVariant).map((key) => {
                    const item = MenuVariant[key];
                    return (
                        <HStack key = {key} space = {1}>
                            <Text 
                            fontWeight={'semibold'}
                            color={theme.Text.base}>
                                {item}
                            </Text>
                            <Text
                            color={theme.Text.description}>
                               {key}
                            </Text>  
                        </HStack>
                    )
                })}
            </HStack>
        </Box>
    )
}

export default Statusdisplay;