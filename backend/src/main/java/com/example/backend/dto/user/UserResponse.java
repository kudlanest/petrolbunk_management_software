package com.example.backend.dto.user;

import com.example.backend.entities.User;
import com.example.backend.enums.Role;

public record UserResponse(Long id, String username, String email, String phone,Role role ) {
    public static UserResponse fromEntity(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getEmail(), user.getPhone(),user.getRole());
    }
}