package com.example.backend.services.fuel_rate;



import java.util.List;

import com.example.backend.dto.fuel_rate.FuelRateHistoryResponse;
import com.example.backend.dto.fuel_rate.FuelRateRequest;
import com.example.backend.dto.fuel_rate.FuelRateResponse;



public interface FuelRateService {

    FuelRateResponse createFuelRate(FuelRateRequest request);

    FuelRateResponse updateFuelRate(FuelRateRequest request);

    List<FuelRateResponse> getCurrentFuelRates();

    FuelRateResponse getFuelRateByFuelId(Long fuelId);

    List<FuelRateHistoryResponse> getFuelRateHistory();

}
