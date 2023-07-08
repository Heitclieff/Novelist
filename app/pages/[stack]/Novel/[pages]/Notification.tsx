import React from 'react'
import { Box, Divider, HStack ,Text, VStack } from 'native-base';
import { useContext } from 'react';
import { ThemeContext } from '../../../../../systems/Theme/ThemeProvider';
import DefaultNotify from '../../../../components/[stack]/Notification/[container]/DefaultNotify';

const Notification : React.FC = () => {
    const theme:any = useContext(ThemeContext)
  return (
    <Box flex = {1} bg = {theme.Bg.base}>
       <HStack mt = {5}>
            <Text pl = {5} color = {theme.Text.base}>Recently</Text>
       </HStack>
       <Divider bg = {theme.Divider.base} mt = {1}/>
        <VStack>
            <DefaultNotify/>
        </VStack>
    
    </Box>
  )
}

export default Notification;
