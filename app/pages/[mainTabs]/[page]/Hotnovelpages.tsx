import React,{FC} from 'react'
import { 
Box,
VStack,
} from 'native-base'
import Gridlayout from '../../../components/main/[layout]/Gridpoint/Gridlayout'
import { Collectionsdata } from '../../../../assets/VisualCollectionsdata'

interface Pageprops { }

const Hotnovelpages : React.FC <Pageprops> = () => {

  return (
    <Box 
    w = '100%' 
    h= '100%' 
    >
      <Gridlayout
        collections = {Collectionsdata}
        title =  'Hot Novels'
      />
    </Box>
    
  )
}

export default Hotnovelpages;
