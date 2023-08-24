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
        tag : 'system',
    }
]
    
  return (

    <Box w  = '100%' h=  '100%' bg = {theme.Bg.base}>
        <VStack p = {2}>
            {SettingsCategory.map((item ,key) => {
                const option = Settingmenu.filter((optionfiltered) => optionfiltered.tag == item.tag)
                return (
                    <VStack key = {key} space  ={3} mt = {3}>
                        <Text
                        pl = {5}
                        fontWeight={'semibold'}
                        color = {theme.Text.heading}
                        >{item.title}</Text>
                        <VStack   pl = {2} pr = {2}>
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
                       
                       
                        
                    </VStack>
                )
            })}
            
        </VStack>
    </Box>
  )
}

export default Settings;
