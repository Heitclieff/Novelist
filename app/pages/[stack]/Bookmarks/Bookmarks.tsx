import React, {useContext , useEffect}from 'react'
import { Box , Center , VStack} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { FlatList } from 'react-native'
import Bookmarkfields from '../../../components/[stack]/Bookmarks/[container]/Bookmarkfields'
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { SwipeListView } from 'react-native-swipe-list-view'
import { getCollectionData } from '../../../../systems/redux/action'
import BookmarkRemoveButton from '../../../components/global/[container]/BookmarkRemoveButton'

interface Pageprops {}

const MemorizedBookmarkfields = React.memo(Bookmarkfields);
const Bookmarks : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeContext)

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
                   <MemorizedBookmarkfields key  = {index}  data = {item} id = {item.id}/>
                </Center>
              )}
              renderHiddenItem={ (data, rowMap) => (<BookmarkRemoveButton/>)}
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