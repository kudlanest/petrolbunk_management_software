package com.example.backend.repositories.otp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.example.backend.entities.otp.OtpVerification;
import com.example.backend.enums.OtpPurpose;

public interface OtpRepository extends JpaRepository<OtpVerification, Long> {

    Optional<OtpVerification> findTopByEmailAndPurposeOrderByCreatedAtDesc(
            String email,
            OtpPurpose purpose
    );

    Optional<OtpVerification> findByEmailAndOtpAndPurpose(
            String email,
            String otp,
            OtpPurpose purpose
    );
    
    @Modifying
    void deleteByEmailAndPurpose(
            String email,
            OtpPurpose purpose
    );

}