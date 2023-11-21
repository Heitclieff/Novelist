import React,{useContext , useState, useRef , useEffect , useCallback} from 'react'
import { Box , VStack , Text , Center , Spinner} from 'native-base'
import { 
ImageBackground, 
ScrollView ,
View ,
Dimensions ,
RefreshControl, 
FlatList
} from 'react-native'
import FastImage from 'react-native-fast-image';
import { useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ThemeWrapper } from'../../systems/theme/Themeprovider';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';
//@Components
import Headercontent from './header';
import Elementnavigation from '../../components/navigation/Elementnavigation';

//@Sections
import EpisodeSection from './section/Episode';

//@Redux Toolkits
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useSelector , useDispatch } from 'react-redux';
import { RootState } from '../../systems/redux/reducer';
import { setChaptercontent , setProjectTeams} from '../../systems/redux/action';

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface Pageprops {
  route : any
}

const Memorizednavigation = React.memo(Elementnavigation);

const Creatorcontent : React.FC <Pageprops> = ({route}) =>{
  const theme:any = useContext(ThemeWrapper);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const chapterdocs = useSelector((state) => state.content);
  const projectdocs = useSelector((state) => state.docs.docs)
  const useraccount = useSelector((state) => state.userData);

  const {projectdocument , snapshotcontent , id , isupdated , mainrefresh} :any = route.params;
  const [isLoading , setisLoading] = useState<boolean>(true);
  const [refreshing , setRefreshing] = useState<boolean>(false);

  const Screenheight = Dimensions.get('window').height;
  const MAX_HEIGHT  = Screenheight / 2.5;
  const HEADER_HEIGHT_NARROWED = 90;
  const HEADER_HEIGHT_EXPANDED = MAX_HEIGHT / 2.5; 

  const Redirectnavigation = (direction:never) => {
        navigation.navigate(direction);
  }

  const fetchchaptercontent = async () : Promise <void> => {
    try {
      const userdocs = await fetchmemberAccount();
      const snapshotchapter = snapshotcontent.collection('Chapters');
      const getchapter  = await snapshotchapter.orderBy('updateAt' , 'desc').get();

      const chapterdocs = getchapter.docs.map(doc => ({
        id : doc.id , 
        updatedimg :userdocs?.find(filteraccount => filteraccount.id === doc.data().updatedBy)?.pf_image,
        ...doc.data() , 
        }))

      
      dispatch(setChaptercontent({content : chapterdocs , id , snapshotchapter : snapshotchapter}));
      dispatch(setProjectTeams({teams : userdocs}))

      setisLoading(false);

    } catch(error) {
      console.error('Error fetching chapter data:', error);
    }
  }

  const fetchmemberAccount = async () => {
    try {
         const creatorDocs = projectdocs.creators.map(doc => doc.userDoc);
         const snapshotuser = await firestore().collection('Users')
         .where(firestore.FieldPath.documentId() , 'in' ,  creatorDocs)
         .get();

         const snapshotuserMap = new Map(snapshotuser?.docs.map(doc => [doc.id, doc]));
         const userdocs = creatorDocs.map((doc_id:string , index:number) => {
          const doc = snapshotuserMap.get(doc_id)?.data();
            return {
                id : doc_id ,
                doc_id : projectdocs.creators[index].doc_id,
                isleader : projectdocs.owner === doc_id,
                owner : projectdocs.owner,
                isyou : doc_id === useraccount[0].id,
                pending : projectdocs.creators[index].pending ,
                ...doc
              }
              });
        return userdocs;
     }catch(error) {    
         console.error("Error fetching document:", error);
     }
  }



  const initailfetchContent = () => {  
      if(refreshing){
        fetchchaptercontent();  
      }

      if(chapterdocs){
        if(chapterdocs.id === id) {
          setisLoading(false)
          return
        }
      }  
      fetchchaptercontent();  
  }

  
  const onRefresh = React.useCallback(() => {
    mainrefresh(true);
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);


  useEffect(() => {
    initailfetchContent();
  },[refreshing ])

  return (
      <Box flex = {1} bg = {theme.Bg.base} position={'relative'}>
        {/* <Dashboardbar/> */}
        <Memorizednavigation 
            Contentfixed = {false}
            rightElement={[
            {icon : <AntdesignIcon size = {20} color = {theme.Icon.static} name = 'setting'/> , navigate : () => Redirectnavigation('Project Settings')} ,
            {icon : <AntdesignIcon size = {20} color = {theme.Icon.static} name = 'appstore-o'/> , navigate : navigation.openDrawer}]}
        />
        {projectdocs  && 
        <>
          <Box w = '100%' h = {MAX_HEIGHT} bg = 'gray.200' position={'absolute'} zIndex={0} >
            <FastImage
              id='background-images'
              style={{
                width: '100%',
                height: '100%',
                opacity: 1,
                position: 'relative',
              }}
              source={{
                uri : projectdocs.image  , 
                priority : FastImage.priority.normal
              }}
              alt = "images"
              resizeMode={FastImage.resizeMode.cover}
            >
                
              <Box width='100%' h={MAX_HEIGHT} bg='black' opacity={0.4} />
            </FastImage>
          </Box>

          <FlatList
            data={[0]}
            showsVerticalScrollIndicator = {false}
            refreshControl={
              <RefreshControl refreshing = {refreshing} onRefresh={onRefresh}/>
            }
            style={{
              zIndex: 1,
              position: 'relative',
              marginTop: HEADER_HEIGHT_NARROWED,
              paddingTop: HEADER_HEIGHT_EXPANDED
            }}
            ListFooterComponent={<View style={{ height: HEADER_HEIGHT_EXPANDED }} />}
            renderItem={({ item, index }) => (
              <VStack flex={1} bg={theme.Bg.base}>
              
                <Headercontent 
                data={projectdocs} 
                id = {id}
                timestamp = {{createAt : projectdocs.createAt , updatedAt : projectdocs.lastUpdate}}
                />
                {isLoading ? 
                <Center mt = {5}>
                    <Spinner accessibilityLabel="Loading posts" />   
                </Center>
                  :
                <EpisodeSection doc_id = {id}/> }
              </VStack>
            )}
          />
        </>
        }
      </Box>
  )
}

export default Creatorcontent; 