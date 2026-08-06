package com.example.backend.services.impl;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.entities.RefreshToken;
import com.example.backend.entities.User;
import com.example.backend.repositories.RefreshTokenRepository;
import com.example.backend.services.RefreshTokenService;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenServiceImpl(
            RefreshTokenRepository refreshTokenRepository) {

        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    @Transactional
    public RefreshToken createRefreshToken(User user) {

        // Allow only one refresh token per user
        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUser(user);

        refreshToken.setToken(
                UUID.randomUUID().toString()
        );

        refreshToken.setExpiryDate(
                LocalDateTime.now().plusDays(7)
        );

        return refreshTokenRepository.save(refreshToken);
    }

    @Override
    public RefreshToken verifyRefreshToken(String token) {

        RefreshToken refreshToken = refreshTokenRepository
                .findByToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Invalid Refresh Token"));

        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {

            refreshTokenRepository.delete(refreshToken);

            throw new RuntimeException("Refresh Token Expired");
        }

        return refreshToken;
    }
    
    
    @Override
    @Transactional
    public void deleteByUser(User user) {

        refreshTokenRepository.deleteByUser(user);

    }

}
