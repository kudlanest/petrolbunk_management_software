package com.example.backend.services;

import com.example.backend.dto.auth.ForgotPasswordRequest;
import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.dto.auth.RegisterRequest;
import com.example.backend.dto.auth.ResetPasswordRequest;
import com.example.backend.entities.User;

public interface AuthService {
	
//    User createUser(User user);

//    LoginResponse login(LoginRequest request);
	
	// Step 1: User submits registration details
    void registerRequest(RegisterRequest request);

    // Step 2: User verifies OTP and account is created
    User verifyRegistration(String email, String otp);

    // Login
    LoginResponse login(LoginRequest request);
    
    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);
	



}