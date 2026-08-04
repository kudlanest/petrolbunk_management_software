package com.example.backend.repositories.fuel_rate;



import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.fuel_rate.FuelRateHistory;



public interface FuelRateHistoryRepository
        extends JpaRepository<FuelRateHistory, Long> {

}