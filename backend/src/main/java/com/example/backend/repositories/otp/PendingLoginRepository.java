package com.example.backend.repositories.otp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entities.otp.PendingLogin;

public interface PendingLoginRepository extends JpaRepository<PendingLogin, Long> {

    Optional<PendingLogin> findByEmail(String email);

    void deleteByEmail(String email);

}