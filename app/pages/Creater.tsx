import React,{FC , lazy , Suspense, useMemo , useEffect, useState , useRef, useCallback} from 'react'
import { 
Box,
Icon,
VStack,
FormControl,
Input,
Text,
Button,
HStack,
} from 'native-base'

//components
import Createrbar from '../components/creater/[container]/Createrbar'
const LazyUsershowcase = React.lazy(() => import('../components/global/[container]/Usershowcase'));
import CreateContainer from '../components/creater/[container]/CreateContainer';

import { useContext } from 'react'
import { ThemeContext } from '../../systems/Theme/ThemeProvider'
//redux toolkit
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionsDataShowcase} from '../../systems/redux/action'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { RootState } from '../../systems/redux/reducer'
import { Flatlist } from './[stack]/[global]/Flatlist';
import { Pressable } from 'native-base';
import { EvilIcons , AntDesign } from '@expo/vector-icons';
import { Fab } from 'native-base';
import { BottomSheetModalProvider , BottomSheetModal , BottomSheetTextInput , useBottomSheetModal} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

interface Pageprops { 
    theme : any
}

const Creater : React.FC <Pageprops> = () => {
    const theme:any = useContext(ThemeContext);
    const MemorizeCreaterbar = React.memo(Createrbar)
    const navigation = useNavigation();

    const [Projectype , setProjectype] = useState<string>('');
    
    const dispatch = useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    const Collectionsdata = useSelector((state: any) => state.collectionsDatashowcase)
    const isReduxLoaded = useSelector((state: RootState) => state.iscollecitonDatashowcaseLoaded);
    const {dismiss} = useBottomSheetModal();
  
    useEffect(() => {
        if (!isReduxLoaded) dispatch(getCollectionsDataShowcase());
    }, [dispatch, isReduxLoaded])

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['45%', '45%'], []);

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
        <Box h = '12%'>
            <Suspense fallback = {<Box>Loading...</Box>}>
                <MemorizeCreaterbar onRightButtonpress= {handlePresentModalPress}/>
            </Suspense>
        </Box>

        <Box flex = {1}>
                <Flatlist>
                    <Box w= '100%' mt = {2}>
                    <Box pl = {6} pr = {6}>
                        <Input 
                        rounded={'full'} 
                        bg = {theme.Bg.container} 
                        borderColor={theme.Bg.comment} 
                        color={theme.Text.base}
                        h  = {9}
                        InputRightElement={<Icon as = {<EvilIcons name='search'/>} size = {5} mr = {2}/>}
                        placeholder='Enter your Project name'
                        />
                    </Box>   
            </Box> 
                <VStack space = {1} m ={5} mt = {5}>
                {isReduxLoaded && Collectionsdata.length > 0 || Collectionsdata ?
                    Collectionsdata.map((item:any , index:number) => ( 
                        React.useMemo(() => (
                                <CreateContainer key = {index} id = {item.id} data= {item}/>        
                        ),[]
                        ))) 
                    : null
                }
                </VStack> 
            </Flatlist>
        </Box>
        <Fab 
        renderInPortal={false} 
        shadow={2} bg ={'teal.600'} 
        size="sm" 
        onPress={handlePresentModalPress}
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
        
        <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
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
    </VStack>
  )
}

export default Creater;
