import React,{FC , useCallback} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
Center,
} from 'native-base'
import { FlatGrid } from 'react-native-super-grid'
import CollectionItems from '../Collections/CollectionItems'

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
    const renderCollectionItem = useCallback(
        (item : Collections, round : number) => (
            <Center>
                <MemorizedCollectitonsItems
                    theme  = {theme} 
                    title={item.title}
                    images = {item.images}
                    view = {item.view}
                />
            </Center>
        ),[theme]
      );

    return (
    <Box w=  '100%' p = {5} >
            <Text
            fontSize={'md'}
            fontWeight={'semibold'}
            color = {theme.Text.base}

            >   {title ? title : 'Title'}
            </Text>
            {React.useMemo(() => {
                return   <FlatGrid
                contentContainerStyle = {{paddingBottom : 150}}
                showsVerticalScrollIndicator = {false}
                itemDimension={130}
                data = {collections}
                spacing={10}
                renderItem={({item , index}):any => renderCollectionItem(item ,index)}
                onEndReachedThreshold={0.5}
                />
            }, [theme])}
    </Box>
  )
}


export default Gridlayout;
