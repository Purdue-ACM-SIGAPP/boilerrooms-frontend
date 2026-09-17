import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import ScreenHeader from "../components/ScreenHeader";
import AsyncView from "../components/AsyncView";
import EmptyView from "../components/EmptyView";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";
import useAsync from "../hooks/useAsync";
import useRefetchOnFocus from "../hooks/useRefetchOnFocus";
import { getEvents } from "../api/events";
import ROUTES from "../navigation/routes";
import { spacing } from "../theme";

const byNewest = (a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0);

// The API only supports exact-match filters, so free-text search runs client-side.
const matches = (event, query) => {
  const needle = query.trim().toLowerCase();
  return !needle || [event.eventName, event.summary, event.address].some((v) => v?.toLowerCase().includes(needle));
};

export default function NewsAndEventsScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const events = useAsync(async () => (await getEvents()).sort(byNewest), []);
  useRefetchOnFocus(events.refetch);

  const visible = useMemo(() => (events.data ?? []).filter((event) => matches(event, query)), [events.data, query]);

  return (
    <Screen>
      <ScreenHeader
        title="News & Events"
        showBack={false}
        right={<Button title="New" icon="plus" size="sm" onPress={() => navigation.navigate(ROUTES.EVENT_FORM)} />}
      />
      <SearchBar value={query} onChangeText={setQuery} placeholder="Search events" style={styles.search} />
      <AsyncView state={events} loadingMessage="Loading events…" emptyMessage="No events yet." emptyIcon="calendar-outline">
        {() =>
          visible.length === 0 ? (
            <EmptyView message="No events match your search." icon="magnify" />
          ) : (
            <FlatList
              data={visible}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <EventCard
                  event={item}
                  expanded={expandedId === item.id}
                  onToggle={() => setExpandedId(expandedId === item.id ? null : item.id)}
                  onOpen={() => navigation.navigate(ROUTES.EVENT_DETAIL, { id: item.id })}
                />
              )}
              refreshing={events.loading}
              onRefresh={events.refetch}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
            />
          )
        }
      </AsyncView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: { marginBottom: spacing.md },
  list: { paddingBottom: spacing.lg },
});
