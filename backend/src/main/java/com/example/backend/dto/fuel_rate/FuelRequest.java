package com.example.backend.dto.fuel_rate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FuelRequest {

	 @NotBlank(message = "Fuel name is required")
	    @Size(max = 50, message = "Fuel name cannot exceed 50 characters")
	    private String fuelName;
	 
	 @NotNull(message = "Unit is required")
	    private Long unitId;


    public FuelRequest() {
    }

    public FuelRequest(String fuelName, Long unitId) {
        this.fuelName = fuelName;
        this.unitId = unitId;
    }

    public String getFuelName() {
        return fuelName;
    }

    public void setFuelName(String fuelName) {
        this.fuelName = fuelName;
    }

    public Long getUnitId() {
        return unitId;
    }

    public void setUnitId(Long unitId) {
        this.unitId = unitId;
    }
}