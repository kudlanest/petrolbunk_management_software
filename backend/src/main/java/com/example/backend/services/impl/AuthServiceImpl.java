package com.example.backend.services.impl;



import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.config.JwtService;
import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.entities.User;
import com.example.backend.exceptions.User.DuplicateUserException;
import com.example.backend.repositories.UserRepository;
import com.example.backend.services.AuthService;


import com.example.backend.dto.auth.RegisterRequest;



@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
   
    
    
    
    
    
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(AuthenticationManager authenticationManager,UserRepository userRepository,
                       JwtService jwtService, PasswordEncoder passwordEncoder
                       ) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
       
        
    }
    
    @Override
    public User createUser(User user) {

        // Username validation
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateUserException(
                    "Username already exists : " + user.getUsername());
        }

        // Email validation
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateUserException(
                    "Email already exists : " + user.getEmail());
        }

        // Phone validation
        if (userRepository.existsByPhone(user.getPhone())) {
            throw new DuplicateUserException(
                    "Phone number already exists : " + user.getPhone());
        }

        // Employee ID validation
        if (userRepository.existsByEmployeeId(user.getEmployeeId())) {
            throw new DuplicateUserException(
                    "Employee ID already exists : " + user.getEmployeeId());
        }

        // Encrypt Password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
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
}