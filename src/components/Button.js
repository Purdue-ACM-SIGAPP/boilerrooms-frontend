import React from "react";
import { ActivityIndicator, Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sizes, colors, fontSizes, fontWeights, radii, spacing } from "../theme";

/**
 * variant: primary | accent | outline | ghost | danger
 * size: sm | md | lg
 */
export default function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  accessibilityLabel,
}) {
  const inactive = disabled || loading;
  const color = contentColors[variant];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: inactive, busy: loading }}
      onPress={onPress}
      disabled={inactive}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        inactive && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : (
        <View style={styles.content}>
          {icon ? <MaterialCommunityIcons name={icon} size={sizes.iconSm} color={color} /> : null}
          {title ? <Text style={[styles.text, styles[`${size}Text`], styles[`${variant}Text`]]}>{title}</Text> : null}
        </View>
      )}
    </Pressable>
  );
}

const contentColors = {
  primary: colors.textLight,
  accent: colors.textLight,
  danger: colors.textLight,
  outline: colors.primary,
  ghost: colors.primary,
};

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: "transparent",
  },
  content: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  fullWidth: { alignSelf: "stretch" },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },

  primary: { backgroundColor: colors.primary },
  accent: { backgroundColor: colors.accent },
  danger: { backgroundColor: colors.warning },
  outline: { backgroundColor: colors.surface, borderColor: colors.primary },
  ghost: { backgroundColor: "transparent" },

  sm: { minHeight: 32, paddingHorizontal: spacing.md },
  md: { minHeight: sizes.touch, paddingHorizontal: spacing.lg },
  lg: { minHeight: 56, paddingHorizontal: spacing.xl },

  text: { fontWeight: fontWeights.semibold },
  smText: { fontSize: fontSizes.sm },
  mdText: { fontSize: fontSizes.md },
  lgText: { fontSize: fontSizes.lg },

  primaryText: { color: contentColors.primary },
  accentText: { color: contentColors.accent },
  dangerText: { color: contentColors.danger },
  outlineText: { color: contentColors.outline },
  ghostText: { color: contentColors.ghost },
});
