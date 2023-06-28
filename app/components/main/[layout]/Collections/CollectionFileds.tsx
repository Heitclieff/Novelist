import React, {FC , useCallback , Suspense} from 'react'
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
const LazyCollectionItems = React.lazy(() => import('./CollectionItems'));
import { FontAwesome5 ,Entypo } from '@expo/vector-icons'
import { FlatList } from 'native-base'
import { useContext } from 'react'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'

interface Fieldsprops {
  title : string,
  collections  : any ,
  theme : any
 }

interface Collections {
  title : string,
  images : string[ ];
  view : number;
}

const MemorizedColletionItems = React.memo(LazyCollectionItems)

const CollectionFields : React.FC <Fieldsprops> = ({title , collections}) => {
  const theme:any = useContext(ThemeContext)
  const renderCollectionItem = useCallback(
    
    (items : Collections, round : number) => (
      <Suspense fallback = {<Box>Loading...</Box>}>
        <MemorizedColletionItems
            title = {items.title}
            view = {items.view}
            images = {items.images}
            />
      </Suspense>
    ),[]
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
        } , [collections])}
      </VStack> 
    </Box>
  )
}

export default CollectionFields;
