import React,{FC, useCallback} from 'react'
import { 
Box,
ScrollView,
Text,
} from 'native-base';
import CategoryItems from '../[container]/CategoryItems';
import { FlatGrid } from 'react-native-super-grid';

interface LayoutProps {
  category : any , 
  theme : any
}

interface Collections {
  theme : any,
  images : string, 
  title : string
}

const MemorizedCategoryItems = React.memo(CategoryItems)

const CategoryGrid : React.FC <LayoutProps> = ({category , theme}) => {

  const renderCollectionItem = useCallback(
    (item : Collections, round : number) => (
        <MemorizedCategoryItems
          key = {round}
          theme = {theme}
          images = {item.images}
          title = {item.title}
        />
    ),[theme]
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