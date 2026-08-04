package com.example.backend.dto.fuel_rate;



import java.math.BigDecimal;

import com.example.backend.enums.FuelStatus;

public class FuelRateResponse {

    private Long fuelId;
    private String fuelName;
    private String unit;
    private BigDecimal rate;
    private String updatedDate;
    private String updatedTime;
    private FuelStatus status;

    public FuelRateResponse() {
    }

    public FuelRateResponse(Long fuelId, String fuelName, String unit,
                            BigDecimal rate, String updatedDate,
                            String updatedTime, FuelStatus status) {
        this.fuelId = fuelId;
        this.fuelName = fuelName;
        this.unit = unit;
        this.rate = rate;
        this.updatedDate = updatedDate;
        this.updatedTime = updatedTime;
        this.status = status;
    }

    public Long getFuelId() {
        return fuelId;
    }

    public void setFuelId(Long fuelId) {
        this.fuelId = fuelId;
    }

    public String getFuelName() {
        return fuelName;
    }

    public void setFuelName(String fuelName) {
        this.fuelName = fuelName;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public String getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(String updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(String updatedTime) {
        this.updatedTime = updatedTime;
    }
    
    public FuelStatus getStatus() {
        return status;
    }

    public void setStatus(FuelStatus status) {
        this.status = status;
    }
}