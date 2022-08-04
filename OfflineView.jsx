import React, { useEffect } from "react";
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import OceanLogo from './assets/icons/OceanLogo.svg';
import VideotelLogo from './assets/icons/VideotelLogo.svg';
import SeagullLogo from './assets/icons/SeagullLogo.svg';

import ContainerView from './components/ContainerView';
import UniversalButton from './components/UniversalButton'

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center"
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    height: "100%"
  },  
  logo: {
    color: "#FFFFFF",
    marginLeft: "5%",
    marginRight: "5%"
  },
  offlineContainer: {
    flex: 0,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: "80%",
    height: "45%",
    marginTop: "10%"
  },
  offlineTitle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 30
  },
  offlineText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: "10%"
  },
  poweredByText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: "20%"
  },
  poweredByContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "-15%"
  }
});

export default function OfflineView(props) {

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

  return (
    <ContainerView flex={0}>
      <ImageBackground style={styles.backgroundImage} source={require("./assets/LoginBackground.jpg")}>
        <View style={styles.mainContainer}>
          <OceanLogo width={"100%"} height={"10%"} marginTop={"10%"} style={styles.logo}/>
          <View style={styles.offlineContainer}>
            <Text style={styles.offlineTitle}>
              Offline
            </Text>
            <Text style={styles.offlineText}> 
              Your device is offline, please connect to the internet to continue
            </Text>
            <UniversalButton
              onPress={props.retry}
              title="Retry"
            />
          </View>
          <Text style={styles.poweredByText}>
            Powered by
          </Text>
          <View style={styles.poweredByContainer}>
            <SeagullLogo width={"20%"} style={styles.logo}/>
            <VideotelLogo width={"20%"} style={styles.logo}/>
          </View>
        </View>
      </ImageBackground>
    </ContainerView>
  );
}