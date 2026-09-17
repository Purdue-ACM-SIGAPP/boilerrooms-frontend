import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import Button from "../components/Button";
import ROUTES from "../navigation/routes";
import { colors, sizes, spacing, textStyles } from "../theme";

export default function NotFoundScreen({ navigation }) {
  return (
    <Screen decorative centered>
      <View style={styles.content}>
        <MaterialCommunityIcons name="map-marker-question-outline" size={sizes.iconXl} color={colors.accent} />
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.body}>That path doesn't lead anywhere on campus.</Text>
        <Button
          title="Back to map"
          icon="map-marker-outline"
          size="lg"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: ROUTES.TABS }] })}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: "center", gap: spacing.md },
  title: { ...textStyles.title, color: colors.primary },
  body: { ...textStyles.body, color: colors.textMuted, textAlign: "center", marginBottom: spacing.md },
});
