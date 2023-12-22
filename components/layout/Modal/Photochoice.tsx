import React,{useContext} from 'react'
import { Box , Text, VStack,HStack , Pressable } from 'native-base'
import { ThemeWrapper } from '../../../systems/theme/Themeprovider'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface Modalprops {
    BottomRef : any
    snapPoints : any
    handleSheetChange : any
    id : string
    DevicePhotos : any
    photosMode: any
}

const Photochoice : React.FC <Modalprops> = ({BottomRef , snapPoints , handleSheetChange , DevicePhotos , photosMode}) => {
    const theme:any = useContext(ThemeWrapper)
  return (
    <BottomSheetModal
    ref={BottomRef}
    index={1}
    snapPoints={snapPoints}
    onChange={handleSheetChange}

    backgroundStyle = {{backgroundColor : theme.Bg.comment}}
    handleIndicatorStyle = {{backgroundColor : theme.Indicator.base}}
    >
        <VStack pt = {3}>
            <Pressable onPress = {DevicePhotos}>
                <HStack alignItems = "center" space = {2} pl =  {4} p = {3} >
                    <FeatherIcon
                        name = "image"
                        size = {25}
                        color = {theme.Icon.base}
                    />
                    <Text color = {theme.Text.heading}>Select from Gallery</Text>
                </HStack>
            </Pressable>
            <Pressable onPress = {photosMode}>
                <HStack alignItems = "center" space = {2} pl =  {4} p = {3}>
                    <FeatherIcon
                        name = "camera"
                        size = {25}
                        color = {theme.Icon.base}
                    />
                    <Text color = {theme.Text.heading}>Photos</Text>
                </HStack>
            </Pressable>
        </VStack>
  </BottomSheetModal>
  )
}


export default Photochoice;