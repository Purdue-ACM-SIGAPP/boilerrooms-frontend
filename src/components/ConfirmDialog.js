import React from "react";
import { Modal, Text, View, StyleSheet } from "react-native";
import Button from "./Button";
import { colors, radii, shadows, spacing, textStyles } from "../theme";

export default function ConfirmDialog({
  visible,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  loading = false,
  error,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <View style={styles.dialog} accessibilityRole="alert">
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <View style={styles.actions}>
            <Button title={cancelLabel} variant="outline" onPress={onCancel} disabled={loading} />
            <Button title={confirmLabel} variant={destructive ? "danger" : "primary"} onPress={onConfirm} loading={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: colors.overlay, alignItems: "center", justifyContent: "center", padding: spacing.lg },
  dialog: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.md,
  },
  title: { ...textStyles.heading, color: colors.text, textAlign: "center" },
  message: { ...textStyles.body, color: colors.textMuted, textAlign: "center" },
  error: { ...textStyles.caption, color: colors.warning, textAlign: "center" },
  actions: { flexDirection: "row", justifyContent: "center", gap: spacing.md },
});
