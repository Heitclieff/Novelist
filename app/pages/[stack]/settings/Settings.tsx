import React,{FC} from 'react'
import { 
Box,
VStack,
HStack,
Text, } from 'native-base'
import Optionfield from '../../../components/global/[container]/Optionfield'
import { Settingmenu } from '../../../../assets/VisualCollectionsdata'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../../../systems/theme'

interface Pageprops {
    theme : any ,
    setTheme :any ,
}

const Settings : React.FC <Pageprops> = ({theme ,setTheme})  => {
    const {colorMode} = useColorMode();
    const SettingsCategory = [{
        title : 'Account And Privacy',
        tag : 'account',
    },
    {
        title : 'Notification',
        tag : 'notification',
    },
    {
        title : 'Systems',
        tag : 'system'
    }
]

  return (

    <Box w  = '100%' h=  '100%' bg = {theme === 'dark' ? Themecolor.bg.dark : Themecolor.bg.light}>
        <VStack p = {5} >
            {SettingsCategory.map((item ,key) => {
                const option = Settingmenu.filter((optionfiltered) => optionfiltered.tag == item.tag)
                return (
                    <VStack key = {key}>
                        <Text
                        fontWeight={'semibold'}
                        color = {theme === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light}
                        >{item.title}</Text>
                        {option.map((optionitem , key) => {
                            return( 
                                <Box mb = {1} key = {key}>
                                    <Optionfield
                                        theme =  {theme}
                                        title = {optionitem.title}
                                        isDividerEnable = {false}
                                        justifyIcon  = 'start'
                                        detail = {optionitem.detail}
                                        fontcolor = {optionitem.color}
                                        OptionIcon={{
                                            type : optionitem.icon,
                                            name : optionitem.name,
                                        }
                                        }
                                        
                                    />
                                </Box>
                                
                            )
                        })}
                        
                    </VStack>
                )
            })}
            
        </VStack>
    </Box>
  )
}

export default Settings;
