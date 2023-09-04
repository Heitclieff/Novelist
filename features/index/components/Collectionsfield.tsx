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
}

const MemorizedColletionItems = React.memo(LazyCollectionItems)

const CollectionsField : React.FC <Fieldsprops> = ({title , collections}) => {
  const theme:any = useContext(ThemeWrapper)
  const navigation = useNavigation();
  const renderCollectionItem = useCallback(
    
    (item : Collections, round : number) => (
      <Suspense fallback = {<Box>Loading...</Box>}>
        <MemorizedColletionItems
            id = {item.id}
            title = {item.title}
            view = {item.view}
            images = {item.images}
            />
      </Suspense>
    ),[]
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
            onPress={() => navigation.navigate('ItemlistTemplete',{title})}
            rounded={'full'}
            // icon = {
            //     <Icon 
            //     as = {Entypo}
            //     name = 'chevron-right'
            //     ></Icon>
            // }
            />
          </Box>
        </HStack>
        {React.useMemo(() => {
          return <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={collections}
          renderItem={({ item, index }:any) => renderCollectionItem(item, index)}
          ItemSeparatorComponent={() => <View style={{width: 0}} />}
          onEndReachedThreshold={0.5}
        />
        } , [collections])}
      </VStack> 
    </Box>
  )
}

export default CollectionsField;
