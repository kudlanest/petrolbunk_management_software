package com.example.backend.dto.user;

import com.example.backend.entities.User;

public record UserResponse(Long id, String username, String email, String phone) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getPhone());
    }
}