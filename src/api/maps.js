import client from "./client";

// → { distance, duration } as human-readable strings (e.g. "0.4 mi", "8 mins").
export const getUserDistance = ({ buildingId, latitude, longitude }) =>
  client.get("maps/user_distance", { params: { buildingId, latitude, longitude } });

// → { building1, building2, distance, duration }
export const getBuildingDistance = (buildingId1, buildingId2) =>
  client.get("maps/distance", { params: { buildingId1, buildingId2 } });

export const setBuildingCoordinates = (buildingId) =>
  client.post("maps/set-coordinates", null, { params: { buildingId } });
