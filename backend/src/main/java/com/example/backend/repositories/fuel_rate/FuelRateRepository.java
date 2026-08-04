package com.example.backend.repositories.fuel_rate;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.fuel_rate.Fuel;
import com.example.backend.entities.fuel_rate.FuelRate;



public interface FuelRateRepository extends JpaRepository<FuelRate, Long> {

    Optional<FuelRate> findByFuel(Fuel fuel);

	boolean existsByFuelId(Long fuelId);
    
    

}
