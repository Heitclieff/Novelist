import React, {FC , useCallback} from 'react'
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
import { Themecolor } from '../../../../../systems/theme'

interface Fieldsprops {
  title : string,
  collections  : any ,
  theme : any
 }

interface Collections {
  title : string,
  images : string[ ];
  view : number;
  theme : any,
}

const MemorizedColletionItems = React.memo(CollectionItems)

const CollectionFields : React.FC <Fieldsprops> = ({title , collections ,theme}) => {
  const textcolor = theme === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light
  const renderCollectionItem = useCallback(
    (items : Collections, round : number) => (
      <MemorizedColletionItems
      key = {round}
      theme= {theme}
      title = {items.title}
      view = {items.view}
      images = {items.images}
      />
    ),[theme]
  );
  return (
    <Box
    w =  '100%'
    h =  {350}
    p = {5}
    overflow = 'auto'
    >
      <VStack
      space= {3}
      >
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Heading 
          size= 'md'
          color = {theme === 'dark' ? Themecolor.infotext.dark : Themecolor.infotext.light}
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
            {collections
            ? collections.map((items: any, round: number) =>
                renderCollectionItem(items, round)
              )
            : null}
          </HStack>
        </ScrollView>
      </VStack> 
    </Box>
  )
}

export default CollectionFields;
