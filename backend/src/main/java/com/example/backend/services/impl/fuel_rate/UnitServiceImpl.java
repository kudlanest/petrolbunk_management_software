package com.example.backend.services.impl.fuel_rate;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.dto.fuel_rate.UnitRequest;
import com.example.backend.dto.fuel_rate.UnitResponse;
import com.example.backend.entities.fuel_rate.Unit;
import com.example.backend.exceptions.DuplicateResourceException;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.repositories.fuel_rate.FuelRepository;
import com.example.backend.repositories.fuel_rate.UnitRepository;
import com.example.backend.services.fuel_rate.UnitService;



@Service
public class UnitServiceImpl implements UnitService {

    private final UnitRepository unitRepository;
    private final FuelRepository fuelRepository;

    public UnitServiceImpl(UnitRepository unitRepository, FuelRepository fuelRepository) {
        this.unitRepository = unitRepository;
        this.fuelRepository = fuelRepository;
    }

    @Override
    public UnitResponse addUnit(UnitRequest request) {

        if (unitRepository.existsByUnitNameIgnoreCase(request.getUnitName())) {
            throw new DuplicateResourceException("Unit already exists.");
        }

        Unit unit = new Unit();
        unit.setUnitName(request.getUnitName());

        Unit savedUnit = unitRepository.save(unit);

        return new UnitResponse(
                savedUnit.getId(),
                savedUnit.getUnitName()
        );
    }

    @Override
    public List<UnitResponse> getAllUnits() {

        return unitRepository.findAll()
                .stream()
                .map(unit -> new UnitResponse(
                        unit.getId(),
                        unit.getUnitName()
                ))
                .collect(Collectors.toList());
    }
    
    @Override
    public void deleteUnit(Long unitId) {

        Unit unit = unitRepository.findById(unitId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Unit not found."));

        if (fuelRepository.existsByUnitId(unitId)) {
            throw new DuplicateResourceException(
                    "Cannot delete unit. It is linked to one or more fuels.");
        }

        unitRepository.delete(unit);
    }
}