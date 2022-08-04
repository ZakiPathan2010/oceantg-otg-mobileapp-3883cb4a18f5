import { StyleSheet, Text } from 'react-native';
import ContainerView from './components/ContainerView.jsx';

import OceanO from './assets/icons/OceanO.svg';

const styles = StyleSheet.create({
    loadingContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#023650"
    },
    oceanO: {
        color:"#066A9B"
    }
});

export default function LoginView() {

  return (
    <ContainerView style={styles.loadingContainer}>
        <OceanO height={"20%"} width={"20%"} style={styles.oceanO}/>
    </ContainerView>
  );
}