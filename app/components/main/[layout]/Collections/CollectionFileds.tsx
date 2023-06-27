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
} from 'native-base'
import CollectionItems from './CollectionItems'
import { FontAwesome5 ,Entypo } from '@expo/vector-icons'
import { FlatList } from 'native-base'

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
  const renderCollectionItem = useCallback(
    (items : Collections, round : number) => (
      <MemorizedColletionItems
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
          color = {theme.Text.base}
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
        {React.useMemo(() => {
          return <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={collections}
          renderItem={({ item, index }:any) => renderCollectionItem(item, index)}
          onEndReachedThreshold={0.5}
        />
        } , [theme])}
      </VStack> 
    </Box>
  )
}

export default CollectionFields;
