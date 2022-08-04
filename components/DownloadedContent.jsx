import React from "react";
import { View, Text, Button } from "react-native";

const DownloadedContent = ({name}) => {
    return (
        <View>
            <Text>{name}</Text>
            <Button
                onPress={() => alert("Playing " + name)}
                title="Play"
            />
        </View>
    );
}

export default DownloadedContent;