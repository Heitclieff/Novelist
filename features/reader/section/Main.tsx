import React,{useContext} from 'react'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider';
import { 
Box , 
HStack , 
Text, 
IconButton , 
Icon, } from 'native-base'

// import * as Haptics from 'expo-haptics';
import AntdesignIcon from 'react-native-vector-icons/AntDesign'
import { Platform } from 'react-native';
interface containerProps {
    isLiked : boolean , 
    setisLiked : any,
    collection : any,
}

const Mainsection : React.FC <containerProps> = ({isLiked ,setisLiked, collection}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
      <Box p={5} w='100%'>
          <HStack justifyContent={'space-between'} pr={1}>
              <Text w={Platform.OS == 'ios' ? '90%' : '100%'} fontSize={'lg'} fontWeight={'semibold'} color={theme.Text.heading}>
                  {collection.title}
              </Text>
              {Platform.OS == 'ios' &&
                <IconButton
                    size='sm'
                    w='30'
                    h={30}
                    rounded={'full'}
                    onPress={() => { setisLiked(!isLiked); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light) }}
                    icon={
                        <AntdesignIcon
                            size= {15}
                            color={isLiked ? 'red.500' : theme.Icon.base}
                            name={isLiked ? 'heart' : 'hearto'} />}
                />
                }
          </HStack>
          <HStack space={2} alignItems={'center'}>
            <HStack space= {1}  alignItems={'center'}>
                <Text fontSize={'sm'} color={theme.Text.description}>
                    {collection.view}
                </Text>
                <Box>
                    <AntdesignIcon
                        size={10}
                        color={theme.Text.description}
                        name='eyeo'
                    />
                </Box>
            </HStack>
            <HStack space = {1}  alignItems={'center'}>
                <Text fontSize={'sm'} color={theme.Text.description}>
                    {collection.like}
                </Text>
                <Box>
                    <AntdesignIcon
                        size={10}
                        color={theme.Text.description}
                        name='heart'
                    />
                </Box>
            </HStack>
            
          </HStack>
      </Box>
  )
}

export default Mainsection;