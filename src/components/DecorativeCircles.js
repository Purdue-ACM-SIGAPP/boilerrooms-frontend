import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, radii } from "../theme";

// Soft background circles used behind auth and info screens.
export default function DecorativeCircles() {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={[styles.circle, styles.topRight]} />
      <View style={[styles.circle, styles.bottomLeft]} />
      <View style={[styles.circle, styles.bottomRight]} />
    </View>
  );
}

const LARGE = 420;
const SMALL = 300;

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, overflow: "hidden" },
  circle: { position: "absolute", borderRadius: radii.pill, backgroundColor: colors.secondaryDark },
  topRight: { width: SMALL, height: SMALL, top: -SMALL / 2, right: -SMALL / 3 },
  bottomLeft: { width: LARGE, height: LARGE, bottom: -LARGE / 2, left: -LARGE / 3 },
  bottomRight: { width: SMALL, height: SMALL, bottom: -SMALL / 2, right: -SMALL / 3 },
});
