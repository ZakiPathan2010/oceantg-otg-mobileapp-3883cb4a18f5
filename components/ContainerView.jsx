import React from "react";
import { View } from 'react-native';

const containerStyle = {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
}

function combineStyles(styleProp) {
  if (styleProp) {
    return {...containerStyle, ...styleProp}
  } else {
    return containerStyle
  }
}

export default function ContainerView(props) {

  return (
    <View style={combineStyles(props.style)}>
      {props.children}
    </View>
  );
}