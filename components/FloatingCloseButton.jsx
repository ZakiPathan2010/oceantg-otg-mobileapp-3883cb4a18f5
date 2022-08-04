import React, { useRef, useState, useMemo } from "react";
import { StyleSheet, PanResponder, Pressable, Animated } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  parent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    elevation: 10000,
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  pressable: {
    flex: 1,
    zIndex: 10001,
    elevation: 10001,
  },
  icon: {
  }
});

export default function FloatingCloseButton({onPress}) {
  
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setDragging] = useState(false);

  const panResponder = useMemo(
    () => PanResponder.create({
      onMoveShouldSetPanResponder: () => isDragging,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    }),
    [isDragging]
  );

  return (
    <Animated.View 
      style = {[styles.parent, {transform: pan.getTranslateTransform()}]}
      {...panResponder.panHandlers}
      >
      <Pressable
        onPress = {onPress}
        onLongPress = {() => setDragging(true)}
        onPressOut = {() => setDragging(false)}
      >
        <Icon name="times-circle-o" size={40} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
}