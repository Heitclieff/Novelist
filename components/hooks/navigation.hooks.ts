import React from "react"
import { useAnimatedStyle , interpolateColor } from "react-native-reanimated";

const IndexnavigationHooks  =(theme : any , scrollY : any) => { 
     const animatedNavbarStyle = useAnimatedStyle(() => {
          const backgroundColor = interpolateColor(scrollY.value, [0, 100],
              ['transparent', theme.Bg.header]);
          return {
              backgroundColor,
          };
      });
  
      const AnimatedTextStyle = useAnimatedStyle(() => {
          const textColor = interpolateColor(scrollY.value, [0, 100],
              ['white', theme.Text.between_heading]);
          return {
              color : textColor
          }
      })
     return {animatedNavbarStyle , AnimatedTextStyle}
}

export {IndexnavigationHooks};