import React, {useContext , useEffect}from 'react'
import { Box , Center , VStack} from 'native-base'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'
import { FlatList } from 'react-native'
import Bookmarkfields from '../../../components/[stack]/Bookmarks/[container]/Bookmarkfields'
import { useDispatch , useSelector } from 'react-redux'
import { AnyAction } from 'redux'
import { RootState } from '../../../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { getCollectionData } from '../../../../systems/redux/action'
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
           return <Center key = {index}>
              <MemorizedBookmarkfields  data = {item} id = {item.id}/>
            </Center>
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