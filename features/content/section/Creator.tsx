import React, {useContext} from 'react'
import { Image } from 'react-native'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { 
HStack , 
Box , 
Text } from 'native-base'

interface containerProps {
    collection : any
}

const Creatorsection : React.FC <containerProps> = ({collection}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <HStack space= {2}>
    {collection.creater && collection.creater.map((item:any , key:number) => {
        return(
            <HStack h= '30' key = {key} alignItems={'center'} space = {1}>
                <Box  bg = 'black' h = '7' w ='7' rounded = 'full' overflow = 'hidden' alignItems={'center'}>
                    <Image
                        style={{width : '100%', height : '100%'}}
                        source={{uri :item.image}}
                        alt = "images"
                    />
                </Box>
                <Text color = {theme.Text.description}>{item.username}</Text>
            </HStack>  
        )
    }
    )}
            
</HStack>
  )
}


export default Creatorsection;