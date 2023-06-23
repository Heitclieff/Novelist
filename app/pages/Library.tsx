import React ,{FC}from 'react'
import { 
Box,
VStack,
HStack,
Text,
 } from 'native-base'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../systems/theme'

 // Components
import Showcasebar from '../components/library/[container]/Showcasebar'

import { userdata , Collectionsdata } from '../../assets/VisualCollectionsdata'
import Globalgrid from '../components/global/[layout]/Globalgrid'

interface Pageprops {}

const Library: React.FC <Pageprops> = () => {
  const {colorMode} = useColorMode();
  
  return (
    <VStack w = '100%' h = '100%' p = {2} bg = {colorMode === 'dark' ? Themecolor.bg.dark : Themecolor.bg.light}>
        <Showcasebar
        books='10'
        username = {userdata[0].username}
        image= {userdata[0].image}
        />
        
        <Box  w = '100%' pl = {3} >
            <HStack space = {1} alignItems={'center'}>
                <Box 
                w= {1.5} 
                h = '90%' 
                rounded={'md'}
                bg  = 'cyan.700'>

                </Box>
                <Text
                fontSize={'md'}
                fontWeight={'semibold'}
                >My Library
                </Text>
            </HStack>
           
        </Box>
        <Globalgrid
            collections={Collectionsdata}
            bottomSpace={160}
        />
    </VStack>
  )
}


export default Library;