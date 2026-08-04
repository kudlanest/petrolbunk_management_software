package com.example.backend.repositories.otp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.otp.PendingUsernameChange;

public interface PendingUsernameChangeRepository
        extends JpaRepository<PendingUsernameChange, Long> {

    Optional<PendingUsernameChange> findByEmail(String email);

    void deleteByEmail(String email);
}
