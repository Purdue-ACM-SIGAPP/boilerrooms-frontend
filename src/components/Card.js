import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { colors, radii, shadows, spacing } from "../theme";

// variant: light | primary | secondary
export default function Card({ children, onPress, variant = "light", style, accessibilityLabel }) {
  const cardStyle = [styles.base, styles[variant], style];
  if (!onPress) return <View style={cardStyle}>{children}</View>;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={({ pressed }) => [...cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radii.md, padding: spacing.md, marginBottom: spacing.md, ...shadows.sm },
  light: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  pressed: { opacity: 0.85 },
});
