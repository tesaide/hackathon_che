import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";

const initialRegion = {
  latitude: 51.5012162,
  longitude: 31.29344,
  latitudeDelta: 0.1922,
  longitudeDelta: 0.1421,
};

export default function App() {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/submitMarker");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={initialRegion}
            // provider={PROVIDER_GOOGLE}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button onPress={handleNavigate}>Add new marker</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
