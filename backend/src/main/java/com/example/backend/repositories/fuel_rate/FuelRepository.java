package com.example.backend.repositories.fuel_rate;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.fuel_rate.Fuel;



public interface FuelRepository extends JpaRepository<Fuel, Long> {

    Optional<Fuel> findByFuelName(String fuelName);

    boolean existsByFuelNameIgnoreCase(String fuelName);
    
    boolean existsByUnitId(Long unitId);

}
