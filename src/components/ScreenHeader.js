import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors, sizes, spacing, textStyles } from "../theme";

export default function ScreenHeader({ title, subtitle, right, showBack = true }) {
  const navigation = useNavigation();
  const canGoBack = showBack && navigation.canGoBack();

  return (
    <View style={styles.container}>
      {canGoBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={navigation.goBack}
          hitSlop={spacing.sm}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={sizes.iconMd} color={colors.primary} />
        </Pressable>
      ) : null}
      <View style={styles.titleBlock}>
        <Text style={styles.title} numberOfLines={2} accessibilityRole="header">
          {title}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: spacing.md },
  backButton: { width: sizes.touch, height: sizes.touch, alignItems: "center", justifyContent: "center" },
  titleBlock: { flex: 1 },
  title: { ...textStyles.title, color: colors.primary },
  subtitle: { ...textStyles.caption, color: colors.textMuted, marginTop: spacing.xxs },
  right: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
});
