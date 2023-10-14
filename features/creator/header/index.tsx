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
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'

//@Firebase
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface containerProps {
  data : any,
  timestamp : any,
}

const Headercontent : React.FC <containerProps> = ({data , timestamp})=> {
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
      console.log(data.tagDoc)
      try{ 
        const tagsID =  data.tagDoc;
        const snapshotTags = await firestore().collection('Tags').where(firestore.FieldPath.documentId() , 'in' ,  tagsID).get();
  
        const tagdocs = snapshotTags.docs.map(doc => ({id : doc.id , ...doc.data()}))

        setTagsdocs(tagdocs)
      }catch(error) {
        console.error("Error fetching Tag title :", error);
      }
     
  }

  const TagslocalUpdate = (tagdocs) => {
    setTagsdocs(tagdocs);
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
          <Text color={theme.Text.base} fontSize={'lg'} fontWeight={'semibold'}>{data.title}</Text>
          <HStack mt = {1}>
            <Box rounded={'full'} pl = {1} pr = {1} borderColor={theme.Text.description} borderWidth={1}>
              <Text color={theme.Text.description} fontSize={'xs'}>{data.status}</Text>
            </Box>
          </HStack>
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
        <Divider mt = {2} bg = {theme.Divider.base}/>
        <VStack pl = {5} pr = {5} space = {1}>
          <HStack justifyContent={'space-between'}>
            <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Overview</Text>
          </HStack>
          <Text  color={theme.Text.description}>
            {data.overview}
          </Text>
        </VStack>
          {
            data.tagDoc &&
            <VStack pl = {5} pr= {5} pt = {5} space = {2}>
              
                {Tagdocs.length > 0 &&
                  <>
                  <HStack justifyContent={'space-between'}>
                    <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Tags</Text>
                  
                    <IconButton 
                      onPress={() => navigation.navigate('Tags', {current_tags : Tagdocs , TagslocalUpdate})}
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
        
                  <HStack space=  {2}>
                    {Tagdocs.map((item:any,index:number) =>{
                      return(
                        <Button key = {index} size = 'xs' rounded={'full'} bg = {'gray.700'}>{item.title}</Button>
                    )})}  
              </HStack>
              </>
             }
          </VStack>
          }
         

        <VStack pl = {5} pr= {5} pt = {2} space = {2} >
          <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Publish</Text>
       
          <VStack space=  {2}>
                <Text color = {theme.Text.description}>{`Date: ${formattedDate.createAt}`}</Text>
                <Text color = {theme.Text.description}>{`Last updated: ${formattedDate.lastupdated}`}</Text>
          </VStack>
        </VStack>

    </VStack>

  )
}

export default Headercontent;