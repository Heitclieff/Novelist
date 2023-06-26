import React,{FC , useCallback} from 'react'
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
    bottomSpace : number,
    theme :any
}   

interface Collections {
    id : number,
    title : string,
    images : string [],
    view : number,
}

const MemorizedCollectitonsItems = React.memo(CollectionItems);

const Globalgrid : React.FC <LayoutProps>= ({collections , bottomSpace = 0 ,theme}) => {

    const renderCollectionItem = useCallback(
        (item :  Collections, round : number) => (
          <Center>
            <MemorizedCollectitonsItems
                theme = {theme}
                title={item.title}
                images = {item.images}
                view = {item.view}
            />
        </Center>
        ),[theme]
      );

    return (
    <Box w=  '100%' p = {5} >
            <FlatGrid
                contentContainerStyle = {{paddingBottom : bottomSpace}}
                showsVerticalScrollIndicator = {false}
                itemDimension={130}
                data = {collections}
                spacing={10}
                renderItem={({item ,round}:any) => renderCollectionItem(item ,round)}
                >
            </FlatGrid>        
    </Box>
  )
}


export default Globalgrid;
