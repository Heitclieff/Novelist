import React,{FC} from 'react'
import { 
Box,
Text,
VStack,
HStack,
Icon,
ScrollView
 } from 'native-base'
 
import Banner from '../../../components/main/[container]/Banner'
import { AssetImages } from '../../../../systems/ImagesAssets'
import CollectionFields from '../../../components/main/[layout]/Collections/CollectionFileds'


 interface MainProps {
     theme : any
 }

const Firstpages : React.FC <MainProps> = ({theme}) => {
     const Collectionsdata =  [{
          title : 'yahari ore no seishun love comedy wa machigatteiru.',
          view : "100,503",
          images : 'https://static.wikia.nocookie.net/yahari/images/8/87/Oregairukan_visual.jpg/revision/latest?cb=20191115235525',
     },
     {
          title : 'youkoso jitsuryoku shijou shugi no kyoushitsu e.',
          view : "100,421",
          images : 'https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/4c62a764e19643510c3878a9329bee78.jpe',
     },
     {
          title : 'jigokuraku',
          view : "100,503",
          images : 'https://anime-nani.net/wp-content/uploads/2023/04/Jigokuraku.jpg.webp',
     },

]

  return (
    <Box w  = '100%' h= '100%'>
          <ScrollView 
          contentInset={{bottom: 180}} 
          showsVerticalScrollIndicator = {false}
          >
               <VStack w = '100%'>
                    <Banner
                         images = {AssetImages}
                    />
                         <CollectionFields
                              theme = {theme}
                              title = "Hot New Novels"
                              collections = {Collectionsdata}             
                         />
                         <CollectionFields
                         theme = {theme}
                         title = "Top new Novels"
                         collections = {Collectionsdata}    
                         />               
               </VStack>
          </ScrollView>
     </Box>
  )
}


export default Firstpages;