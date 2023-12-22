import React from 'react'
import { HStack , Spinner } from 'native-base'


export const SpinnerItem = () => {
  return (
    <HStack w = '100%' justifyContent={'center'}>
      <Spinner color = {'teal.500'}/>       
    </HStack>  
  )
}
