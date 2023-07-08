import React,{FC , useCallback , Suspense} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
Center,
} from 'native-base'
import { FlatGrid } from 'react-native-super-grid'
const LazyCollectionItems = React.lazy(() => import('../../main/[layout]/Collections/CollectionItems'));
interface LayoutProps {
    collections : any
    bottomSpace : number,
}   

interface Collections {
    id : number,
    title : string,
    images : string [],
    view : number,
}

const MemorizedCollectitonsItems = React.memo(LazyCollectionItems);

const Globalgrid : React.FC <LayoutProps>= ({collections , bottomSpace = 0 }) => {

    const renderCollectionItem = useCallback(
        (item :  Collections, round : number) => (
          <Suspense fallback={<Box>Loading...</Box>}>
            <Center>
              <MemorizedCollectitonsItems
                id = {item.id}
                title={item.title}
                images={item.images}
                view={item.view}
              />
            </Center>
          </Suspense>
        
        ),[]
      );

    return (
    <Box w=  '100%' p = {5} >
      {React.useMemo(() => {
        return <FlatGrid
        contentContainerStyle = {{paddingBottom : bottomSpace}}
        showsVerticalScrollIndicator = {false}
        itemDimension={130}
        data = {collections}
        spacing={10}
        renderItem={({item ,round}:any) => renderCollectionItem(item ,round)}
        />     
      } , [])}
           
    </Box>
  )
}


export default Globalgrid;
