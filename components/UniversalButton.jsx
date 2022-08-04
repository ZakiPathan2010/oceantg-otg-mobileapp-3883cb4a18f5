import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

//A button that has the same style on iOS and Android, rather than that stupid non fill thing
//Also defaults to our colours
const UniversalButton = props => {
    return (
        <TouchableOpacity style={{ ...styles.button, ...props.style }} onPress={props.onPress}>
            <Text style={{ ...styles.text, ...props.textStyle }} numberOfLines={1} adjustsFontSizeToFit={true}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

export default UniversalButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#1f97cf",
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "#FFFFFF",
        fontSize: 17.5
    },
});