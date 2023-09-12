import React, {useContext} from 'react'
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
import { ThemeWrapper } from '../../../../systems/theme/Themeprovider'

interface containerProps {
  data : any
}

const Headercontent : React.FC <containerProps> = ({data})=> {
  const theme:any = useContext(ThemeWrapper)
  const navigation = useNavigation();
  return (
    <VStack w = '100%' space = {2}>
        <VStack pl = {5} pr = {5} pt = {5} pb = {1}>
          <Text color={theme.Text.base} fontSize={'lg'} fontWeight={'semibold'}>{data.title}</Text>
          <HStack mt = {1}>
            <Box rounded={'full'} pl = {1} pr = {1} borderColor={theme.Text.description} borderWidth={1}>
              <Text color={theme.Text.description} fontSize={'xs'}>Public</Text>
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
                  4.7k
              </Text>
            
          </HStack>
        </VStack>
        <Divider mt = {2} bg = {theme.Divider.base}/>
        <VStack pl = {5} pr = {5} space = {1}>
          <HStack justifyContent={'space-between'}>
            <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Overview</Text>
          </HStack>
          <Text  color={theme.Text.description}>
            Lorem , ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolorum distinctio consequatur autem provident error doloribus ex earum? Provident culpa dolorum vero harum, labore dicta officiis adipisci corporis quae voluptates. 
          </Text>
        </VStack>
        <VStack pl = {5} pr= {5} pt = {5} space = {2}>
          <HStack justifyContent={'space-between'}>
          <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Tags</Text>
          <IconButton 
            onPress={() => navigation.navigate('Tags')}
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
            <Button size = 'xs' rounded={'full'} bg = {'gray.700'}>Romantic</Button>
            <Button size = 'xs' rounded={'full'} bg = {'gray.700'}>Comendy</Button>
          </HStack>
        </VStack>

        <VStack pl = {5} pr= {5} pt = {2} space = {2} >
          <Text color = {theme.Text.base} fontSize={'md'} fontWeight={'semibold'}>Publish</Text>
       
          <VStack space=  {2}>
                <Text color = {theme.Text.description}>Date: 10 Octorber 2022</Text>
                <Text color = {theme.Text.description}>Last updated: 24 August 2023</Text>
          </VStack>
        </VStack>

    </VStack>
  )
}

export default Headercontent;