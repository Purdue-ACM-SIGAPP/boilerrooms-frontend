import React, { useCallback, useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import AsyncView from "../components/AsyncView";
import TextField from "../components/TextField";
import Button from "../components/Button";
import useAsync from "../hooks/useAsync";
import useSubmit from "../hooks/useSubmit";
import { createEvent, getEvent, updateEvent } from "../api/events";
import { useSession } from "../context/SessionContext";
import { parseDateInput, toDateInput } from "../utils/format";
import ROUTES from "../navigation/routes";
import { colors, spacing, textStyles } from "../theme";

const toForm = (event) => ({
  eventName: event?.eventName ?? "",
  summary: event?.summary ?? "",
  content: event?.content ?? "",
  address: event?.address ?? "",
  date: toDateInput(event?.date),
});

// Creates an event, or edits the event whose `id` is passed in route params.
export default function EventFormScreen({ navigation, route }) {
  const { id } = route.params ?? {};
  const { userId } = useSession();
  const existing = useAsync(() => (id ? getEvent(id) : Promise.resolve(null)), [id]);
  const [form, setForm] = useState(toForm());
  const [errors, setErrors] = useState({});
  const save = useSubmit(useCallback((payload) => (id ? updateEvent(payload) : createEvent(payload)), [id]));

  useEffect(() => {
    if (existing.data) setForm(toForm(existing.data));
  }, [existing.data]);

  const field = (key) => ({
    value: form[key],
    error: errors[key],
    onChangeText: (text) => setForm((prev) => ({ ...prev, [key]: text })),
  });

  const handleSave = async () => {
    const date = parseDateInput(form.date);
    const nextErrors = {
      eventName: form.eventName.trim() ? null : "Give the event a name.",
      date: date ? null : "Use the format YYYY-MM-DD HH:mm.",
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    const saved = await save.submit({
      ...existing.data,
      userID: existing.data?.userID ?? userId ?? undefined,
      eventName: form.eventName.trim(),
      summary: form.summary.trim(),
      content: form.content.trim(),
      address: form.address.trim(),
      date,
    });
    if (saved) navigation.canGoBack() ? navigation.goBack() : navigation.popTo(ROUTES.NEWS);
  };

  return (
    <Screen scroll>
      <ScreenHeader title={id ? "Edit event" : "New event"} />
      <AsyncView state={existing} isEmpty={() => false} loadingMessage="Loading event…">
        {() => (
          <>
            <TextField label="Event name" placeholder="Boiler Gold Rush kickoff" {...field("eventName")} />
            <TextField label="Date and time" placeholder="2026-09-15 18:30" autoCapitalize="none" {...field("date")} />
            <TextField label="Location" placeholder="Purdue Memorial Union" {...field("address")} />
            <TextField label="Summary" placeholder="One or two sentences" multiline {...field("summary")} />
            <TextField label="Details" placeholder="Everything attendees should know" multiline {...field("content")} />
            {save.error ? <Text style={styles.error}>{save.error}</Text> : null}
            <Button title={id ? "Save changes" : "Post event"} size="lg" fullWidth loading={save.submitting} onPress={handleSave} />
          </>
        )}
      </AsyncView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  error: { ...textStyles.caption, color: colors.warning, marginBottom: spacing.sm },
});
