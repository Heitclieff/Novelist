import React,{FC} from 'react'
import { 
Box,
ScrollView,
Text,
} from 'native-base';
import CategoryItems from '../[container]/CategoryItems';
import { FlatGrid } from 'react-native-super-grid';

interface LayoutProps {
  category : any
}

const CategoryGrid : React.FC <LayoutProps> = ({category}) => {
  return (
    <Box w=  '100%' p = {5} >
      <FlatGrid
      showsVerticalScrollIndicator = {false}
      itemDimension={180}
      data = {category}
      spacing={10}
      renderItem={({item}:any) => (
        <CategoryItems
          images = {item.images}
          title = {item.title}
        />
      )}>
      </FlatGrid> 
  </Box>
  )
}

export default CategoryGrid;