import React from "react";
import { ActivityIndicator, Pressable, TextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, sizes, spacing, radii, textStyles } from "../theme";

export default function SearchBar({ value, onChangeText, onSubmit, placeholder = "Search…", loading = false, onFocus, style }) {
  return (
    <View style={[styles.container, style]}>
      <MaterialCommunityIcons name="magnify" size={sizes.iconMd} color={colors.primary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={() => onSubmit?.(value)}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        accessibilityLabel={placeholder}
        autoCorrect={false}
      />
      {loading ? <ActivityIndicator color={colors.primary} /> : null}
      {!loading && value ? (
        <Pressable accessibilityLabel="Clear search" hitSlop={spacing.sm} onPress={() => onChangeText("")}>
          <MaterialCommunityIcons name="close-circle" size={sizes.iconSm} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: sizes.touch,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  input: { ...textStyles.body, flex: 1, color: colors.text, paddingVertical: spacing.sm },
});
