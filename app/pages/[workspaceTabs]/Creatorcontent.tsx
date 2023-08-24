import React,{useContext , useRef , useEffect} from 'react'
import { Box , VStack} from 'native-base'
import { ImageBackground, ScrollView } from 'react-native'
import { ThemeContext } from '../../../systems/Theme/ThemeProvider'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Dashboardbar from '../../components/creater/[container]/Dashboardbar'
import Headercontent from '../../components/creater/[container]/Headercontent';
import EpisodeList_Edit from '../../components/[stack]/Novel/[container]/chapter/EpisodeList_Edit';

import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../systems/redux/reducer';
import { AnyAction } from 'redux';
import { useSelector , useDispatch } from 'react-redux';
import { getCollectionData } from '../../../systems/redux/action';
import { useRoute } from '@react-navigation/native';

interface Pageprops {
  route : any
}
const Creatorcontent : React.FC <Pageprops> = ({route}) =>{
  const theme:any = useContext(ThemeContext);
  const {id}:any =  route.params

  console.log("ID" ,id)
  const MAX_HEIGHT  = 220;
  const HEADER_HEIGHT_NARROWED = 90;
  const HEADER_HEIGHT_EXPANDED = 120; 

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const Collectionsdata = useSelector((state: any) => state.collectionsData)
  const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
  const selectedcollection = Collectionsdata.filter(filtereditems => filtereditems.id === id)

  useEffect(() => {
    if (!isReduxLoaded) dispatch(getCollectionData());
  }, [dispatch, isReduxLoaded])

  return (
      <Box flex = {1} bg = {theme.Bg.base} position={'relative'}>
        <Dashboardbar/>
        {selectedcollection.length > 0 && isReduxLoaded && 
        <>
          <Box w = '100%' h = {MAX_HEIGHT} bg = 'gray.200' position={'absolute'} zIndex={0} >
            <ImageBackground
              id='background-images'
              source={{ uri: selectedcollection[0].images }}
              alt="images"
              style={{
                width: '100%',
                height: '100%',
                opacity: 1,
                position: 'relative',
                // transform: [{
                //   scale: scrollY.interpolate({
                //     inputRange: [-500, 0],
                //     outputRange: [5, 1],
                //     extrapolateLeft: 'extend',
                //     extrapolateRight: 'clamp',
                //   })
                // }]
              }}>
              <Box width='100%' h={MAX_HEIGHT} bg='black' opacity={0.4} />
            </ImageBackground>
          </Box>
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              zIndex :1,
              position: 'relative',
              marginTop : HEADER_HEIGHT_NARROWED,
              paddingTop : HEADER_HEIGHT_EXPANDED
            }}
            >
            <VStack flex ={1} bg= {theme.Bg.base}  pb={HEADER_HEIGHT_EXPANDED}>
                <Headercontent data = {selectedcollection[0]}/>
                <EpisodeList_Edit/>
            </VStack>

            </ScrollView>
        </>
        }
      </Box>
  )
}

export default Creatorcontent;