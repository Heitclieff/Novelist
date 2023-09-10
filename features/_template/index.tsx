import React,{useContext , useEffect} from 'react'
import { 
Box , 
Button, 
VStack} from 'native-base'
import { ThemeWrapper } from '../../systems/theme/Themeprovider'
import { ItemList } from '../../components/layout/Flatlist/ItemList'
import { useRoute } from '@react-navigation/native'

//@Components
import Itemfield from '../../components/field/Itemfield'
import Profilenavigation from '../../components/navigation/Profilenavigation'

//@Redux Toolkits
import { getCollectionData } from '../../systems/redux/action'
import { useDispatch , useSelector } from 'react-redux'
import { RootState } from '../../systems/redux/reducer'
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

interface Pageprops {
     collections : any,
}

const MemorizedItemfields = React.memo(Itemfield);

const Template : React.FC <Pageprops> = ({collections}) => {
     const theme:any = useContext(ThemeWrapper);
     const route = useRoute()
     const {title}:any = route.params

     const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
     const Collectionsdata = useSelector((state:any)=> state.collectionsData)
   
     const isReduxLoaded = useSelector((state: RootState) => state.iscollectionLoaded);
   
     useEffect(() => {
       if(!isReduxLoaded) dispatch(getCollectionData());
     },[dispatch , isReduxLoaded])
  return (
    <VStack flex = {1} bg = {theme.Bg.base}>
          <Profilenavigation Title = {title} rightButtonEnable = {false}/>
          <VStack flex={1} >
                <ItemList collection={Collectionsdata}>
                    {(item:any , index:number) => <MemorizedItemfields key = {index} id = {item.id} data= {item}/> }
                </ItemList>
               {/* <FlatList>
                    <VStack pl  = {4} pr = {4} space= {4}>
                    <Box pl = {2} w = '100%' h = '30' justifyContent={'center'}>
                         <Button w  = '60'  size={'xs'}  rounded={'full'} bg = {theme.Bg.container}>filter</Button>
                    </Box>
                    <VStack>
                         {isReduxLoaded && Collectionsdata.length > 0 || Collectionsdata ?
                              Collectionsdata.map((item:any , index:number) => (       
                                   <MemorizedItemfields key = {index} id = {item.id} data= {item}/>        
                                   )) 
                              : null
                         }
                    </VStack>
                       
                    </VStack>
                   
               </FlatList> */}
          </VStack>
         
     </VStack>
  )
}

export default Template;