package com.example.backend.services.email;

public interface EmailService {

    void sendOtpEmail(
            String to,
            String otp
    );

}