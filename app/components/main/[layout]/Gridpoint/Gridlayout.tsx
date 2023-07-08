import React,{FC , Suspense, useCallback} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
Center,
} from 'native-base'
import { FlatGrid } from 'react-native-super-grid'
const LazyCollectionItems = React.lazy(() => import('../Collections/CollectionItems'));
import { useContext } from 'react'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'


interface LayoutProps {
    collections : any
    title : string
}   

interface Collections {
    title : string,
    images : string [] ,
    view : number,
}

const MemorizedCollectitonsItems = React.memo(LazyCollectionItems)

const Gridlayout : React.FC <LayoutProps>= ({collections ,title }) => {
    const theme:any = useContext(ThemeContext)
    const renderCollectionItem = useCallback(
        (item : Collections, round : number) => (
            <Suspense fallback = {<Box>Loading...</Box>}>
                <Center>
                    <MemorizedCollectitonsItems
                        id = {item.id}
                        title={item.title}
                        images = {item.images}
                        view = {item.view}
                    />
                </Center>
            </Suspense>
           
        ),[]
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
            }, [collections])}
    </Box>
  )
}


export default Gridlayout;
