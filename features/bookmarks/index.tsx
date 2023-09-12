import React, {useContext , useEffect}from 'react'
import { 
Box , 
Center ,
 VStack} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { FlatList } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view'

//@Redux toolkits
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { getCollectionData } from '../../systems/redux/action'

//@Compoenents
import Bookmarkfield from './components/Bookmarkfield'
import Bookmarkbutton from '../../components/button/Bookmarkbutton'

interface Pageprops {}

const MemorizedBookmarkfield = React.memo(Bookmarkfield);

const Bookmarks : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeWrapper)
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsData)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);

    useEffect(() => {
        if (!isReduxLoaded) dispatch(getCollectionData());
    }, [dispatch, isReduxLoaded])

    const renderItem = React.useCallback(
        ({ item, index }:any) => {
           return( 
            <SwipeListView 
              key = {index}
              disableRightSwipe
              data={[0]}
              ItemSeparatorComponent={<Box h=  '2'/>}
              renderItem={(itemdisable:any , index:number) => (
                <Center>
                   <MemorizedBookmarkfield key  = {index}  data = {item} id = {item.id}/>
                </Center>
              )}
              renderHiddenItem={ (data, rowMap) => (<Bookmarkbutton/>)}
              leftOpenValue={60}
              rightOpenValue={-60}
              />
          )
        },[]
    ); 
  

  return (
    <VStack flex = {1} bg = {theme.Bg.base} pt = {2}>
        <FlatList
            showsVerticalScrollIndicator = {false}
            data={Collectionsdata}
            renderItem={renderItem}
            keyExtractor={(item:any) => item.id}
            style = {{flex:1}}
            ItemSeparatorComponent={() => <Box h = '2'/>}
            />
    </VStack>
  )
}

export default Bookmarks