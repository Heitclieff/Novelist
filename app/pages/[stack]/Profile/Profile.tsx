import React , {useEffect, useState ,useCallback , Suspense, useMemo} from 'react'
import { useNavigation } from '@react-navigation/native'
import { 
Box, 
VStack,
Text, 
Center,
Button,
IconButton,
Icon,
 } from 'native-base'

import { useDispatch , useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { RootState } from '../../../../systems/redux/reducer'
import { AnyAction } from 'redux'
import { getuserData } from '../../../../systems/redux/action'

import { useContext } from 'react'
import { ThemeContext } from '../../../../systems/Theme/ThemeProvider'

//Component && Layouts;
import Profilelayout from './[layout]/Profilelayout'

interface StackProps {
    Profiledata : any
}



const Profile : React.FC <StackProps> = ({Profiledata = []}) => {
    const theme:any = useContext(ThemeContext)
    const [canEdit, setcanEdit] = useState<boolean>(false);
    const navigation = useNavigation();
    const dispatch =  useDispatch<ThunkDispatch<RootState, unknown, AnyAction>>();
    
    const userdata = useSelector((state:any) => state.userData)
    const isReduxLoaded = useSelector((state:RootState) =>state.isuserLoaded )
    const [currentProfile , setCurrentProfile] = useState<any>(userdata[0]);
    
    useEffect(() => {
        dispatch(getuserData());
    } , [dispatch , isReduxLoaded])

    const ValidatePiorityAccount = () => {
        if(Profiledata.length === 0 || !Profiledata){      
            return currentProfile.username
        }

        if(userdata[0].username !== 'Heitclieff'){
            return
        }

        console.log("View Another Account.")
        setCurrentProfile(Profiledata[0]);
        setcanEdit(true);
    }

    const SetupProfile = () => {
        const Accountname = ValidatePiorityAccount();
        navigation.setOptions({
            title : Accountname
        })
    }

    useEffect(() => {
        SetupProfile();
    } , []);

    return ( 
        React.useMemo(() => {
            return(
                <Box bg={theme.Bg.base} flex={1}>
                    <Profilelayout currentProfile={currentProfile} />
                </Box>
            )
        },[currentProfile])
    )
}

export default Profile;
