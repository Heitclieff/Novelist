import React,{useContext} from 'react'
import { 
Box,
VStack,
HStack,
Text, } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { Settingmenu , SettingsCategory } from './assets/config';
const LazyOptionfield = React.lazy(() => import('../../components/field/Optionfield'));
import DarkmodeButton from './components/DarkmodeButton';

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

interface Pageprops {
    setTheme :any ,
}

const MemorizedOptionfield = React.memo(LazyOptionfield)

const Settings : React.FC <Pageprops> = ({setTheme})  => {
    const theme:any = useContext(ThemeWrapper);

    const iconList = [
        <EvilIcon name = "user" size = {22} color = {theme.Icon.base}/>,
        <IonIcon name = "notifications-outline" size = {20} color = {theme.Icon.base}/>,
    ]
  return (

    <Box w  = '100%' h=  '100%' bg = {theme.Bg.base}>
        <VStack p = {2}>
            {SettingsCategory.map((item ,round) => {
                const option = Settingmenu.filter((optionfiltered) => optionfiltered.tag == item.tag)
                return (
                    <VStack key = {round} space  ={3} mt = {3}>
                        <Text
                        pl = {5}
                        fontWeight={'semibold'}
                        color = {theme.Text.heading}
                        >{item.title}</Text>
                        <VStack  pl = {2} pr = {2}>
                            {option.map((optionitem , key) => {
                             
                            return( 
                                <Box mb = {1} key = {key}>
                                    <MemorizedOptionfield
                                        title = {optionitem.title}
                                        isDividerEnable = {false}
                                        isChevronEnable={false}
                                        justifyIcon  = 'center'
                                        direction={optionitem.direct}
                                        detail = {optionitem.detail}
                                        fontcolor = {optionitem.color}
                                        icon = {iconList[round]}            
                                    />
                                </Box> 
                                )
                            })}
                        </VStack>
                        
                    </VStack>
                )
            })}
            <Box p = {2}>
                <DarkmodeButton/>
            </Box>
            

        </VStack>
    </Box>
  )
}

export default Settings;