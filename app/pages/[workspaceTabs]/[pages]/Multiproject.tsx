import React,{FC} from 'react'
import { Box } from 'native-base'
//Component && Layout
import Globalgrid from '../../../components/global/[layout]/Globalgrid'

import { Collectionsdata, userdata } from '../../../../assets/VisualCollectionsdata'
interface pageprops {}

const Multiproject : React.FC <pageprops> = () => {
  return (
    <Box
    w =  '100%'
    >
      <Globalgrid
        collections ={Collectionsdata}
        multiproject = {userdata}
      />
    </Box>
  )
}

export default Multiproject;