import React from 'react'
import { Box , Text, VStack ,HStack , Icon} from 'native-base'
import { Image } from 'expo-image'
import { AntDesign } from '@expo/vector-icons'
interface containerProps {
    data : any
}
const HeaderItem : React.FC <containerProps> = ({data}) => {
  return (
    <Box w = '350' h = '220' rounded={'md'} overflow={'hidden'}  position='relative'>
        <Box w ='100%' h = '100%' position={'absolute'}>
            <Image
            style={{width : '100%', height : '100%'}}
            contentFit= 'cover'
            source={data.images}
            alt = "images"
            />
        </Box>
        <Box w = '100%' h=  '100%' bg= 'black' position={'absolute'} opacity={0.4} zIndex={2}/>
       <Box w = '100%' h = '100%' pl = {3} pr = {2} justifyContent={'flex-end'} zIndex={10}>
            <VStack w = '100%' h= '70'>
                <Text fontWeight={'semibold'} fontSize={'lg'}  numberOfLines={1} color = 'white'>{data.title}</Text>
                <HStack
                  alignItems={'center'}
                  space = {1}
                  >
                    <Text 
                    fontSize={'sm'}
                    color = 'white'
                    >{data.view}
                    </Text>
                    <Icon
                    size = 'sm'
                    color = 'white'
                    as = {AntDesign}
                    name = 'eyeo'
                    />
                  </HStack>
            </VStack>
           
        </Box>
    </Box>
  )
}

export default HeaderItem;
