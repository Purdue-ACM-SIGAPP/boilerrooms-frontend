import client, { uploadFile } from "./client";

export const BUILDING_TYPES = { HOUSING: "Housing", DINING_COURT: "DinningCourt" };

export const getBuildings = ({ query, scoreThreshold, pageLength, pageIndex } = {}) =>
  client.get("Building", { params: { query: query || undefined, scoreThreshold, pageLength, pageIndex } });

export const getBuilding = (id) => client.get(`Building/${id}`);

export const getBuildingOutlines = ({ id, radius } = {}) =>
  client.get("Building/outline", { params: { id, radius } });

// criteria keys — Housing: pianoNum, kitchenNum, haveDinningCourt, haveBoilerMarket, studySpaceNum;
// DinningCourt: acceptsSwipes, acceptsDiningDollars, acceptsBoilerExpress, stableOptions, busyHours.
export const filterBuildings = (type, criteria) =>
  client.get("Building/filter", {
    params: { type, criteria: criteria && Object.keys(criteria).length ? JSON.stringify(criteria) : undefined },
  });

export const createBuilding = (building) => client.post("Building", building);
export const updateBuilding = (building) => client.put("Building", building);
export const deleteBuilding = (id) => client.delete(`Building/${id}`);
export const uploadBuildingImage = (id, file) => uploadFile(`Building/uploadImage/${id}`, file);
