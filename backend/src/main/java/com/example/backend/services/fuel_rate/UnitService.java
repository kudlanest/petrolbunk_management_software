package com.example.backend.services.fuel_rate;



import java.util.List;

import com.example.backend.dto.fuel_rate.UnitRequest;
import com.example.backend.dto.fuel_rate.UnitResponse;



public interface UnitService {

    UnitResponse addUnit(UnitRequest request);

    List<UnitResponse> getAllUnits();
    
    void deleteUnit(Long unitId);

}