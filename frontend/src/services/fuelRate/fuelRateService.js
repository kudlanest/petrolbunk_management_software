import privateApi from "../privateApi";

export const createFuelRate = (data) =>
  privateApi.post("/fuel-rates", data);

export const getFuelRates = () =>
  privateApi.get("/fuel-rates");

export const updateFuelRate = (data) =>
  privateApi.put("/fuel-rates", data);

export const getFuelRateHistory = () =>
  privateApi.get("/fuel-rates/history");