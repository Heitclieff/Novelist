import React from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../../../../../../systems/Theme/ThemeProvider'
import { Box , HStack , Text, IconButton , Icon, } from 'native-base'
import * as Haptics from 'expo-haptics';
import { AntDesign } from '@expo/vector-icons';
import { Platform } from 'react-native';
interface containerProps {
    isLiked : boolean , 
    setisLiked : any,
    collection : any,
}

const TitleSection : React.FC <containerProps> = ({isLiked ,setisLiked, collection}) => {
    const theme:any = useContext(ThemeContext)
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
                        <Icon
                            size='md'
                            as={AntDesign}
                            color={isLiked ? 'red.500' : theme.Icon.base}
                            name={isLiked ? 'heart' : 'hearto'} />}
                />
                }
          </HStack>
          <HStack space={1} alignItems={'center'}>
              <Text fontSize={'sm'} color={theme.Text.description}>
                  {collection.view}
              </Text>
              <Box>
                  <Icon
                      size='xs'
                      color={theme.Text.description}
                      as={AntDesign}
                      name='eyeo'
                  />
              </Box>
          </HStack>
      </Box>
  )
}


export default TitleSection