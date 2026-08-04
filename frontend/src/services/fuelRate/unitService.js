import api from "../api"

export const getAllUnits = () =>
  api.get("/units");

export const addUnit = (data) =>
  api.post("/units", data);

export const deleteUnit = (unitId) => {
  return api.delete(`/units/${unitId}`);
};