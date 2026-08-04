package com.example.backend.controllers;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.auth.ForgotPasswordRequest;
import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.dto.auth.RegisterRequest;
import com.example.backend.dto.auth.ResetPasswordRequest;
import com.example.backend.dto.auth.VerifyOtpRequest;
import com.example.backend.dto.user.UserResponse;
import com.example.backend.entities.User;
import com.example.backend.services.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    
    
    
    // Register a new user
//    @PostMapping("/register")
//    public ResponseEntity<UserResponse> registerUser(
//            @Valid @RequestBody User user) {
//
//        User createdUser = authService.createUser(user);
//
//        return ResponseEntity
//                .status(HttpStatus.CREATED)
//                .body(UserResponse.fromEntity(createdUser));
//    }
    
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @Valid @RequestBody RegisterRequest request) {

        authService.registerRequest(request);

        return ResponseEntity.ok("OTP sent successfully to your email.");
    }
    
    @PostMapping("/verify-registration")
    public ResponseEntity<UserResponse> verifyRegistration(
            @Valid @RequestBody VerifyOtpRequest request) {

        User user = authService.verifyRegistration(
                request.getEmail(),
                request.getOtp());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(UserResponse.fromEntity(user));
    }
    
    
    
    
    // Authenticate a user and return a JWT token for login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }
    
    
    // Logout a user by invalidating the JWT token
    //logout when click logout button in 
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Logout successful");
    }
    
    
    
    
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequest request) {

        authService.forgotPassword(request);

        return ResponseEntity.ok("OTP sent successfully.");
    }
    
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok("Password reset successfully.");
    }
    
    // forgot password
    // reset password
    // change password
    //refresh token
    
    

    


    
}
