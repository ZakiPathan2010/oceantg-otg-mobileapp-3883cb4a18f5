import { Platform, StyleSheet, View, Button } from 'react-native';
import { useState, useEffect } from "react";
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

import OnlineView from './OnlineView.jsx';
import OfflineView from './OfflineView.jsx';
import ContainerView from './components/ContainerView.jsx';

const styles = StyleSheet.create({
  onlineOfflineBar: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: "#023650",
    height: 40,
    paddingVertical: 0,
    paddingHorizontal: 15
  },
  onlineOfflineButtonPadding: {
    alignItems: 'stretch',
    justifyContent: 'center',
    width: 75
  }
});

export default function MainView() {
  const netInfo = useNetInfo();
  const [isRequestingOnline, setRequestingOnline] = useState(true);
  const [isConnectedOnline, setConnectedOnline] = useState(true);

  useEffect(() => {
    setConnectedOnline(netInfo.isConnected);
  }, [netInfo]);
  
  return (
    <ContainerView>
      <View style={styles.onlineOfflineBar}>
        {/* Don't delete this - they're in storage while we make the 'online only' app */}
        {/*<View style={styles.onlineOfflineButtonPadding}>
          <Button
            android : {color="#023650"} //TODO: Only change the colour on android
            onPress={() => setRequestingOnline(!isRequestingOnline)}
            disabled={!isConnectedOnline}
            title={isConnectedOnline && isRequestingOnline ? "Online" : "Offline"} />
        </View>*/}
      </View>
      {isConnectedOnline && isRequestingOnline ? <OnlineView /> : 
      <OfflineView retry={() => NetInfo.fetch().then(state => {setConnectedOnline(state.isConnected)})}/>}
    </ContainerView>
  );
}