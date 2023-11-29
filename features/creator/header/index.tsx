import React, {useContext , useEffect , useState} from 'react'
import { 
Box , 
Text ,
VStack ,
HStack ,
Button , 
TextArea , 
IconButton , 
Divider,
Icon} from 'native-base'
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import AlertItem from '../../reader/components/Alert'


//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface containerProps {
  data : any,
  timestamp : any,
  userid : string
  id : string,
  onModalPress : any
}

const Headercontent : React.FC <containerProps> = ({data , timestamp , id , onModalPress , userid})=> {
  const theme:any = useContext(ThemeWrapper)
  const navigation = useNavigation();

  const [formattedDate , setformattedDate] = useState<{}>({});
  const [Tagdocs ,setTagsdocs] = useState<any[]>([])

  const TimeConvert = (timestamp) => {
    if(timestamp.createAt && timestamp.updatedAt){
      const createAt = new Date(timestamp.createAt.seconds * 1000 + timestamp.createAt.nanoseconds / 1000000);
      const lastupdate = new Date(timestamp.updatedAt.seconds * 1000 + timestamp.updatedAt.nanoseconds / 1000000);
      
      const formattedDateCreateAt = createAt.toLocaleString();
      const formattedDatelastupdate = lastupdate.toLocaleString();

      setformattedDate({createAt : formattedDateCreateAt , lastupdated : formattedDatelastupdate});
    }
  }
 
  const fetchingTagsTitle = async () : Promise<void> => {
      try{ 
        const tagsID =  data.tagDoc;

        if(tagsID?.length > 0){
          const snapshotTags = await firestore().collection('Tags').where(firestore.FieldPath.documentId() , 'in' ,  tagsID).get();
          const tagdocs = snapshotTags.docs.map(doc => ({id : doc.id , ...doc.data()}))
          setTagsdocs(tagdocs)
        }
      
      }catch(error) {
        console.error("Error fetching Tag title :", error);
      }
  }

  const handleTagupdate = async (tagdocs:any , selectedCategory:any) :Promise<T> => {
    try {
        const tagid = tagdocs.map((doc => doc.id))
        firestore()
        .collection('Novels')
        .doc(id)
        .update({ tagDoc: tagid , cateDoc : selectedCategory})
       
        setTagsdocs(tagdocs);

        return true
    } catch (error) {
        console.error("Error Update Novel Tag :", error);
        return false
    }
  }

  useEffect(() => {
    TimeConvert(timestamp);
  },[timestamp])

  useEffect(() => {
    fetchingTagsTitle();
  } , [data.tagDoc])

  

  return (
   data && <VStack w = '100%' space = {2}>
        <VStack pl = {5} pr = {5} pt = {5} pb = {1}>
          <Text color={theme.Text.heading} fontSize={'xl'} fontWeight={'semibold'}>{data.title}</Text>
          <HStack  pb =  {1} mt = {2} space = {1}>
            <Box rounded={'full'} h = "22px"   pl = {2} pr = {2} borderColor = {!data.status ? "red.500" : "teal.500"} borderWidth={1}>
              <Text fontSize={'xs'} color =   {!data.status ? "red.500" : "teal.500"} >{data.status ? "Public" : "Private"}</Text>
            </Box>
            <Box rounded={'full'} h = "22px"   pl = {2} pr = {2} borderColor = {!data.novel_status ? "orange.500" : "teal.500"} borderWidth={1}>
              <Text  fontSize={'xs'} color = {!data.novel_status ? "orange.500" : "teal.500"} >{data.novel_status ? "Finished" : "Release"}</Text>
            </Box>
          </HStack>
          <HStack justifyContent=  "space-between" mr = {2} alignItems = 'center'>
            <VStack>
              <HStack mt = {1} space={1} alignItems={'center'}>
                    <Box>
                        <AntdesignIcon
                            size={15}
                            color={theme.Text.description}
                            name='eyeo'
                        />
                    </Box>
                    <Text fontSize={'xs'} color={theme.Text.description}>
                        {data.view}
                    </Text>
                </HStack>
                <HStack mt = {1} space={1} alignItems={'center'}>
                    <Box>
                      <AntdesignIcon
                          size={15}
                          color={theme.Text.description}
                          name='heart'
                      />
                    </Box>
                    <Text fontSize={'xs'} color={theme.Text.description}>
                        {data.like}
                    </Text>
                
                </HStack>
            </VStack>
            {userid &&
              data.owner === userid &&
                <Button 
                onPress= {onModalPress}
                _pressed={{bg : theme.Bg.container}}
                rounded = 'full' 
                variant={'outline'} 
                p = {0} 
                _text={{fontSize : 'sm' , color : theme.Text.base}}
                h = {"25px"}
                pl = {2}
                pr = {2}
                leftIcon={
                  <FontAwesomeIcon
                  name = "camera"
                  size = {15}
                  color = {theme.Icon.static}
                  />
                }
                >
                  Edit photos
                </Button>
              }
          
          </HStack>
        </VStack>
        <Divider mt = {2} bg = {theme.Divider.base}/>
        <VStack pl = {5} pr = {5} space = {1}>
          <HStack justifyContent={'space-between'}>
            <Text color = {theme.Text.heading} fontSize={'md'} fontWeight={'semibold'}>Overview</Text>
          </HStack>
          <Text  color={theme.Text.description}>
            {data.overview}
          </Text>
        </VStack>
          {
            data.tagDoc &&
            <VStack pl = {5} pr= {5} pt = {3} space = {2}>
              
             
                  <>
                  <HStack justifyContent={'space-between'}>
                    <Text color = {theme.Text.heading} fontSize={'md'} fontWeight={'semibold'}>Tags</Text>
           
                    <IconButton 
                      onPress={() => navigation.navigate('Tags', {current_tags : Tagdocs , handleTagupdate , status : data.status})}
                      size = 'md'
                      rounded={'full'}
                      icon = {
                          <AntdesignIcon
                              name='plus'
                              size={15}
                              color = {theme.Icon.base}
                          />
                        }
                    />
                  
                  </HStack>
                  {Tagdocs.length > 0 ?
                    <HStack space=  {2}>
                      {Tagdocs.map((item:any,index:number) =>{
                        return(
                          <Button 
                          key = {index} 
                          size = 'xs' 
                          rounded={'full'}
                          colorScheme={'teal'}
                          _text={{fontWeight : 'medium'}}
                          >{item.title}</Button>
                      )}) 
                    } 
                      
                      
                  </HStack>
                  :
                  <Text color = {theme.Text.description}>Create New Tags*</Text>
                }
              </>
             
          </VStack>
          }
         

        <VStack pl = {5} pr= {5} pt = {2} space = {2} >
          <Text color = {theme.Text.heading} fontSize={'md'} fontWeight={'semibold'}>Publish</Text>
       
          <VStack space=  {2}>
                <Text color = {theme.Text.description}>{`Date: ${formattedDate.createAt}`}</Text>
                <Text color = {theme.Text.description}>{`Last updated: ${formattedDate.lastupdated}`}</Text>
          </VStack>
        </VStack>

    </VStack>

  )
}

export default Headercontent;