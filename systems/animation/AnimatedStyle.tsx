// animationHelpers.js
import {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    withSpring,
    withSequence,
  } from 'react-native-reanimated';
  
export const useAnimatedBoxStyle = (offset:any) => {
  
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: withSpring(offset.value) }],
      };
    });
  
    return animatedStyle;
};
  
  export const animateTransition = (offset:any) => {
    offset.value = withSequence(
      withTiming(-1000, { duration: 100 }),
      withTiming(0, { duration: 10 }),
  
    );
  };