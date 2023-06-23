import React,{FC} from 'react'
import { Box } from 'native-base'
//Component && Layout
import Globalgrid from '../../../components/global/[layout]/Globalgrid'

import { Collectionsdata } from '../../../../assets/VisualCollectionsdata'
interface pageprops {}

const Multiproject : React.FC <pageprops> = () => {
  return (
    <Box
    w =  '100%'
    h = '100%'
    >
      <Globalgrid
        collections ={Collectionsdata}
      />
    </Box>
  )
}

export default Multiproject;