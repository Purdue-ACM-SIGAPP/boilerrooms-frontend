import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { colors, fontWeights, radii, spacing, textStyles } from "../theme";

export default function FilterChip({ label, selected = false, onPress, disabled = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 32,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  selected: { backgroundColor: colors.primary },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  label: { ...textStyles.caption, fontWeight: fontWeights.medium, color: colors.primary },
  labelSelected: { color: colors.textLight },
});
