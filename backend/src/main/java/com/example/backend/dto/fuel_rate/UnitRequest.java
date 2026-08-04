package com.example.backend.dto.fuel_rate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UnitRequest {

	@NotBlank(message = "Unit name is required")
    @Size(max = 20, message = "Unit name cannot exceed 20 characters")
    private String unitName;

    public UnitRequest() {
    }

    public UnitRequest(String unitName) {
        this.unitName = unitName;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }
}