package com.example.backend.dto.fuel_rate;

import com.example.backend.enums.FuelStatus;

public class FuelResponse {

    private Long id;
    private String fuelName;
    private String unit;
    private FuelStatus status;

    public FuelResponse() {
    }

    public FuelResponse(Long id, String fuelName, String unit, FuelStatus fuelStatus) {
        this.id = id;
        this.fuelName = fuelName;
        this.unit = unit;
        this.status = fuelStatus;
    }
    


    public Long getId() {
        return id;
    }

    public String getFuelName() {
        return fuelName;
    }

    public String getUnit() {
        return unit;
    }

    public FuelStatus getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setFuelName(String fuelName) {
        this.fuelName = fuelName;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public void setStatus(FuelStatus status) {
        this.status = status;
    }
}