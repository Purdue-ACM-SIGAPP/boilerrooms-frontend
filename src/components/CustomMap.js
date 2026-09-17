import React, { useEffect, useRef } from "react";
import MapView, { Marker, Polygon } from "react-native-maps";
import { MAP_DELTA } from "../constants/campus";
import { colors } from "../theme";
import { StyleSheet } from "react-native";

/**
 * Native map with a center marker and tappable building outlines.
 * highlightedBuildings: [{ buildingID, name?, coordinates: [{ latitude, longitude }] }]
 */
export default function CustomMap({ markerPosition, highlightedBuildings = [], onBuildingPress, onMapPress }) {
  const mapRef = useRef(null);
  const { latitude, longitude } = markerPosition;

  useEffect(() => {
    mapRef.current?.animateToRegion({ latitude, longitude, ...MAP_DELTA });
  }, [latitude, longitude]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{ latitude, longitude, ...MAP_DELTA }}
      onPress={(event) => onMapPress?.(event.nativeEvent.coordinate)}
    >
      <Marker coordinate={markerPosition} />
      {highlightedBuildings.map((building, index) => (
        <Polygon
          key={`${building.buildingID}-${index}`}
          coordinates={building.coordinates}
          fillColor={colors.mapFill}
          strokeColor={colors.mapStroke}
          strokeWidth={2}
          tappable
          onPress={() => onBuildingPress?.(building)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
