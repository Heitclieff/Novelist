import React,{FC} from 'react'
import { Box, ScrollView } from 'native-base'
import CategoryGrid from '../components/category/[layout]/CategoryGrid'
import { Categorydata } from '../../assets/VisualCollectionsdata'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../systems/theme'

interface Pageprops { }

const Category: React.FC <Pageprops> = () => {
  const {colorMode} = useColorMode();
  return (
    <Box
    w = '100%'
    h = '100%'
    py = {3}
    bg = {colorMode === 'dark' ? Themecolor.bg.dark : Themecolor.bg.light}
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