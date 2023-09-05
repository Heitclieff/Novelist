import React,{useContext} from "react";
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
}

const Statusdisplay : React.FC <containerProps> = ({follower, following , career}) => {
    const theme:any = useContext(ThemeWrapper);    
    const MenuVariant = {  follower : follower , following :following , Career : career}

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