import React from "react";
import { Pressable, ScrollView, Text, View, StyleSheet } from "react-native";
import SearchBar from "./SearchBar";
import FilterChip from "./FilterChip";
import { buildingLabel } from "../utils/format";
import { colors, fontWeights, radii, shadows, spacing, textStyles } from "../theme";

/**
 * Building search overlay: search bar, type filters and a results dropdown.
 * `results` is null while no search is active.
 */
export default function SearchPanel({
  query,
  onQueryChange,
  onSubmit,
  filters,
  activeFilter,
  onFilterPress,
  results,
  loading,
  error,
  onSelect,
}) {
  return (
    <View style={styles.panel}>
      <SearchBar
        value={query}
        onChangeText={onQueryChange}
        onSubmit={onSubmit}
        loading={loading}
        placeholder="Search buildings by name or acronym"
      />
      <View style={styles.chips}>
        {filters.map((filter) => (
          <FilterChip
            key={filter.type}
            label={filter.label}
            selected={activeFilter === filter.type}
            onPress={() => onFilterPress(filter.type)}
          />
        ))}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {results ? (
        <ScrollView style={styles.results} keyboardShouldPersistTaps="handled">
          {results.length === 0 ? (
            <Text style={styles.empty}>No buildings found.</Text>
          ) : (
            results.map((building) => (
              <Pressable
                key={building.id}
                accessibilityRole="button"
                onPress={() => onSelect(building)}
                style={({ pressed }) => [styles.result, pressed && styles.resultPressed]}
              >
                <Text style={styles.resultTitle}>{buildingLabel(building)}</Text>
                {building.address ? <Text style={styles.resultSubtitle}>{building.address}</Text> : null}
              </Pressable>
            ))
          )}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.secondary,
    padding: spacing.md,
    gap: spacing.sm,
    borderBottomLeftRadius: radii.lg,
    borderBottomRightRadius: radii.lg,
    ...shadows.md,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  error: { ...textStyles.caption, color: colors.warning },
  results: { maxHeight: 260, backgroundColor: colors.surface, borderRadius: radii.sm },
  result: { padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  resultPressed: { backgroundColor: colors.secondary },
  resultTitle: { ...textStyles.body, fontWeight: fontWeights.semibold, color: colors.text },
  resultSubtitle: { ...textStyles.small, color: colors.textMuted, marginTop: spacing.xxs },
  empty: { ...textStyles.caption, color: colors.textMuted, padding: spacing.md },
});
