import React, {useContext , useState, useEffect} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
VStack ,
Button , 
HStack ,
Text } from 'native-base'

// @Firestore
import firestore from '@react-native-firebase/firestore'

interface containerProps {}
const Tagsection : React.FC  <containerProps> = ({tag}) => {  
    const theme:any = useContext(ThemeWrapper)
    const [tagdocs ,setTags] = useState<[]>([]);

    const MatchingTags = async() : Promise<void> => {
      try{
        if(tag){
          console.log(tag)
          const getTagskeys = await firestore().collection('Tags').where(firestore.FieldPath.documentId(), 'in' , tag).get()
          const tagDocs =  getTagskeys.docs.map((doc) => doc.data())
          setTags(tagDocs);
        }
        
      }catch(error){
        console.log("Error Matching Tags",error);
      }
    }

  useEffect(() => {
      MatchingTags();
  }, [tag])
  return (
    <VStack w= '100%' pl ={6} pt = {5} space = {1}>
        <Text fontSize={'md'} fontWeight={'semibold'} color = {theme.Text.base}>TAGS</Text>
        
        <HStack space = {2}>
          {tag?.length > 0 && 
            tagdocs?.map((item:any, index:number) => (
              <Button
                key={index}
                rounded={'2xl'}
                size='xs'
                colorScheme={'gray'}
              >
                {item.title}
              </Button>
          ))}
        </HStack>
    </VStack>
  )
}

export default Tagsection;