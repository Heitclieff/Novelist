import React, {useContext , useState, useEffect} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack ,
Button , 
HStack ,
Skeleton,
Text } from 'native-base'

// @Firestore
import firestore from '@react-native-firebase/firestore'

interface containerProps {
  tag : any
}

const Tagsection : React.FC  <containerProps> = ({tag}) => {  
    const theme:any = useContext(ThemeWrapper)
    const [tagdocs ,setTags] = useState<[]>([]);
    const [isLoading , setLoading] = useState<boolean>(true);

    const MatchingTags = async() : Promise<void> => {
      try{
        if(tag){
          console.log(tag)
          const getTagskeys = await firestore().collection('Tags').where(firestore.FieldPath.documentId(), 'in' , tag).get()
          const tagDocs =  getTagskeys.docs.map((doc) => doc.data())
          setTags(tagDocs);
          setLoading(false);
        }
        
      }catch(error){
        console.log("Error Matching Tags",error);
      }
    }

  useEffect(() => {
      MatchingTags();
  }, [tag])

  if(isLoading)return(
    <Skeleton mt = {5} pl = {5} pr = {5} startColor = {theme.Bg.container} />
  )
  return (
    <VStack w= '100%' pl ={6} pt = {5} space = {1}>
        <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.heading}>Tags</Text>
        
        <HStack space = {2} mt = {1}>
          {tag?.length > 0 && 
            tagdocs?.map((item:any, index:number) => (
              <Button
                key={index}
                rounded={'2xl'}
                size='xs'
                colorScheme={'teal'}
              >
                {item.title}
              </Button>
          ))}
        </HStack>
    </VStack>
  )
}

export default Tagsection;