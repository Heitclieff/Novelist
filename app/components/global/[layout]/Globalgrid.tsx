import React,{FC , useCallback , Suspense} from 'react'
import { 
Box,
ScrollView,
VStack,
Text,
Center,
} from 'native-base'
import { FlatList ,View } from 'react-native';
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
            <Box paddingX={3}>
              <MemorizedCollectitonsItems
                id = {item.id}
                title={item.title}
                images={item.images}
                view={item.view}
              />
            </Box>
          </Suspense>
        
        ),[]
      );

    return (
    <Box w=  '100%' p = {5} alignItems={'center'} >
      {React.useMemo(() => {
        return <FlatList
        contentContainerStyle = {{paddingBottom : bottomSpace}}
        showsVerticalScrollIndicator = {false}
        numColumns={2}
        data = {collections}
        renderItem={({item ,round}:any) => renderCollectionItem(item ,round)}
        ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />     
      } , [])}         
    </Box>
  )
}


export default Globalgrid;
