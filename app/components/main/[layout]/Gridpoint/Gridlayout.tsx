import React,{FC} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
} from 'native-base'
import { FlatGrid } from 'react-native-super-grid'
import CollectionItems from '../Collections/CollectionItems'
import { Dimensions, SafeAreaView ,View} from 'react-native'

interface LayoutProps {
    collections : any
    title : string
}   

const Gridlayout : React.FC <LayoutProps>= ({collections ,title}) => {
    return (
    <Box w=  '100%' p = {5} >
            <Text
            fontSize={'md'}
            fontWeight={'semibold'}

            >   {title ? title : 'Title'}
            </Text>

            <FlatGrid
                contentContainerStyle = {{paddingBottom : 150}}
                showsVerticalScrollIndicator = {false}
                itemDimension={130}
                data = {collections}
                spacing={10}
                renderItem={({item}:any) => (
                    <CollectionItems
                    title = {item.title}
                    images = {item.images}
                    view = {item.view}
                    />
                )}
                >
            </FlatGrid> 

            
    </Box>
  )
}


export default Gridlayout;
