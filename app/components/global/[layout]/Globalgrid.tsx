import React,{FC} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
Center,
} from 'native-base'
import { FlatGrid } from 'react-native-super-grid'
import CollectionItems from '../../main/[layout]/Collections/CollectionItems'
import { Dimensions, SafeAreaView ,View} from 'react-native'

interface LayoutProps {
    collections : any
    bottomSpace : number
}   

interface Collections {
    title : string,
    images : string [],
    view : number,
}

const MemorizedCollectitonsItems = React.memo(CollectionItems);

const Globalgrid : React.FC <LayoutProps>= ({collections , bottomSpace = 0 }) => {


    const renderItem = ({item}: {item:Collections}) => (
        <Center>
            <MemorizedCollectitonsItems
                title={item.title}
                images = {item.images}
                view = {item.view}
            />
        </Center>
    )
    return (
    <Box w=  '100%' p = {5} >
            <FlatGrid
                contentContainerStyle = {{paddingBottom : bottomSpace}}
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


export default Globalgrid;
