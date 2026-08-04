package com.example.backend.controllers.fuel_rate;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.fuel_rate.FuelRequest;
import com.example.backend.dto.fuel_rate.FuelResponse;
import com.example.backend.services.fuel_rate.FuelService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/fuels")
@CrossOrigin(origins = "http://localhost:5173")
public class FuelController {

    private final FuelService fuelService;

    public FuelController(FuelService fuelService) {
        this.fuelService = fuelService;
    }

    
    // Add a new fuel
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping
    public ResponseEntity<FuelResponse> addFuel( @Valid
            @RequestBody FuelRequest request) {

        return new ResponseEntity<>(
                fuelService.addFuel(request),
                HttpStatus.CREATED);
    }
    
    

    @GetMapping
    public ResponseEntity<List<FuelResponse>> getAllFuels() {

        return ResponseEntity.ok(fuelService.getAllFuels());
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PatchMapping("/{fuelId}/status")
    public ResponseEntity<FuelResponse> updateFuelStatus(
            @PathVariable Long fuelId,
            @RequestParam String status) {

        return ResponseEntity.ok(
                fuelService.updateFuelStatus(fuelId, status));
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @DeleteMapping("/{fuelId}")
    public ResponseEntity<String> deleteFuel(@PathVariable Long fuelId) {

        fuelService.deleteFuel(fuelId);

        return ResponseEntity.ok("Fuel deleted successfully.");
    }
}