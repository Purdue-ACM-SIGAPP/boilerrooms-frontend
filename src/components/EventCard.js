import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from "./Card";
import Button from "./Button";
import { formatDate } from "../utils/format";
import { colors, sizes, spacing, textStyles } from "../theme";

export default function EventCard({ event, expanded = false, onToggle, onOpen }) {
  return (
    <Card variant="primary" onPress={onToggle} accessibilityLabel={event.eventName}>
      <Text style={styles.title}>{event.eventName}</Text>
      <View style={styles.meta}>
        {event.date ? (
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="calendar-outline" size={sizes.iconSm} color={colors.secondary} />
            <Text style={styles.metaText}>{formatDate(event.date, { withTime: true })}</Text>
          </View>
        ) : null}
        {event.address ? (
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="map-marker-outline" size={sizes.iconSm} color={colors.secondary} />
            <Text style={styles.metaText}>{event.address}</Text>
          </View>
        ) : null}
      </View>
      {event.summary ? (
        <Text style={styles.summary} numberOfLines={expanded ? undefined : 3}>
          {event.summary}
        </Text>
      ) : null}
      {expanded && onOpen ? (
        <Button title="View details" variant="accent" size="sm" onPress={onOpen} style={styles.button} />
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { ...textStyles.heading, color: colors.textLight },
  meta: { gap: spacing.xs, marginTop: spacing.sm },
  metaItem: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  metaText: { ...textStyles.caption, color: colors.secondary, flexShrink: 1 },
  summary: { ...textStyles.body, color: colors.textLight, marginTop: spacing.sm },
  button: { marginTop: spacing.md },
});
