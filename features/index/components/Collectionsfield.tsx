import React, { useCallback, useRef , Suspense , useContext} from 'react'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { 
Box,
VStack,
HStack,
Heading,
IconButton,
} from 'native-base'
import { View , FlatList } from 'react-native';
import { SpinnerItem } from '../../../components/Spinner';
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { useNavigation } from '@react-navigation/native';
import { CollectionSkelton } from '../../../components/skelton/index/collection';

const LazyCollectionItems = React.lazy(() => import('./Collectionitem'));

interface Fieldsprops {
  title : string
  collections  : any 
  isLoading : boolean
 }

interface Collections {
  item? : any
  data ? :any
  id : string  | number,
  title : string,
  images : string[ ];
  view : number;
}

const MemorizedColletionItems = React.memo(LazyCollectionItems)

const CollectionsField : React.FC <Fieldsprops> = ({title , collections , isLoading}) => {
  const theme: any = useContext(ThemeWrapper)
  const navigation = useNavigation();
  const flatListRef = useRef(null);


  const renderCollectionItem = useCallback(
    (item : Collections, round : number) => {
      const document : any = item.data()
      return(
        <Suspense fallback = {<CollectionSkelton args= {[0]}/>} key={round}>
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
          color = {theme.Text.heading}
          >
            {title}
          </Heading>
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
            <CollectionSkelton args= {[0,0,0]}/>
            :
            <FlatList
              ref = {flatListRef}
              initialNumToRender={5}
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
