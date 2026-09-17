import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import { colors, sizes, spacing, textStyles } from "../theme";

export default function ErrorView({ message = "Something went wrong.", onRetry }) {
  return (
    <View style={styles.container} accessibilityRole="alert">
      <MaterialCommunityIcons name="alert-circle-outline" size={sizes.iconLg} color={colors.warning} />
      <Text style={styles.message}>{message}</Text>
      {onRetry ? <Button title="Try again" variant="outline" size="sm" icon="refresh" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl, gap: spacing.sm },
  message: { ...textStyles.body, color: colors.text, textAlign: "center" },
});
