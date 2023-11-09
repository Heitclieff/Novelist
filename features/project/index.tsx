import React,{Suspense, useMemo , useEffect, useState , useRef, useCallback , useContext} from 'react'
import { 
Box,
Icon,
VStack,
FormControl,
Input,
Text,
Button,
Pressable,
HStack,
Fab
} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider';
import { FlatList } from '../../components/layout/Flatlist/FlatList';
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

//@BottomSheetModal
import { 
BottomSheetModal , 
BottomSheetTextInput , 
useBottomSheetModal} from '@gorhom/bottom-sheet';
import { 
Platform , 
KeyboardAvoidingView,
Dimensions } from 'react-native';

//@components
import Elementnavigation from '../../components/navigation/Elementnavigation';
import CreatorItemfield from './components/Creator.itemfield';

//@Redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { setProjectContent } from '../../systems/redux/action';
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'

// firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface Pageprops { 
    theme : any
}

const Memorizednavigation = React.memo(Elementnavigation)
const MemorizedCreatorItemfield = React.memo(CreatorItemfield)

const Creator : React.FC <Pageprops> = () => {
    // const USER_ID = "1SyhXW6TeiWFGFzOWuhEqOsTOX23";
    const theme:any = useContext(ThemeWrapper);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const USER_DATA = useSelector((state) => state.userData)
    const projectdocs = useSelector((state) => state.project)
    const [Projectype , setProjectype] = useState<string>('');
    const [document , setDocument] = useState<any[]>([]);
    const [refreshing ,setRefreshing] = useState<boolean>(false);

    const {dismiss} = useBottomSheetModal();

    const getProjectContent = async () : Promise<void> => {
        try {
            const projectCollection = firestore().collection('Novels');
            const snapshotprojectkey = await firestore().collection('Users').doc(USER_DATA[0].id).get();
            const projectkey = snapshotprojectkey.data();

            const projectID = projectkey?.project;
            const snapshotproject = projectCollection.where(firestore.FieldPath.documentId(), 'in' , projectID.map(String))   
            const getProjectDocs = await snapshotproject.get();
            
            const projectdocs =  getProjectDocs.docs.map(doc => ({id : doc.id , ...doc.data()}));

            dispatch(setProjectContent({docs : projectdocs}))
            setDocument(projectdocs);

        }catch(error) {    
            console.error("Error fetching document:", error);
        
        }
    }
    
    useEffect(() => {
        getProjectContent();
    }, [refreshing])

    const windowHeight = Dimensions.get('window').height;
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['20%', '45%'], [windowHeight]);

    const handlePresentModalPress = useCallback(() => {
       bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {        
    }, []);

   const handleReturnChange = () => {
     bottomSheetModalRef.current?.snapToIndex(1);
   }

   const ProjectType = [{
        title : 'Single Project',
        type : 'single',
   },   
    {
        title : "Multi Project",
        type : 'multiple',
}]

  return (
    <VStack flex=  {1} bg = {theme.Bg.base} space = {2}>
        <Box >
            <Suspense fallback = {<Box>Loading...</Box>}>
                <Memorizednavigation title = "Create Project"
                    rightElement={[{icon : <AntdesignIcon size = {15} color = 'white'name = 'plus'/> , navigate : () => navigation.navigate('CreateProject')}]}
            />
            </Suspense>
        </Box>

        <Box flex = {1}>
                <FlatList refreshing = {refreshing} setRefreshing = {setRefreshing}>
                    <Box w= '100%' mt = {3}>
                    <Box pl = {6} pr = {6}>
                        <Input 
                        rounded={'full'} 
                        bg = {theme.Bg.container} 
                        borderColor={theme.Bg.comment} 
                        color={theme.Text.base}
                        h  = {9}
                        InputRightElement={<Icon as = {<EvilIcon name='search'/>} size = {5} mr = {2}/>}
                        placeholder='Enter your Project name'
                        />
                    </Box>   
            </Box> 
                <VStack space = {1} m ={5} mt = {5}>
                {projectdocs && projectdocs.docs?.length > 0  ?
                    projectdocs.docs?.map((item:any , index:number) => {
                        return(
                            <MemorizedCreatorItemfield 
                            key = {index} 
                            id = {item.id} 
                            title = {item.title}
                            status = {item.status}
                            image = {item.image}
                            creator = {item.creators}
                            /> 
                        )
                       
                    }
                        
                        ) 
                    : null
                }
                </VStack> 
            </FlatList>
        </Box>
        <Fab 
        renderInPortal={false} 
        shadow={2} bg ={'teal.600'} 
        size="sm" 
        onPress={() => navigation.navigate('CreateProject')}
        icon={<AntdesignIcon color="white" name="plus" size= {15} />} />
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            enablePanDownToClose = {true}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backgroundStyle = {{backgroundColor : theme.Bg.comment}}
            handleIndicatorStyle = {{backgroundColor : theme.Indicator.base}}
            >
                <VStack flex=  {1} space = {2}>
                <Box justifyContent={'center'} alignItems={'center'}>
                        <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Create Project</Text>
                </Box>
                <HStack space = {3} p = {4}>
                        {ProjectType.map((item:any ,index:number) => {
                            return(
                                <Pressable flex = {1} key=  {index}  onPress={() => setProjectype(item.type)}>
                                {({
                                    isHovered,
                                    isFocused,
                                    isPressed
                                }) => {
                                    return(
                                        <Box w= '100%'  h= '50' borderWidth={Projectype == item.type ? 2 : 1} borderColor={Projectype == item.type ? 'teal.600' :theme.Divider.comment} rounded={'full'} justifyContent={'center'} alignItems={'center'}>
                                            <Text color = {theme.Text.base} fontWeight={'semibold'}>{item.title}</Text>
                                        </Box>
                                    )}}
                                </Pressable>
                            )
                        })}
                    </HStack>
                <VStack w = '100%' p = {4} space = {5}>
                    <FormControl mb="5" >
                        <Text color = {theme.Text.base} fontWeight={'semibold'} pb = {2} >Project Title</Text>
                        <BottomSheetTextInput 
                        onSubmitEditing={handleReturnChange}     
                        placeholder='Enter your Project title'
                        placeholderTextColor={'#a3a3a3'}
                        style ={{
                            width : '100%' , 
                            height :35, 
                            borderRadius : 100 ,
                            color : 'white', 
                            backgroundColor : theme.Divider.comment , 
                            paddingLeft : 10}}/>
                        <FormControl.HelperText>
                        Give your a Project title.
                        </FormControl.HelperText>
                    </FormControl>
                <Button rounded={'full'} colorScheme={'teal'} onPress={() => {navigation.navigate('CreateProject'); dismiss();}}>Create</Button>
            </VStack>
                </VStack>
        </BottomSheetModal>
    </KeyboardAvoidingView>
    </VStack>
  )
}

export default Creator;