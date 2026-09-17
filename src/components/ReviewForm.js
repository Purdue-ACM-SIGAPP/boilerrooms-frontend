import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Card from "./Card";
import Button from "./Button";
import StarRating from "./StarRating";
import TextField from "./TextField";
import { formatRating } from "../utils/format";
import { sizes, colors, fontWeights, spacing, textStyles } from "../theme";

// onSubmit({ rating, description }) must resolve truthy on success so the form can reset.
export default function ReviewForm({ onSubmit, submitting = false, error }) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [validation, setValidation] = useState(null);

  const handleSubmit = async () => {
    if (!rating) return setValidation("Tap the stars to choose a rating.");
    if (!description.trim()) return setValidation("Tell others a little about this building.");
    setValidation(null);
    if (await onSubmit({ rating, description: description.trim() })) {
      setRating(0);
      setDescription("");
    }
  };

  return (
    <Card>
      <Text style={styles.label}>Your rating</Text>
      <View style={styles.ratingRow}>
        <StarRating rating={rating} onChange={setRating} size={sizes.iconLg} />
        <Text style={styles.ratingText}>{rating ? formatRating(rating) : "Not rated"}</Text>
      </View>
      <TextField
        label="Your review"
        placeholder="What was it like?"
        value={description}
        onChangeText={setDescription}
        multiline
        maxLength={1000}
      />
      {validation || error ? <Text style={styles.error}>{validation || error}</Text> : null}
      <Button title="Post review" onPress={handleSubmit} loading={submitting} fullWidth />
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { ...textStyles.caption, fontWeight: fontWeights.semibold, color: colors.text },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginVertical: spacing.sm },
  ratingText: { ...textStyles.caption, color: colors.textMuted },
  error: { ...textStyles.caption, color: colors.warning, marginBottom: spacing.sm },
});
