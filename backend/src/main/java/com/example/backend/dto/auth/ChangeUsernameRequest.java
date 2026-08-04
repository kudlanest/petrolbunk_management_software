package com.example.backend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ChangeUsernameRequest {

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "New username is required")
    private String newUsername;

    public ChangeUsernameRequest() {
    }

    public String getEmail() {
        return email;
    }

    public String getNewUsername() {
        return newUsername;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setNewUsername(String newUsername) {
        this.newUsername = newUsername;
    }
}
