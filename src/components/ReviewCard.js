import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "./Card";
import Button from "./Button";
import StarRating from "./StarRating";
import { formatDate } from "../utils/format";
import { colors, sizes, spacing, textStyles } from "../theme";

export default function ReviewCard({ review, onFlag, flagging = false, onDelete, deleting = false }) {
  return (
    <Card variant="secondary">
      <View style={styles.header}>
        <StarRating rating={review.rating} size={sizes.iconSm} />
        <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
      </View>
      {review.description ? <Text style={styles.description}>{review.description}</Text> : null}
      <View style={styles.footer}>
        <View style={styles.counts}>
          <MaterialCommunityIcons name="thumb-up-outline" size={sizes.iconSm} color={colors.textMuted} />
          <Text style={styles.count}>{review.likeCount ?? 0}</Text>
          <MaterialCommunityIcons name="thumb-down-outline" size={sizes.iconSm} color={colors.textMuted} />
          <Text style={styles.count}>{review.dislikeCount ?? 0}</Text>
        </View>
        <View style={styles.actions}>
          {onDelete ? (
            <Button title="Delete" icon="trash-can-outline" variant="ghost" size="sm" loading={deleting} onPress={onDelete} />
          ) : null}
          {onFlag ? (
            <Button
              title={review.flagged ? "Reported" : "Report"}
              icon={review.flagged ? "flag" : "flag-outline"}
              variant="ghost"
              size="sm"
              disabled={review.flagged}
              loading={flagging}
              onPress={onFlag}
            />
          ) : null}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  date: { ...textStyles.small, color: colors.textMuted },
  description: { ...textStyles.body, color: colors.text, marginTop: spacing.sm },
  footer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.sm },
  counts: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  count: { ...textStyles.small, color: colors.textMuted, marginRight: spacing.sm },
  actions: { flexDirection: "row", alignItems: "center" },
});
