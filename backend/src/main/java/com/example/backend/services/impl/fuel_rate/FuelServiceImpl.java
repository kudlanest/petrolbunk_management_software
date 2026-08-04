package com.example.backend.services.impl.fuel_rate;



import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.backend.dto.fuel_rate.FuelRequest;
import com.example.backend.dto.fuel_rate.FuelResponse;
import com.example.backend.entities.fuel_rate.Fuel;
import com.example.backend.entities.fuel_rate.Unit;
import com.example.backend.exceptions.DuplicateResourceException;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.repositories.fuel_rate.FuelRateRepository;
import com.example.backend.repositories.fuel_rate.FuelRepository;
import com.example.backend.repositories.fuel_rate.UnitRepository;
import com.example.backend.services.fuel_rate.FuelService;



@Service
public class FuelServiceImpl implements FuelService {

    private final FuelRepository fuelRepository;
    private final UnitRepository unitRepository;
    private final FuelRateRepository fuelRateRepository;

    public FuelServiceImpl(FuelRepository fuelRepository,
                           UnitRepository unitRepository,
						   FuelRateRepository fuelRateRepository) {
        this.fuelRepository = fuelRepository;
        this.unitRepository = unitRepository;
        this.fuelRateRepository = fuelRateRepository;
    }

    @Override
    public FuelResponse addFuel(FuelRequest request) {

        if (fuelRepository.existsByFuelNameIgnoreCase(request.getFuelName())) {
            throw new DuplicateResourceException("Fuel already exists.");
        }

        Unit unit = unitRepository.findById(request.getUnitId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Unit not found."));

        Fuel fuel = new Fuel();
        fuel.setFuelName(request.getFuelName());
        fuel.setUnit(unit);
        fuel.setStatus("ACTIVE");

        Fuel savedFuel = fuelRepository.save(fuel);

        return new FuelResponse(
                savedFuel.getId(),
                savedFuel.getFuelName(),
                savedFuel.getUnit().getUnitName(),
                savedFuel.getStatus()
        );
    }

    @Override
    public List<FuelResponse> getAllFuels() {

        return fuelRepository.findAll()
                .stream()
                .map(fuel -> new FuelResponse(
                        fuel.getId(),
                        fuel.getFuelName(),
                        fuel.getUnit().getUnitName(),
                        fuel.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public FuelResponse updateFuelStatus(Long fuelId, String status) {

        Fuel fuel = fuelRepository.findById(fuelId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fuel not found."));

        fuel.setStatus(status);

        Fuel updatedFuel = fuelRepository.save(fuel);

        return new FuelResponse(
                updatedFuel.getId(),
                updatedFuel.getFuelName(),
                updatedFuel.getUnit().getUnitName(),
                updatedFuel.getStatus()
        );
    }
    
    @Override
    public void deleteFuel(Long fuelId) {

        Fuel fuel = fuelRepository.findById(fuelId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fuel not found."));

        if (fuelRateRepository.existsByFuelId(fuelId)) {
            throw new DuplicateResourceException(
                    "Cannot delete fuel because it has related fuel rates.");
        }

        fuelRepository.delete(fuel);
    }

}