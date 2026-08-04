package com.example.backend.dto.fuel_rate;



import java.math.BigDecimal;

public class FuelRateHistoryResponse {

    private Long id;
    private String fuel;
    private BigDecimal oldRate;
    private BigDecimal newRate;
    private String updatedBy;
    private String updatedDate;
    private String updatedTime;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFuel() {
		return fuel;
	}
	public void setFuel(String fuel) {
		this.fuel = fuel;
	}
	public BigDecimal getOldRate() {
		return oldRate;
	}
	public void setOldRate(BigDecimal oldRate) {
		this.oldRate = oldRate;
	}
	public BigDecimal getNewRate() {
		return newRate;
	}
	public void setNewRate(BigDecimal newRate) {
		this.newRate = newRate;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
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

 

    // Generate constructor, getters and setters
}
