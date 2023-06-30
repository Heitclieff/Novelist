import React , {useCallback , Suspense} from "react"
import { FlatList ,Box ,VStack } from "native-base"

interface Provider {
    children : any,
 }


const Flatlist :React.FC <Provider> = ({children}) => {
    const renderChildren = useCallback(({ item }: any) => {
        return (
        <Suspense fallback = {<Box>Loading...</Box>}>     
            {children}
        </Suspense>
        )
    }
    , [children]
   )
    return(
        <FlatList
                contentInset={{ bottom: 200 }}
                showsVerticalScrollIndicator={false}
                data={[0]}
                renderItem={renderChildren}
        /> 
    )
}

export {Flatlist}