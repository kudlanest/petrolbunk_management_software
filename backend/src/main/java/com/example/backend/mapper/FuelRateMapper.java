package com.example.backend.mapper;



import java.time.format.DateTimeFormatter;

import com.example.backend.dto.fuel_rate.FuelRateHistoryResponse;
import com.example.backend.dto.fuel_rate.FuelRateResponse;
import com.example.backend.entities.fuel_rate.FuelRate;
import com.example.backend.entities.fuel_rate.FuelRateHistory;



public class FuelRateMapper {

    private static final DateTimeFormatter DATE_FORMAT =
            DateTimeFormatter.ofPattern("dd MMM yyyy");

    private static final DateTimeFormatter TIME_FORMAT =
            DateTimeFormatter.ofPattern("hh:mm a");

    private FuelRateMapper() {
    }

    public static FuelRateResponse toFuelRateResponse(FuelRate fuelRate) {

        FuelRateResponse response = new FuelRateResponse();

        response.setFuelId(fuelRate.getFuel().getId());
        response.setFuelName(fuelRate.getFuel().getFuelName());
        response.setUnit(fuelRate.getFuel().getUnit().getUnitName());
        response.setRate(fuelRate.getRate());

        response.setUpdatedDate(
                fuelRate.getUpdatedAt().format(DATE_FORMAT));

        response.setUpdatedTime(
                fuelRate.getUpdatedAt().format(TIME_FORMAT));
        response.setStatus(fuelRate.getFuel().getStatus());

        return response;
    }

    public static FuelRateHistoryResponse toFuelRateHistoryResponse(
            FuelRateHistory history) {

        FuelRateHistoryResponse response = new FuelRateHistoryResponse();

        response.setId(history.getId());
        response.setFuel(history.getFuel().getFuelName());
        response.setOldRate(history.getOldRate());
        response.setNewRate(history.getNewRate());
        response.setUpdatedBy(history.getUpdatedBy());

        response.setUpdatedDate(
                history.getUpdatedAt().format(DATE_FORMAT));

        response.setUpdatedTime(
                history.getUpdatedAt().format(TIME_FORMAT));

        return response;
    }

}
