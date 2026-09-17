import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import SearchPanel from "../components/SearchPanel";
import CustomMap from "../components/CustomMap";
import useAsync from "../hooks/useAsync";
import useSubmit from "../hooks/useSubmit";
import { BUILDING_TYPES, filterBuildings, getBuildings } from "../api/buildings";
import buildingOutlines from "../constants/buildings.json";
import { CAMPUS_CENTER } from "../constants/campus";
import { buildingLabel } from "../utils/format";
import ROUTES from "../navigation/routes";

const FILTERS = [
  { label: "Residential", type: BUILDING_TYPES.HOUSING },
  { label: "Dining halls", type: BUILDING_TYPES.DINING_COURT },
];
const SEARCH_PAGE_SIZE = 10;

const matchesQuery = (building, query) => {
  const needle = query.trim().toLowerCase();
  return !needle || [building.name, building.acronym].some((value) => value?.toLowerCase().includes(needle));
};

const searchBuildings = (query, type) =>
  type ? filterBuildings(type) : getBuildings({ query, pageLength: SEARCH_PAGE_SIZE });

export default function MapScreen({ navigation, route }) {
  const { latitude, longitude } = route.params ?? {};
  const [marker, setMarker] = useState(CAMPUS_CENTER);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(null);
  const [results, setResults] = useState(null);
  const search = useSubmit(searchBuildings);

  useEffect(() => {
    if (latitude != null && longitude != null) setMarker({ latitude: Number(latitude), longitude: Number(longitude) });
  }, [latitude, longitude]);

  // Names label the outlines where the map can't be drawn (web); outlines still work without them.
  const buildings = useAsync(() => getBuildings(), []);
  const outlines = useMemo(() => {
    const names = Object.fromEntries((buildings.data ?? []).map((b) => [b.id, buildingLabel(b)]));
    return buildingOutlines.list.map((outline) => ({ ...outline, name: names[outline.buildingID] }));
  }, [buildings.data]);

  const runSearch = useCallback(
    async (text, type) => {
      if (!text.trim() && !type) return setResults(null);
      const data = await search.submit(text.trim(), type);
      if (Array.isArray(data)) setResults(type ? data.filter((b) => matchesQuery(b, text)) : data);
    },
    [search.submit]
  );

  const handleQueryChange = (text) => {
    setQuery(text);
    if (!text && !filter) setResults(null);
  };

  const handleFilterPress = (type) => {
    const next = filter === type ? null : type;
    setFilter(next);
    runSearch(query, next);
  };

  const openBuilding = (id) => {
    setResults(null);
    navigation.navigate(ROUTES.BUILDING_DETAIL, { id });
  };

  return (
    <Screen padded={false}>
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchPanel
            query={query}
            onQueryChange={handleQueryChange}
            onSubmit={() => runSearch(query, filter)}
            filters={FILTERS}
            activeFilter={filter}
            onFilterPress={handleFilterPress}
            results={results}
            loading={search.submitting}
            error={search.error}
            onSelect={(building) => openBuilding(building.id)}
          />
        </View>
        <CustomMap
          markerPosition={marker}
          highlightedBuildings={outlines}
          onBuildingPress={(outline) => openBuilding(outline.buildingID)}
          onMapPress={(coordinate) => {
            setResults(null);
            setMarker(coordinate);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: { zIndex: 1 },
});
