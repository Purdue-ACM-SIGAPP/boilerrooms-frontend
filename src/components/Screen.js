import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DecorativeCircles from "./DecorativeCircles";
import { colors, sizes, spacing } from "../theme";

/**
 * Safe-area page container.
 * scroll: wrap content in a ScrollView · padded: horizontal gutter
 * decorative: background circles · centered: vertically center content
 */
export default function Screen({
  children,
  scroll = false,
  padded = true,
  centered = false,
  decorative = false,
  refreshControl,
  contentStyle,
}) {
  const contentStyles = [padded && styles.padded, centered && styles.centered, contentStyle];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {decorative ? <DecorativeCircles /> : null}
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, ...contentStyles]}
            keyboardShouldPersistTaps="handled"
            refreshControl={refreshControl}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.flex, ...contentStyles]}>{children}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, overflow: "hidden" },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xl },
  padded: {
    paddingHorizontal: spacing.md,
    width: "100%",
    maxWidth: sizes.contentMaxWidth,
    alignSelf: "center",
  },
  centered: { justifyContent: "center" },
});
