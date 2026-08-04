package com.example.backend.dto.fuel_rate;



import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class FuelRateRequest {

	@NotNull(message = "Fuel is required")
    private Long fuelId;
	
	@NotNull(message = "Rate is required")
    @DecimalMin(value = "0.01", message = "Rate must be greater than zero")
    private BigDecimal rate;
	
    @NotBlank(message = "Updated By is required")
    private String updatedBy;

    public FuelRateRequest() {
    }

    public FuelRateRequest(Long fuelId, BigDecimal rate) {
        this.fuelId = fuelId;
        this.rate = rate;
    }

    public Long getFuelId() {
        return fuelId;
    }

    public void setFuelId(Long fuelId) {
        this.fuelId = fuelId;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
}
