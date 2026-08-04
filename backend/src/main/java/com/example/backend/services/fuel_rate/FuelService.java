package com.example.backend.services.fuel_rate;



import java.util.List;

import com.example.backend.dto.fuel_rate.FuelRequest;
import com.example.backend.dto.fuel_rate.FuelResponse;



public interface FuelService {

    FuelResponse addFuel(FuelRequest request);

    List<FuelResponse> getAllFuels();

    FuelResponse updateFuelStatus(Long fuelId, String status);
    
    void deleteFuel(Long fuelId);

}