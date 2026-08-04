package com.example.backend.controllers.fuel_rate;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.fuel_rate.FuelRateHistoryResponse;
import com.example.backend.dto.fuel_rate.FuelRateRequest;
import com.example.backend.dto.fuel_rate.FuelRateResponse;
import com.example.backend.services.fuel_rate.FuelRateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/fuel-rates")
@CrossOrigin(origins = "*")
public class FuelRateController {

    private final FuelRateService fuelRateService;

    public FuelRateController(FuelRateService fuelRateService) {
        this.fuelRateService = fuelRateService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping
    public ResponseEntity<FuelRateResponse> createFuelRate(
            @Valid @RequestBody FuelRateRequest request) {

        return new ResponseEntity<>(
                fuelRateService.createFuelRate(request),
                HttpStatus.CREATED);
    }

    
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping
    public ResponseEntity<FuelRateResponse> updateFuelRate(
    		@Valid    @RequestBody FuelRateRequest request) {

        return ResponseEntity.ok(
                fuelRateService.updateFuelRate(request));
    }

    @GetMapping
    public ResponseEntity<List<FuelRateResponse>> getCurrentFuelRates() {

        return ResponseEntity.ok(
                fuelRateService.getCurrentFuelRates());
    }

    @GetMapping("/{fuelId}")
    public ResponseEntity<FuelRateResponse> getFuelRateByFuelId(
            @PathVariable Long fuelId) {

        return ResponseEntity.ok(
                fuelRateService.getFuelRateByFuelId(fuelId));
    }

    @GetMapping("/history")
    public ResponseEntity<List<FuelRateHistoryResponse>> getFuelRateHistory() {

        return ResponseEntity.ok(
                fuelRateService.getFuelRateHistory());
    }
}