package com.example.backend.services;

import com.example.backend.dto.auth.LoginRequest;
import com.example.backend.dto.auth.LoginResponse;
import com.example.backend.entities.User;

public interface AuthService {
	
    User createUser(User user);

    LoginResponse login(LoginRequest request);

}