package com.example.backend.controllers;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.auth.ChangePasswordRequest;
import com.example.backend.dto.auth.ChangeUsernameRequest;
import com.example.backend.dto.auth.ForgotPasswordRequest;
import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.dto.auth.RegisterRequest;
import com.example.backend.dto.auth.ResetPasswordRequest;
import com.example.backend.dto.auth.VerifyChangePasswordRequest;
import com.example.backend.dto.auth.VerifyChangeUsernameRequest;
import com.example.backend.dto.auth.VerifyLoginOtpRequest;
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
//    @PostMapping("/login")
//    public ResponseEntity<LoginResponse> login(
//            @Valid @RequestBody LoginRequest request) {
//
//        return ResponseEntity.ok(authService.login(request));
//    }
    

    
    
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
    
    @PostMapping("/change-password/request")
    public ResponseEntity<String> changePassword(
            @Valid @RequestBody ChangePasswordRequest request) {

        authService.changePassword(request);

        return ResponseEntity.ok("OTP sent successfully.");
    }
    
    @PostMapping("/change-password/verify")
    public ResponseEntity<String> verifyChangePassword(
            @Valid @RequestBody VerifyChangePasswordRequest request) {

        authService.verifyChangePassword(request);

        return ResponseEntity.ok("Password changed successfully.");
    }
  

    //refresh token
    
    @PostMapping("/change-username/request")
    public ResponseEntity<String> changeUsername(
            @Valid @RequestBody ChangeUsernameRequest request) {

        authService.changeUsername(request);

        return ResponseEntity.ok("OTP sent successfully.");
    }
    
    @PostMapping("/change-username/verify")
    public ResponseEntity<String> verifyChangeUsername(
            @Valid @RequestBody VerifyChangeUsernameRequest request) {

        authService.verifyChangeUsername(request);

        return ResponseEntity.ok("Username changed successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(
            @Valid @RequestBody LoginRequest request) {

        authService.loginRequest(request);

        return ResponseEntity.ok("OTP sent successfully.");
    }
    
    @PostMapping("/login/verify")
    public ResponseEntity<LoginResponse> verifyLogin(
            @Valid @RequestBody VerifyLoginOtpRequest request) {

        return ResponseEntity.ok(
                authService.verifyLoginOtp(request)
        );
    }
    


    
}
