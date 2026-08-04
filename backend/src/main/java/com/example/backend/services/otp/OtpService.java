package com.example.backend.services.otp;

import com.example.backend.enums.OtpPurpose;

public interface OtpService {

    void generateOtp(
            String email,
            OtpPurpose purpose
    );

    boolean verifyOtp(
            String email,
            String otp,
            OtpPurpose purpose
    );

}
