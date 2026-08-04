import api from "../api"

export const createFuelRate = (data) =>
  api.post("/fuel-rates", data);

export const getFuelRates = () =>
  api.get("/fuel-rates");

export const updateFuelRate = (data) =>
  api.put("/fuel-rates", data);

export const getFuelRateHistory = () =>
  api.get("/fuel-rates/history");