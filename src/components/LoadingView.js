import React from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import { colors, spacing, textStyles } from "../theme";

export default function LoadingView({ message = "Loading…" }) {
  return (
    <View style={styles.container} accessibilityLiveRegion="polite">
      <ActivityIndicator size="large" color={colors.primary} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl, gap: spacing.sm },
  message: { ...textStyles.caption, color: colors.textMuted },
});
