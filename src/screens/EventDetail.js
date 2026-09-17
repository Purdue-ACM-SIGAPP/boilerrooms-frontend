import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import AsyncView from "../components/AsyncView";
import Card from "../components/Card";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import useAsync from "../hooks/useAsync";
import useSubmit from "../hooks/useSubmit";
import useRefetchOnFocus from "../hooks/useRefetchOnFocus";
import { deleteEvent, getEvent } from "../api/events";
import { formatDate } from "../utils/format";
import ROUTES from "../navigation/routes";
import { colors, sizes, fontWeights, spacing, textStyles } from "../theme";

export default function EventDetailScreen({ navigation, route }) {
  const { id } = route.params ?? {};
  const event = useAsync(() => getEvent(id), [id]);
  useRefetchOnFocus(event.refetch);
  const [confirming, setConfirming] = useState(false);
  const remove = useSubmit(deleteEvent);

  const handleDelete = async () => {
    if (await remove.submit(id)) {
      setConfirming(false);
      navigation.popTo(ROUTES.NEWS);
    }
  };

  return (
    <Screen scroll>
      <ScreenHeader title="Campus News & Events" />
      <AsyncView state={event} loadingMessage="Loading event…">
        {(e) => (
          <>
            <Card variant="primary">
              <Text style={styles.title}>{e.eventName}</Text>
              {e.date ? (
                <View style={styles.metaRow}>
                  <MaterialCommunityIcons name="calendar-outline" size={sizes.iconSm} color={colors.secondary} />
                  <Text style={styles.meta}>{formatDate(e.date, { withTime: true })}</Text>
                </View>
              ) : null}
              {e.address ? (
                <View style={styles.metaRow}>
                  <MaterialCommunityIcons name="map-marker-outline" size={sizes.iconSm} color={colors.secondary} />
                  <Text style={styles.meta}>{e.address}</Text>
                </View>
              ) : null}
            </Card>
            <Card variant="secondary">
              {e.summary ? <Text style={styles.summary}>{e.summary}</Text> : null}
              <Text style={styles.content}>{e.content || "No further details."}</Text>
            </Card>
            <View style={styles.actions}>
              <Button
                title="Edit"
                icon="pencil-outline"
                variant="outline"
                onPress={() => navigation.navigate(ROUTES.EVENT_FORM, { id })}
              />
              <Button
                title="Delete"
                icon="trash-can-outline"
                variant="danger"
                onPress={() => {
                  remove.setError(null);
                  setConfirming(true);
                }}
              />
            </View>
          </>
        )}
      </AsyncView>
      <ConfirmDialog
        visible={confirming}
        title="Delete this event?"
        message="It will be removed for everyone."
        confirmLabel="Delete"
        destructive
        loading={remove.submitting}
        error={remove.error}
        onConfirm={handleDelete}
        onCancel={() => setConfirming(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { ...textStyles.title, color: colors.textLight, marginBottom: spacing.sm },
  metaRow: { flexDirection: "row", alignItems: "center", gap: spacing.xs, marginTop: spacing.xs },
  meta: { ...textStyles.body, color: colors.secondary, flexShrink: 1 },
  summary: { ...textStyles.subheading, fontWeight: fontWeights.semibold, color: colors.text, marginBottom: spacing.sm },
  content: { ...textStyles.body, color: colors.text },
  actions: { flexDirection: "row", gap: spacing.md, justifyContent: "flex-end" },
});
