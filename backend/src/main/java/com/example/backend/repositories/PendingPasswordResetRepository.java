package com.example.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.PendingPasswordReset;

public interface PendingPasswordResetRepository
        extends JpaRepository<PendingPasswordReset, Long> {

    Optional<PendingPasswordReset> findByEmail(String email);

    void deleteByEmail(String email);
}
