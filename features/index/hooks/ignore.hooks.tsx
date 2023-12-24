import React, {useEffect} from 'react'
import { LogBox } from 'react-native'

const IgnoreLogsHooks = (refreshing : boolean) => {
  useEffect(() => { 
     LogBox.ignoreLogs(['In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.']);
  },[refreshing])
  return null
}

export {IgnoreLogsHooks}
