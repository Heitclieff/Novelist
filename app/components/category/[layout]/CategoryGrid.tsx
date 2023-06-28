import React,{FC, useCallback , Suspense} from 'react'
import { 
Box,
ScrollView,
Text,
} from 'native-base';
import { FlatGrid } from 'react-native-super-grid';
const LazyCategoryItems = React.lazy(() => import('../[container]/CategoryItems'));


interface LayoutProps {
  category : any , 
}

interface Collections {
  images : string, 
  title : string
}

const MemorizedCategoryItems = React.memo(LazyCategoryItems)

const CategoryGrid : React.FC <LayoutProps> = ({category}) => {

  const renderCollectionItem = useCallback(
    (item : Collections, round : number) => (
        <Suspense fallback = {<Box>Loading...</Box>}>
          <MemorizedCategoryItems
            key = {round}
            images = {item.images}
            title = {item.title}
          />
        </Suspense>
      
    ),[]
  );
  
  return (
    <Box w=  '100%' p = {5} >
      <FlatGrid
      showsVerticalScrollIndicator = {false}
      itemDimension={180}
      data = {category}
      spacing={10}
      renderItem={({item,index}):any => renderCollectionItem(item ,index)}
      >
      </FlatGrid> 
  </Box>
  )
}

export default CategoryGrid;