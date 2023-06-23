import React,{FC} from 'react'
import { Box } from 'native-base'
//Component && Layout
import Globalgrid from '../../../components/global/[layout]/Globalgrid'

import { Collectionsdata, userdata } from '../../../../assets/VisualCollectionsdata'
interface pageprops {
  theme : any
}

const Singleproject : React.FC <pageprops> = ({theme}) => {
  return (
    <Box
    w =  '100%'
    h = '100%'
    >
      <Globalgrid
        theme = {theme}
        collections ={Collectionsdata}
      />
    </Box>
  )
}

export default Singleproject;