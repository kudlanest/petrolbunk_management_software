package com.example.backend.repositories.otp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.otp.PendingPasswordChange;

public interface PendingPasswordChangeRepository
        extends JpaRepository<PendingPasswordChange, Long> {

    Optional<PendingPasswordChange> findByEmail(String email);

    void deleteByEmail(String email);
}