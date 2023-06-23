import React,{FC} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
Center,
} from 'native-base'
import { FlatGrid } from 'react-native-super-grid'
import CollectionItems from '../Collections/CollectionItems'
import { Dimensions, SafeAreaView ,View} from 'react-native'
import { Themecolor } from '../../../../../systems/theme'

interface LayoutProps {
    collections : any
    title : string
    theme : any
}   

interface Collections {
    title : string,
    images : string [] ,
    view : number,
}

const MemorizedCollectitonsItems = React.memo(CollectionItems)

const Gridlayout : React.FC <LayoutProps>= ({collections ,title , theme}) => {

    const renderItem = ({item}: {item:Collections}) => (
        <Center>
            <MemorizedCollectitonsItems
                theme  = {theme} 
                title={item.title}
                images = {item.images}
                view = {item.view}
            />
        </Center>
    )
    return (
    <Box w=  '100%' p = {5} >
            <Text
            fontSize={'md'}
            fontWeight={'semibold'}
            color = {theme === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light}

            >   {title ? title : 'Title'}
            </Text>

            <FlatGrid
                contentContainerStyle = {{paddingBottom : 150}}
                showsVerticalScrollIndicator = {false}
                itemDimension={130}
                data = {collections}
                spacing={10}
                renderItem={renderItem}
                >
            </FlatGrid>    
    </Box>
  )
}


export default Gridlayout;
