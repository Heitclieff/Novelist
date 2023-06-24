import React,{FC} from 'react'
import { Box, ScrollView } from 'native-base'
import CategoryGrid from '../components/category/[layout]/CategoryGrid'
import { Categorydata } from '../../assets/VisualCollectionsdata'
import { useColorMode } from 'native-base'
import { Themecolor } from '../../systems/theme'

interface Pageprops {
  theme : any
 }

const Category: React.FC <Pageprops> = ({theme}) => {
  const {colorMode} = useColorMode();
  return (
    <Box
    w = '100%'
    h = '100%'
    py = {3}
    bg = {theme.Bg.base}
    >
      <ScrollView
      showsVerticalScrollIndicator = {false}
      />
      <CategoryGrid
        theme = {theme}
        category={Categorydata}
        />
    </Box>
  )
}

export default Category;