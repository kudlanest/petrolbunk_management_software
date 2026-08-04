package com.example.backend.services.impl.fuel_rate;



import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.dto.fuel_rate.FuelRateHistoryResponse;
import com.example.backend.dto.fuel_rate.FuelRateRequest;
import com.example.backend.dto.fuel_rate.FuelRateResponse;
import com.example.backend.entities.fuel_rate.Fuel;
import com.example.backend.entities.fuel_rate.FuelRate;
import com.example.backend.entities.fuel_rate.FuelRateHistory;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.mapper.FuelRateMapper;
import com.example.backend.repositories.fuel_rate.FuelRateHistoryRepository;
import com.example.backend.repositories.fuel_rate.FuelRateRepository;
import com.example.backend.repositories.fuel_rate.FuelRepository;
import com.example.backend.services.fuel_rate.FuelRateService;

@Service
public class FuelRateServiceImpl implements FuelRateService {

    private final FuelRepository fuelRepository;
    private final FuelRateRepository fuelRateRepository;
    private final FuelRateHistoryRepository historyRepository;

    public FuelRateServiceImpl(
            FuelRepository fuelRepository,
            FuelRateRepository fuelRateRepository,
            FuelRateHistoryRepository historyRepository) {

        this.fuelRepository = fuelRepository;
        this.fuelRateRepository = fuelRateRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    @Transactional
    public FuelRateResponse createFuelRate(FuelRateRequest request) {

        Fuel fuel = fuelRepository.findById(request.getFuelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fuel not found"));

        // Check if fuel rate already exists
        if (fuelRateRepository.findByFuel(fuel).isPresent()) {
            throw new com.example.backend.exceptions.DuplicateResourceException(
                    "Fuel rate already exists for this fuel Please Update Fuel Rate instead.");
        }

        FuelRate fuelRate = new FuelRate();
        fuelRate.setFuel(fuel);
        fuelRate.setRate(request.getRate());
        fuelRate.setUpdatedAt(LocalDateTime.now());

        FuelRate savedRate = fuelRateRepository.save(fuelRate);

        return FuelRateMapper.toFuelRateResponse(savedRate);
    }

    @Override
    @Transactional
    public FuelRateResponse updateFuelRate(FuelRateRequest request) {

        Fuel fuel = fuelRepository.findById(request.getFuelId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fuel not found"));

        FuelRate fuelRate = fuelRateRepository.findByFuel(fuel)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fuel rate not found"));

        FuelRateHistory history = new FuelRateHistory();

        history.setFuel(fuel);
        history.setOldRate(fuelRate.getRate());
        history.setNewRate(request.getRate());
        history.setUpdatedBy(request.getUpdatedBy());
        history.setUpdatedAt(LocalDateTime.now());

        historyRepository.save(history);

        fuelRate.setRate(request.getRate());
        fuelRate.setUpdatedAt(LocalDateTime.now());

        FuelRate updatedRate = fuelRateRepository.save(fuelRate);

        return FuelRateMapper.toFuelRateResponse(updatedRate);
    }

    @Override
    public List<FuelRateResponse> getCurrentFuelRates() {

        return fuelRateRepository.findAll()
                .stream()
                .map(FuelRateMapper::toFuelRateResponse)
                .collect(Collectors.toList());
    }

    @Override
    public FuelRateResponse getFuelRateByFuelId(Long fuelId) {

        Fuel fuel = fuelRepository.findById(fuelId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Fuel not found"));

        FuelRate fuelRate = fuelRateRepository.findByFuel(fuel)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Fuel rate not found for the given fuel"));

        return FuelRateMapper.toFuelRateResponse(fuelRate);
    }

    @Override
    public List<FuelRateHistoryResponse> getFuelRateHistory() {

        return historyRepository.findAll()
                .stream()
                .map(FuelRateMapper::toFuelRateHistoryResponse)
                .collect(Collectors.toList());
    }

}
