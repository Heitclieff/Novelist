import React,{useState , Suspense , useCallback , useMemo, useEffect} from 'react'
import { View, StyleSheet} from 'react-native'
import { Tabs , MaterialTabBar } from 'react-native-collapsible-tab-view'
import InfoBox from '../../../../components/[stack]/Profile/[container]/InfoBox'
import { Box ,Center ,VStack ,Text} from 'native-base'
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider'
import { useContext } from 'react'
import { Skeleton } from 'native-base'


const HEADER_HEIGHT = 700

interface layoutProps {
  currentProfile : any
}

const renderTabBar = (props:any) => {
  const theme:any = useContext(ThemeContext)
  return(
    
      <Box bg = {theme.Bg.base}>
        <MaterialTabBar
        {...props}
        indicatorStyle={{ backgroundColor: theme.Text.tab.active}}
        style={{ backgroundColor: null}}
        activeColor={theme.Text.tab.active}
        inactiveColor= {theme.Text.tab.inactive}
      />
    </Box>
  )
};

const LazyCareerpage = React.lazy(() => import('./[pages]/Careerpage'));


const Tabcontrols: React.FC <layoutProps>  =  ({currentProfile}) => {
  const theme:any = useContext(ThemeContext)
  const [isLoading, setIsLoading] = useState(true);

  const renderInfoBox = useCallback(() => {
    return <InfoBox currentProfile={currentProfile} />;
  }, [currentProfile]);

  useEffect(() => {
      setIsLoading(true);

      setTimeout(() => {
        setIsLoading(false);
      },0)
  },[])

  return (
    <Tabs.Container
      renderHeader={renderInfoBox}
      headerHeight={HEADER_HEIGHT}
      renderTabBar={renderTabBar}
      lazy = {true}
      allowHeaderOverscroll = {true}
    >
      <Tabs.Tab name="Careers">  
        {isLoading ? 
            <Center w = '100%' h= '100%'>
              <VStack  w = '100%' rounded="md">
                    <VStack w = '100%' flex=  {1} pt = {120} alignItems={'center'}>
                        <Skeleton w = '90%' h = '150' rounded = 'md' startColor= {theme.Bg.container}/>
                        <Skeleton.Text  lines={2} alignItems="start" mt = {-70}  px="12" startColor= {theme.Text.skelton}/>
                        <Skeleton w = '90%' h = '150' rounded = 'md'  mt = {50} startColor= {theme.Bg.container}/>
                        <Skeleton.Text lines={2} alignItems="start" mt = {-70}  px="12" startColor= {theme.Text.skelton}/>
                    </VStack>    
                </VStack>
            </Center>

        
       
       : <LazyCareerpage/>}
      </Tabs.Tab>
      <Tabs.Tab name="Library">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  )
}


const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
})

export default Tabcontrols;
