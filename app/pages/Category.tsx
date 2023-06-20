import React,{FC} from 'react'
import { Box, ScrollView } from 'native-base'
import CategoryGrid from '../components/category/[layout]/CategoryGrid'
import { Categorydata } from '../../assets/VisualCollectionsdata'
interface Pageprops { }

const Category: React.FC <Pageprops> = () => {
  return (
    <Box
    w = '100%'
    h = '100%'
    py = {3}
    >
      <ScrollView
      showsVerticalScrollIndicator = {false}
      />
      <CategoryGrid
          category={Categorydata}
        />
    </Box>
  )
}

export default Category;