package com.example.backend.services;

import com.example.backend.entities.RefreshToken;
import com.example.backend.entities.User;

public interface RefreshTokenService {

    RefreshToken createRefreshToken(User user);

    RefreshToken verifyRefreshToken(String token);

    void deleteByUser(User user);

}