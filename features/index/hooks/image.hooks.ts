import React,{useEffect} from "react"
import FastImage from "react-native-fast-image";

const PreloadHooks = (image: string | undefined) => {
     useEffect(() => {
          FastImage.preload([
               {
                    uri: image,
               },
          ]);
     }, [image])
     return null
}

export {PreloadHooks};