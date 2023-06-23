import React,{FC} from 'react'
import { 
Box,
VStack,
} from 'native-base'
import Gridlayout from '../../../components/main/[layout]/Gridpoint/Gridlayout'
import { Collectionsdata } from '../../../../assets/VisualCollectionsdata'

interface Pageprops { 
  theme : any
}

const Topnovelpages : React.FC <Pageprops> = ({theme}) => {

  return (
    <Box 
    w = '100%' 
    h= '100%' 
    >
      <Gridlayout
        theme = {theme}
        collections = {Collectionsdata}
        title =  'Top Novels'
      />
    </Box>
    
  )
}

export default Topnovelpages;
