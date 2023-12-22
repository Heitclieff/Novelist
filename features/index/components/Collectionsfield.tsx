import React, { useCallback , Suspense} from 'react'
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
import { View } from 'react-native';
import { FlatList } from 'native-base'
import { useContext } from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import { CollectionSkelton } from '../../../components/skelton/index/collection';
import EntypoIcon from 'react-native-vector-icons/Entypo'

const LazyCollectionItems = React.lazy(() => import('./Collectionitem'));

interface Fieldsprops {
  title : string,
  collections  : any ,
  theme : any
 }

interface Collections {
  id : string  | number,
  title : string,
  images : string[ ];
  view : number;
  isLoading : boolean
}

const MemorizedColletionItems = React.memo(LazyCollectionItems)

const CollectionsField : React.FC <Fieldsprops> = ({title , collections , isLoading}) => {
  const theme:any = useContext(ThemeWrapper)
  const navigation = useNavigation();
  const renderCollectionItem = useCallback(
    (item : Collections, round : number) => {
      const document = item.data()
      return(
        <Suspense fallback = {<Box>Loading...</Box>} key={round}>
        <MemorizedColletionItems
            id = {item.id}
            title = {document.title}
            view = {document.view}
            images = {document.image}
            like = {document.like}
            />
      </Suspense>
      )
  
    },[]
  );

  return (
    <Box
    w =  '100%'
    h =  {350}
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
            onPress={() => navigation.navigate('Template',{title, path : 'Novels'})}
            rounded={'full'}
            icon = {
                <EntypoIcon 
                name = 'chevron-right'
                size=  {25}
                color = {theme.Icon.base}
                />
            }
            />
          </Box>
        </HStack>

        {isLoading ?
            <CollectionSkelton/>
            :
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={collections}
              renderItem={({ item, index }:any) => renderCollectionItem(item, index)}
              ItemSeparatorComponent={() => <View style={{width: 0}} />}
              onEndReachedThreshold={0.5}
            />
          }
      </VStack> 
    </Box>
  )
}

export default CollectionsField;
