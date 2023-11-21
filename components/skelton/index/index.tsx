import React,{useContext} from 'react'
import { VStack , Text } from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'

export const IndexSkelton = () => {
const theme:any = useContext(ThemeWrapper);
  return (
    <VStack>Index skleton</VStack>
  )
}
