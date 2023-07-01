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

interface containerProps { 
    follower : string | number,
    following : string | number,
    career : string | number,
}

const Displaystatusbar : React.FC <containerProps> = ({follower, following , career}) => {
    const theme:any = useContext(ThemeContext);    
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

export default Displaystatusbar;