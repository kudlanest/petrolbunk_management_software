package com.example.backend.services.impl;



import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.config.JwtService;
import com.example.backend.dto.auth.ForgotPasswordRequest;
import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.entities.User;
import com.example.backend.entities.otp.PendingRegistration;
import com.example.backend.enums.OtpPurpose;
import com.example.backend.exceptions.User.DuplicateUserException;
import com.example.backend.repositories.UserRepository;
import com.example.backend.repositories.otp.PendingRegistrationRepository;
import com.example.backend.services.AuthService;
import com.example.backend.services.otp.OtpService;
import com.example.backend.dto.auth.RegisterRequest;
import com.example.backend.dto.auth.ResetPasswordRequest;



@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PendingRegistrationRepository pendingRegistrationRepository;
    private final OtpService otpService;
   
    
    
    
    
    
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager,UserRepository userRepository,
                       JwtService jwtService, PasswordEncoder passwordEncoder,PendingRegistrationRepository pendingRegistrationRepository,
                       OtpService otpService
                       ) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.pendingRegistrationRepository = pendingRegistrationRepository;
        this.otpService = otpService;
       
        
    }
    
//    @Override
//    public User createUser(User user) {
//
//        // Username validation
//        if (userRepository.existsByUsername(user.getUsername())) {
//            throw new DuplicateUserException(
//                    "Username already exists : " + user.getUsername());
//        }
//
//        // Email validation
//        if (userRepository.existsByEmail(user.getEmail())) {
//            throw new DuplicateUserException(
//                    "Email already exists : " + user.getEmail());
//        }
//
//        // Phone validation
//        if (userRepository.existsByPhone(user.getPhone())) {
//            throw new DuplicateUserException(
//                    "Phone number already exists : " + user.getPhone());
//        }
//
//        // Employee ID validation
//        if (userRepository.existsByEmployeeId(user.getEmployeeId())) {
//            throw new DuplicateUserException(
//                    "Employee ID already exists : " + user.getEmployeeId());
//        }
//
//        // Encrypt Password
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        return userRepository.save(user);
//    }
    
    @Override
    @Transactional
    public void registerRequest(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new DuplicateUserException(
                    "Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new DuplicateUserException(
                    "Email already exists");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new DuplicateUserException(
                    "Phone already exists");
        }

        if (userRepository.existsByEmployeeId(request.getEmployeeId())) {
            throw new DuplicateUserException(
                    "Employee ID already exists");
        }

        pendingRegistrationRepository.deleteByEmail(request.getEmail());

        PendingRegistration pending = new PendingRegistration();

        pending.setEmployeeId(request.getEmployeeId());
        pending.setFullName(request.getFullName());
        pending.setEmail(request.getEmail());
        pending.setPhone(request.getPhone());
        pending.setUsername(request.getUsername());

        // Don't encode yet. Encode after OTP verification.
        pending.setPassword(request.getPassword());

        pending.setRole(request.getRole());
        pending.setCreatedAt(LocalDateTime.now());

        pendingRegistrationRepository.save(pending);

        otpService.generateOtp(
                request.getEmail(),
                OtpPurpose.REGISTRATION
        );
    }
    
    
    @Override
    @Transactional
    public User verifyRegistration(String email, String otp) {

    	boolean verified = otpService.verifyOtp(
    	        email,
    	        otp,
    	        OtpPurpose.REGISTRATION);

    	if (!verified) {
    	    throw new RuntimeException("Invalid or expired OTP.");
    	}

        PendingRegistration pending = pendingRegistrationRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Registration request not found."));

        User user = new User();

        user.setEmployeeId(pending.getEmployeeId());
        user.setFullName(pending.getFullName());
        user.setEmail(pending.getEmail());
        user.setPhone(pending.getPhone());
        user.setUsername(pending.getUsername());

        user.setPassword(
                passwordEncoder.encode(pending.getPassword())
        );

        user.setRole(pending.getRole());

        User savedUser = userRepository.save(user);

        pendingRegistrationRepository.delete(pending);

        return savedUser;
    }
   

 @Override
public LoginResponse login(LoginRequest request) {

    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                    request.getUsername(),
                    request.getPassword()));

    User user = userRepository.findByUsername(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));

    String token = jwtService.generateToken(
            (UserDetails) authentication.getPrincipal());

    return LoginResponse.builder()
            .id(user.getId())
            .employeeId(user.getEmployeeId())
            .fullName(user.getFullName())
            .username(user.getUsername())
            .email(user.getEmail())
            .role(user.getRole())
            .token(token)
            .build();
}
 
 @Override
 public void forgotPassword(ForgotPasswordRequest request) {

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found with this email"));

     otpService.generateOtp(
             user.getEmail(),
             OtpPurpose.FORGOT_PASSWORD
     );
 }
 
 @Override
 public void resetPassword(ResetPasswordRequest request) {

     boolean validOtp = otpService.verifyOtp(
             request.getEmail(),
             request.getOtp(),
             OtpPurpose.FORGOT_PASSWORD
     );

     if (!validOtp) {
         throw new RuntimeException("Invalid or expired OTP");
     }

     User user = userRepository.findByEmail(request.getEmail())
             .orElseThrow(() ->
                     new RuntimeException("User not found"));

     user.setPassword(passwordEncoder.encode(request.getNewPassword()));

     userRepository.save(user);
 }
}