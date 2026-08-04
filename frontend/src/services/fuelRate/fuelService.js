import api from "../api"

export const getAllFuels = () =>
  api.get("/fuels");

export const addFuel = (data) =>
  api.post("/fuels", data);

export const updateFuelStatus = (id, status) =>
  api.patch(`/fuels/${id}/status?status=${status}`);

export const deleteFuel = (fuelId) => {
  return api.delete(`/fuels/${fuelId}`);
};