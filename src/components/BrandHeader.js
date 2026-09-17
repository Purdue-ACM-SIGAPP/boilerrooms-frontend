import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { colors, spacing, textStyles } from "../theme";

const logo = require("../../assets/logo.png");

// "Boiler Rooms" wordmark with logo. compact: smaller logo for form screens.
export default function BrandHeader({ compact = false }) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={compact ? styles.logoCompact : styles.logo} accessibilityIgnoresInvertColors />
      <Text style={styles.wordmark} accessibilityRole="header">
        <Text style={styles.boiler}>Boiler</Text>
        <Text style={styles.rooms}> Rooms</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.md, marginBottom: spacing.xl },
  logo: { width: 240, height: 240, resizeMode: "contain" },
  logoCompact: { width: 96, height: 96, resizeMode: "contain" },
  wordmark: { textAlign: "center" },
  boiler: { ...textStyles.display, color: colors.primaryDark },
  rooms: { ...textStyles.display, color: colors.primary },
});
