import React,{useContext, useEffect} from 'react'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { Box , VStack , Text , HStack } from 'native-base'
import ContentNavigation from '../../../../components/[stack]/Novel/[container]/ContentNavigation'
import { Flatlist } from '../../[global]/Flatlist'
import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { getCollectionData } from '../../../../../systems/redux/action'
import { useRoute } from '@react-navigation/native'

interface pageProps {}
const NovelReadContent : React.FC <pageProps> = () => {
     const theme:any = useContext(ThemeContext)
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
          <ContentNavigation/>
          <Flatlist>
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
               
          </Flatlist>
    </VStack>
  )
}

export default NovelReadContent;
