import React from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, sizes, radii, spacing, textStyles } from "../theme";

// react-native-maps has no web implementation: show the outlined buildings as a list instead.
// Same props as the native CustomMap.
export default function CustomMap({ markerPosition, highlightedBuildings = [], onBuildingPress }) {
  return (
    <View style={styles.webContainer}>
      <View style={styles.webHeader}>
        <MaterialCommunityIcons name="map-marker-question-outline" size={sizes.iconMd} color={colors.primary} />
        <View style={styles.webHeaderText}>
          <Text style={styles.webTitle}>Interactive map is available in the mobile app</Text>
          <Text style={styles.webSubtitle}>
            Centered at {markerPosition.latitude.toFixed(4)}, {markerPosition.longitude.toFixed(4)}
          </Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.webList}>
        {highlightedBuildings.map((building, index) => (
          <Pressable
            key={`${building.buildingID}-${index}`}
            accessibilityRole="button"
            onPress={() => onBuildingPress?.(building)}
            style={({ pressed }) => [styles.webItem, pressed && styles.webItemPressed]}
          >
            <Text style={styles.webItemText}>{building.name || `Building ${index + 1}`}</Text>
            <MaterialCommunityIcons name="chevron-right" size={sizes.iconMd} color={colors.textMuted} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  webContainer: { flex: 1, backgroundColor: colors.secondary },
  webHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm, padding: spacing.md },
  webHeaderText: { flex: 1 },
  webTitle: { ...textStyles.subheading, color: colors.primary },
  webSubtitle: { ...textStyles.small, color: colors.textMuted, marginTop: spacing.xxs },
  webList: { paddingHorizontal: spacing.md, paddingBottom: spacing.md, gap: spacing.sm },
  webItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  webItemPressed: { opacity: 0.8 },
  webItemText: { ...textStyles.body, color: colors.text, flex: 1 },
});
