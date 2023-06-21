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
}   

const Globalgrid : React.FC <LayoutProps>= ({collections }) => {
    return (
    <Box w=  '100%' p = {5} >
            <FlatGrid
                contentContainerStyle = {{paddingBottom : 160}}
                showsVerticalScrollIndicator = {false}
                itemDimension={130}
                data = {collections}
                spacing={10}
                renderItem={({item}:any) => (
                    <Center>
                        <CollectionItems
                        title = {item.title}
                        images = {item.images}
                        view = {item.view}
                        />
                    </Center>
                    
                )}
                >
            </FlatGrid> 

            
    </Box>
  )
}


export default Globalgrid;
