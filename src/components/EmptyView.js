import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "./Button";
import { colors, sizes, spacing, textStyles } from "../theme";

export default function EmptyView({ message = "Nothing here yet.", icon = "inbox-outline", actionLabel, onAction }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={sizes.iconLg} color={colors.textMuted} />
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? <Button title={actionLabel} size="sm" onPress={onAction} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl, gap: spacing.sm },
  message: { ...textStyles.body, color: colors.textMuted, textAlign: "center" },
});
