import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform } from 'react-native';

import MainView from './MainView.jsx';
import ContainerView from './components/ContainerView.jsx';

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios'? 0 : 24,
    backgroundColor: "#023650"
  }
});

export default function App() {

  return (
    <ContainerView style={styles.container}>
      <StatusBar
        style="light"
        backgroundColor="#023650"
        translucent={true}
        hidden={Platform.OS === 'ios'}
      />
      <MainView />
    </ContainerView>
  );
}
