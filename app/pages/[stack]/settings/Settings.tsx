import React,{FC , Suspense} from 'react'
import { 
Box,
VStack,
HStack,
Text, } from 'native-base'
const LazyOptionfield = React.lazy(() => import('../../../components/global/[container]/Optionfield'));
import { Settingmenu } from '../../../../assets/VisualCollectionsdata'
import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

interface Pageprops {
    setTheme :any ,
}

const MemorizedOptionfield = React.memo(LazyOptionfield)

const Settings : React.FC <Pageprops> = ({setTheme})  => {
    const theme:any = useContext(ThemeContext);

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

    <Box w  = '100%' h=  '100%' bg = {theme.Bg.base}>
        <VStack p = {5} >
            {SettingsCategory.map((item ,key) => {
                const option = Settingmenu.filter((optionfiltered) => optionfiltered.tag == item.tag)
                return (
                    <VStack key = {key}>
                        <Text
                        fontWeight={'semibold'}
                        color = {theme.Text.heading}
                        >{item.title}</Text>
                        <Suspense fallback = {<Box>Loading..</Box>}>
                            {option.map((optionitem , key) => {
                                return( 
                                    <Box mb = {1} key = {key}>
                                        <MemorizedOptionfield
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
                        </Suspense>
                       
                        
                    </VStack>
                )
            })}
            
        </VStack>
    </Box>
  )
}

export default Settings;
