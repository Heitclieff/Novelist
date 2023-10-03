import React,{useContext , useState, useRef , useEffect , useCallback} from 'react'
import { Box , VStack} from 'native-base'
import { ImageBackground, ScrollView ,View ,Dimensions } from 'react-native'
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeWrapper } from'../../systems/theme/Themeprovider';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
//@Components
import { FlatList } from 'react-native';
import Headercontent from './header';
import Elementnavigation from '../../components/navigation/Elementnavigation';

//@Sections
import EpisodeSection from './section/Episode';

//@Redux Toolkits
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '../../systems/redux/reducer';
// import { getCollectionData } from '../../systems/redux/action';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
  route : any
}

const Memorizednavigation = React.memo(Elementnavigation);

const Creatorcontent : React.FC <Pageprops> = ({route}) =>{
  const theme:any = useContext(ThemeWrapper);
  const navigation = useNavigation();
  const Screenheight = Dimensions.get('window').height;
  const {id}:any =  route.params

  const MAX_HEIGHT  = Screenheight / 2.5;
  const HEADER_HEIGHT_NARROWED = 90;
  const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 2.5; 

  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
  const [projectdocument , setProjectdocument] = useState<{}>({});
  // // const Collectionsdata = useSelector((state: any) => state.collectionsData)
  // // const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
  // const [isReduxLoaded, setisReduxLoaded] = useState<Boolean>(false)
  // const selectedcollection = Collectionsdata.filter(filtereditems => filtereditems.id === id)


  const Redirectnavigation = (direction:never) => {
        navigation.navigate(direction);
  }

  const getProjectcontent = async () => {
    const snapshotproject = await firestore().collection('Novels').doc(id).get();
    const projectdocs = snapshotproject.data();

    setProjectdocument(projectdocs);
  }
  useEffect(() => {
      getProjectcontent()
  }, [id])

  return (
      <Box flex = {1} bg = {theme.Bg.base} position={'relative'}>
        {/* <Dashboardbar/> */}
        <Memorizednavigation 
            Contentfixed = {false}
            rightElement={[
            {icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'setting'/> , navigate : () => Redirectnavigation('Project Settings')} ,
            {icon : <AntdesignIcon size = {15} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
        />
        {projectdocument  && 
        <>
          <Box w = '100%' h = {MAX_HEIGHT} bg = 'gray.200' position={'absolute'} zIndex={0} >
            <ImageBackground
              id='background-images'
              source={{ uri: projectdocument.image}}
              alt="images"
              style={{
                width: '100%',
                height: '100%',
                opacity: 1,
                position: 'relative',
              }}>
              <Box width='100%' h={MAX_HEIGHT} bg='black' opacity={0.4} />
            </ImageBackground>
          </Box>

          <FlatList
            data={[0]}
            showsVerticalScrollIndicator = {false}
            style={{
              zIndex: 1,
              position: 'relative',
              marginTop: HEADER_HEIGHT_NARROWED,
              paddingTop: HEADER_HEIGHT_EXPANDED
            }}
            ListFooterComponent={<View style={{ height: HEADER_HEIGHT_EXPANDED }} />}
            renderItem={({ item, index }) => (
              <VStack flex={1} bg={theme.Bg.base}>
                <Headercontent data={projectdocument} timestamp = {{createAt : projectdocument.createAt , updatedAt : projectdocument.lastUpdate}} />
                <EpisodeSection/>
              </VStack>
            )}
          />
        </>
        }
      </Box>
  )
}

export default Creatorcontent; 