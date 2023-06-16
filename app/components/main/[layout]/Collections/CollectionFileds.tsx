import React, {FC} from 'react'
import { 
Box,
VStack,
HStack,
Text,
Heading,
Button,
Icon,
IconButton,
ScrollView
} from 'native-base'
import CollectionItems from './CollectionItems'
import { FontAwesome5 ,Entypo } from '@expo/vector-icons'

interface Fieldsprops {
  title : string,
  collections  : any
 }

const CollectionFields : React.FC <Fieldsprops> = ({title , collections}) => {
  return (
    <Box
    w =  '100%'
    h = "350px"
    p = {5}
    overflow = 'auto'
    >
      <VStack
      space= {3}
      >
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Heading 
          size= 'md'
          color = 'gray.700'
          >{title}</Heading>
          <Box>
            <IconButton 
            icon = {
                <Icon 
                as = {Entypo}
                name = 'chevron-right'
                ></Icon>
            }/>
          </Box>
        </HStack>
        <ScrollView 
        showsHorizontalScrollIndicator = {false}
        horizontal = {true}>
          <HStack 
          space= {5}
          w = '100%'
          >
            {collections ? 
                  collections.map((items:any, round:number) => {
                    return (
                      <CollectionItems
                        key = {round}
                        title = {items.title}
                        view = {items.view}
                        images = {items.images}
                      /> 
                    )
                  })
                  : null
                }
          </HStack>
        </ScrollView>
       
           
      </VStack> 
    </Box>
  )
}

export default CollectionFields;
