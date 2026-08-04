package com.example.backend.dto.fuel_rate;

public class UnitResponse {
	private Long id;
	private String name;

	public UnitResponse() {
	}

	public UnitResponse(Long id, String name) {
		this.id = id;
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
