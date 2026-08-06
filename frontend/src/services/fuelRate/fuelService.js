import privateApi from "../privateApi";

export const getAllFuels = () =>
  privateApi.get("/fuels");

export const addFuel = (data) =>
  privateApi.post("/fuels", data);

export const updateFuelStatus = (id, status) =>
  privateApi.patch(`/fuels/${id}/status?status=${status}`);

export const deleteFuel = (fuelId) => {
  return privateApi.delete(`/fuels/${fuelId}`);
};