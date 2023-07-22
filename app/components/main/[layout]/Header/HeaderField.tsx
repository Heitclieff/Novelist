import React, {useMemo , Suspense , useCallback , useContext} from 'react'
import { Box , HStack, Text , Heading, VStack} from 'native-base';
import HeaderItem from '../../[container]/HeaderItem';
import { FlatList } from 'native-base';
import { View } from 'react-native';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';


interface layoutProps {
    collections : any,
}
const HeaderField : React.FC <layoutProps> = ({collections}) => {
    const theme:any = useContext(ThemeContext)
    const renderCollectionItem = useCallback(
        (item : Collections, round : number) => (
            <Suspense callback = {<Box>Loading..</Box>}>
                <HeaderItem data={item}/>
            </Suspense>
          
        ),[]
      );

  return (
    <VStack w = '100%' h = '280'  justifyContent={'center'}>
        <VStack space = {3}>
        <Heading color = {theme.Text.base} fontWeight={'bold'}>Most Popular</Heading>
        {React.useMemo(() => {
            return <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={collections}
            renderItem={({ item, index }:any) => renderCollectionItem(item, index)}
            ItemSeparatorComponent={() => <View style={{width: 20}} />}
            onEndReachedThreshold={0.5}
            />
            } , [collections])}
        </VStack>
    </VStack>
  )
}

export default HeaderField;