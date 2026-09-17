import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import Button from "../components/Button";
import ROUTES from "../navigation/routes";
import { spacing } from "../theme";

export default function IntroScreen({ navigation }) {
  return (
    <Screen decorative scroll centered>
      <BrandHeader />
      <View style={styles.actions}>
        <Button title="Log in" variant="outline" size="lg" fullWidth onPress={() => navigation.navigate(ROUTES.LOGIN)} />
        <Button title="Sign up" variant="accent" size="lg" fullWidth onPress={() => navigation.navigate(ROUTES.SIGNUP)} />
        <Button
          title="Continue as guest"
          variant="ghost"
          style={styles.guest}
          onPress={() => navigation.navigate(ROUTES.TABS)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  actions: { gap: spacing.md, paddingVertical: spacing.lg },
  guest: { alignSelf: "center" },
});
