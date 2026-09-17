import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import BrandHeader from "../components/BrandHeader";
import TextField from "../components/TextField";
import Button from "../components/Button";
import useSubmit from "../hooks/useSubmit";
import { login } from "../api/users";
import { useSession } from "../context/SessionContext";
import ROUTES from "../navigation/routes";
import { colors, spacing, textStyles } from "../theme";

export default function LoginScreen({ navigation }) {
  const { signIn } = useSession();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { submit, submitting, error } = useSubmit(login);

  const field = (key) => ({
    value: form[key],
    error: errors[key],
    onChangeText: (text) => setForm((prev) => ({ ...prev, [key]: text })),
  });

  const handleLogin = async () => {
    const username = form.username.trim();
    const nextErrors = {
      username: username ? null : "Enter your username.",
      password: form.password ? null : "Enter your password.",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const user = await submit(username, form.password);
    if (user?.id) {
      signIn(user.id);
      navigation.navigate(ROUTES.TABS, { screen: ROUTES.NEWS_TAB });
    }
  };

  return (
    <Screen decorative scroll centered>
      <BrandHeader compact />
      <Text style={styles.title}>Log in</Text>
      <TextField label="Username" placeholder="purduepete" autoCapitalize="none" autoCorrect={false} {...field("username")} />
      <TextField
        label="Password"
        placeholder="••••••••"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        onSubmitEditing={handleLogin}
        {...field("password")}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Log in" size="lg" fullWidth loading={submitting} onPress={handleLogin} />
      <View style={styles.row}>
        <Text style={styles.body}>No account yet?</Text>
        <Button title="Sign up" variant="ghost" size="sm" onPress={() => navigation.navigate(ROUTES.SIGNUP)} />
      </View>
      {navigation.canGoBack() ? (
        <Button title="Back" variant="ghost" style={styles.back} onPress={navigation.goBack} />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...textStyles.title, color: colors.primary, textAlign: "center", marginBottom: spacing.lg },
  body: { ...textStyles.body, color: colors.textMuted },
  error: { ...textStyles.caption, color: colors.warning, textAlign: "center", marginBottom: spacing.sm },
  row: { flexDirection: "row", alignItems: "baseline", justifyContent: "center", flexWrap: "wrap", marginTop: spacing.md },
  back: { alignSelf: "center", marginTop: spacing.sm },
});
