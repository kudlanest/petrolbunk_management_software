package com.example.backend.repositories.fuel_rate;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.fuel_rate.Unit;



public interface UnitRepository extends JpaRepository<Unit, Long> {

    Optional<Unit> findByUnitName(String unitName);

    boolean existsByUnitName(String unitName);
    
    boolean existsByUnitNameIgnoreCase(String unitName);
    
    
    
//    boolean existsByFuelId(Long fuelId);

}