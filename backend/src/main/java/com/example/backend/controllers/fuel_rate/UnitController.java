package com.example.backend.controllers.fuel_rate;



import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.fuel_rate.UnitRequest;
import com.example.backend.dto.fuel_rate.UnitResponse;
import com.example.backend.services.fuel_rate.UnitService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/units")
@CrossOrigin(origins = "*")
public class UnitController {

    private final UnitService unitService;

    public UnitController(UnitService unitService) {
        this.unitService = unitService;
    }

    
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PostMapping
    public ResponseEntity<UnitResponse> addUnit(@Valid
            @RequestBody UnitRequest request) {

        return new ResponseEntity<>(
                unitService.addUnit(request),
                HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<UnitResponse>> getAllUnits() {

        return ResponseEntity.ok(unitService.getAllUnits());
    }
    
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @DeleteMapping("/{unitId}")
    public ResponseEntity<Void> deleteUnit(@PathVariable Long unitId) {

        unitService.deleteUnit(unitId);

        return ResponseEntity.noContent().build();
    }
}