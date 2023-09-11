import React,{useContext, useEffect} from 'react'
import { 
Box , 
VStack , 
Text , 
HStack } from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { FlatList } from '../../../components/layout/Flatlist/FlatList'
// import ContentNavigation from '../../../../components/[stack]/Novel/[container]/ContentNavigation'

//@Redux Toolkits
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { useRoute } from '@react-navigation/native'
import { getCollectionData } from '../../../systems/redux/action'
import Chapternavigation from '../../../components/navigation/Chapternavigation'

interface pageProps {}
const Readcontent : React.FC <pageProps> = () => {
     const theme:any = useContext(ThemeWrapper)
     const route = useRoute();
     const {p_id}:any = route.params


     const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
     const Collectionsdata = useSelector((state: any) => state.collectionsData)
     const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
     const selectedcollection = Collectionsdata.filter(filtereditems => filtereditems.id === p_id)
 
     useEffect(() => {
          if (!isReduxLoaded) dispatch(getCollectionData());
      }, [dispatch, isReduxLoaded])
  
  return (
    <VStack bg = {theme.Bg.base} flex ={1}>
          <Chapternavigation/>
          <FlatList>
          {selectedcollection.length > 0 && isReduxLoaded &&
               <VStack flex = {1}  p = {5} space = {5}>
                    <HStack id = "story-heading-wrap" justifyContent={'center'} >
                         <VStack w = '80%' id = 'story-heading' alignItems={'center'} space = {1}>
                              <Text color={theme.Text.description} textAlign={'center'}>{`${selectedcollection[0].title}`}</Text>
                              <Text color = {theme.Text.base} fontWeight={'semibold'} fontSize={'md'}>Chapter Name</Text>
                         </VStack>
                    </HStack>
                    <VStack p = {2}>
                         <Text id = "Novel-content" color = {theme.Text.base}>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                              Similique id odio possimus at? Culpa dicta officiis 
                              nesciunt illo minima consectetur voluptatibus 
                              at sequi voluptas! Laboriosam debitis doloribus quo ipsum 
                              officiis.
                         </Text>
                    </VStack>

               </VStack>
               
          }
               
          </FlatList>
    </VStack>
  )
}

export default Readcontent;