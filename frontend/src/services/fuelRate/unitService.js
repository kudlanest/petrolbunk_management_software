import privateApi from "../privateApi";

export const getAllUnits = () =>
  privateApi.get("/units");

export const addUnit = (data) =>
  privateApi.post("/units", data);

export const deleteUnit = (unitId) => {
  return privateApi.delete(`/units/${unitId}`);
};