import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Button } from "react-native-paper";
import AppBar from "../components/AppBar";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";

interface IMarker {
  latitude: number;
  longitude: number;
  title: string;
  color: string;
  // fix
  accessibilityLevel: string;
}

const initialRegion = {
  latitude: 51.5012162,
  longitude: 31.29344,
  latitudeDelta: 0.06922,
  longitudeDelta: 0.06421,
};

const pinColors = ["green", "red", "blue", "yellow"];
function getRandomFloatInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
const getMarkersArray = (count: number) => {
  const res: IMarker[] = [];

  Array.from(Array(count + 1).keys()).forEach(() => {
    const color = getRandomFloatInRange(0, pinColors.length);
    const accessibilityLevel = getRandomFloatInRange(
      0,
      accessibilityLevels.length
    );

    res.push({
      latitude: getRandomFloatInRange(51.48, 51.55),
      longitude: getRandomFloatInRange(31.25, 31.33),
      title: "ЧОДА",
      color: pinColors[Number.parseInt(`${color}`)],
      accessibilityLevel:
        accessibilityLevels[Number.parseInt(`${accessibilityLevel}`)],
    });
  });

  return res;
};

const initMarkers = getMarkersArray(50);

export default function Home() {
  const { filters } = useContext(FiltersContext);
  const [markers, setMarkers] = useState(initMarkers);

  const [marker, setMarker] = useState<Region>(initialRegion);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(
      `/submitMarker?latitude=${marker.latitude}&longitude=${marker.longitude}`
    );
  };

  const handleFilter = () => {
    router.push(`/modal`);
  };

  useEffect(() => {
    setMarkers(
      initMarkers.filter((item) => filters.includes(item.accessibilityLevel))
    );
  }, [filters]);

  return (
    <SafeAreaView style={styles.container}>
      <AppBar title="Map" />

      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={styles.container}>
          <MapView
            style={styles.map}
            zoomEnabled
            initialRegion={initialRegion}
            // provider={PROVIDER_GOOGLE}
          >
            <Marker
              draggable
              coordinate={marker}
              onDragEnd={(e) =>
                setMarker({
                  ...marker,
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }
            />
            {markers.map((item, index) => (
              <Marker
                key={index}
                coordinate={item}
                pinColor={item.color}
                title={item.title}
              />
            ))}
          </MapView>
        </View>
        <Button onPress={handleFilter}>Filter</Button>
        <Button onPress={handleNavigate}>Add new marker</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
