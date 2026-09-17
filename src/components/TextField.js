import React from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { colors, fontWeights, radii, sizes, spacing, textStyles } from "../theme";

export default function TextField({ label, error, hint, multiline = false, style, inputStyle, ...inputProps }) {
  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        style={[styles.input, multiline && styles.multiline, error && styles.inputError, inputStyle]}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: "stretch", marginBottom: spacing.md },
  label: { ...textStyles.caption, fontWeight: fontWeights.semibold, color: colors.text, marginBottom: spacing.xs },
  input: {
    ...textStyles.body,
    minHeight: sizes.touch,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  multiline: { minHeight: 110, textAlignVertical: "top" },
  inputError: { borderColor: colors.warning },
  error: { ...textStyles.small, color: colors.warning, marginTop: spacing.xs },
  hint: { ...textStyles.small, color: colors.textMuted, marginTop: spacing.xs },
});
